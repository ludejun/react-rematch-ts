import userAgent from './userAgent';
import getIP from './ip';

class Monitor {
  constructor(props) {
    this.version = '1.0.0'; // SDK版本号
  }

  // 初始化
  init({ appName, appVersion, headerName, apiUrl, maxStorage, custno, maccode }) {
    this.storageName = headerName || '__ReactMonitorLogs'; // 持久存储Key、日志发送的Header Key
    this.maxStorage = maxStorage || 5; // 日志最大存储量
    this.ev = []; // 存储事件日志
    this.apiServer = apiUrl || ''; // 日志发送地址，Get请求，一般为请求1*1gif
    this.custno = custno || '';
    this.appName = appName || '';
    this.appVersion = appVersion || '';
    if (!this.apiServer) {
      console.error('[Monitor报错]：埋点方法需要上报服务端URL，一般为请求1*1gif');
    }

    try {
      // 如果缓存中有数据，初始化到this.ev
      const storage = window.localStorage.getItem(this.storageName);
      if (storage !== '[]' && storage !== null) {
        this.ev = JSON.parse(storage);
      }

      // 设置maccode时看缓存中有maccode
      if (maccode) {
        this.maccode = maccode;
      } else {
        const macLocal = window.localStorage.getItem('maccode');
        if (!macLocal) {
          this.maccode = macLocal;
        } else {
          this.maccode =
            String(Date.now()) +
            '-' +
            Math.floor(1e7 * Math.random()) +
            '-' +
            Math.random().toString(16).replace('.', '');
          window.localStorage.setItem('maccode', this.maccode);
        }
      }

      // 监听浏览器关闭和刷新
      const self = this;
      window.onunload = function() {
        self.processLogSerial('AE', ''); // 自动加AE点， TODO：无ID
        self.sendLog();
      };
    } catch (e) {
      console.log('[Monitor初始化报错]:', e);
    }

    this.baseInfo =
      this.baseInfo && Object.keys(this.baseInfo).length > 0
        ? this.baseInfo
        : this.generateNormal(); // 生成外层通用字段
  }

  // 发送日志
  sendLog() {
    if (this.ev.length > 0) {
      // 当this.baseInfo中无IP信息
      if (this.ip && this.baseInfo.ip === undefined) {
        this.baseInfo.ip = this.ip;
      }
      var request = new XMLHttpRequest();
      request.responseType = 'blob';
      request.open('get', this.apiServer, true);
      request.setRequestHeader(this.storageName, encodeURIComponent(JSON.stringify({...this.baseInfo, ev: this.ev})));
      request.onreadystatechange = (e) => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
          // 成功送达则清除数据
          this.ev = [];
          window.localStorage.setItem(this.storageName, '[]');
        } else {
          // TODO 是否做超时重发
          console.error('[Monitor报错]：埋点上报不成功');
        }
      };
      request.send(null);
    }
  }

  // 整合日志
  processLogSerial(type, id, custom) {
    if (this.ev && Array.isArray(this.ev)) {
      this.ev.push({
        type,
        ts: new Date().getTime(),
        id,
        custom, // TODO，没有不上报
      });
      window.localStorage.setItem(this.storageName, JSON.stringify(this.ev));
      if (this.ev.length >= this.maxStorage) {
        this.sendLog();
      }
    } else {
      console.error('[Monitor报错]：埋点方法需要先初始化，this.ev未定义');
    }
  }

  // 子日志生成装饰器
  track({id = '', type = 'PV', custom}) {
    const self = this;
    if (type && id) {
      return function decorator(...target) {
        console.log('target:', target);
        if (target.length === 1) {
          // 装饰Class
          return self.withTrackingComponentDecorator(type, id, custom)(...target);
        }

        return self.trackEventMethodDecorator(type, id, custom)(...target);
      };
    } else {
      console.error('[Monitor报错]：埋点需要埋点类型和事件ID');
    }
  }

  // Class装饰器
  withTrackingComponentDecorator(type, id, options = {}) {
    const self = this;
    // target为装饰的Class组件
    return (target) => {
      // const decoratedComponentName = target.displayName || target.name || 'Component';
      // PV点，监听组件componentDidMount
      if (target.prototype.componentDidMount) {
        const didMount = target.prototype.componentDidMount;
        target.prototype.componentDidMount = function() {
          self.processLogSerial(type, id);
          didMount();
        };
      } else {
        target.prototype.componentDidMount = function() {
          self.processLogSerial(type, id);
        };
      }

      // PE点，监听组件componentWillUnmount
      if (target.prototype.componentWillUnmount) {
        const willUnMount = target.prototype.componentWillUnmount;
        target.prototype.componentWillUnmount = function() {
          self.processLogSerial(type === 'PV' ? 'PE' : 'AE', id); // 如果装饰器type为PV，则这里埋PE点；如type为AS，则这里为AE
          self.sendLog(); // 在页面或APP卸载时发送所有存在的日志
          willUnMount();
        };
      } else {
        target.prototype.componentWillUnmount = function() {
          self.processLogSerial(type === 'PV' ? 'PE' : 'AE', id);
          self.sendLog(); // 在页面或APP卸载时发送所有存在的日志
        };
      }
    };
  }

  // Class方法装饰器
  trackEventMethodDecorator(type, id, custom) {
    const self = this;
    return (target, name, describe) => {
      console.log(target, name, describe);
      const fn = describe.value;
      describe.value = () => {
        self.processLogSerial(type, id, custom);
        fn();
      }
    };
  }

  // 事件日志侵入生成
  trackEv(type, id, custom) {
    this.processLogSerial(type, id, custom);
  }

  // 通用字段配置
  generateNormal() {
    // 用户
    if (this.custno === '') {
      this.custno = (JSON.parse(window.localStorage.getItem('userInfo')) || {}).custno || null;
    }
    // 设备指纹
    const ua = window.navigator.userAgent;
    const device = new userAgent(ua);
    getIP((ip) => this.ip = ip);
    this.deviceInfo = {
      ua, // 客户端的user agent
      os: device.os && device.os.name, // 根据UA计算，操作系统
      osv: device.os && device.os.version && device.os.version.alias, // 根据UA计算，操作系统版本
      dt: device.device && device.device.type, // 设备类型
      bt: device.browser && device.browser.name, // 浏览器类型
      btv: device.browser && device.browser.version && device.browser.version.original, // 浏览器版本
      // ip: this.ip, // 异步获取的IP
      maccode: this.maccode,
    };

    return {
      custno: this.custno,
      ...this.deviceInfo,
      re: document.referrer, // URL来源
      utm: this.utm,
      name: this.appName, // 应用名称，如trade_pc
      av: this.appVersion, // App版本号
      sv: this.version, // SDK版本
      title: document.title || '',
      domain: document.domain || '',
      url: document.URL,
      sc: window && window.screen && `${window.screen.width}X${window.screen.height}`, // 屏幕尺寸/分辨率
      dpi: window.devicePixelRatio || '', // 设备像素比
    };
  }

  // 变更用户信息
  setUser() {}

  // 设置流量来源
  setUTM() {}

  // 设置设备指纹，当项目在如APP能通过JSBridge获取时，可以自定义设置设备指纹信息
  setDeviceInfo() {}
}

export default new Monitor();
