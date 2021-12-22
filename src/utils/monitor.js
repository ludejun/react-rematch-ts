/* eslint-disable */
import React, { useEffect } from 'react';
import UserAgent from './userAgent';
import getIP from './ip';
import { isAndroidOrIOS } from './index.ts';

class Monitor {
  constructor() {
    this.version = '1.0.1'; // SDK版本号
  }

  // 初始化
  init({
    appName,
    appVersion,
    headerName,
    apiUrl,
    maxStorage,
    custno,
    maccode,
    accptMd
  }) {
    this.storageName = headerName || '__ReactMonitorLogs'; // 持久存储Key、日志发送的Header Key
    this.maxStorage = maxStorage || 5; // 日志最大存储量
    this.ev = []; // 存储事件日志
    this.apiServer = apiUrl || ''; // 日志发送地址，Get请求，一般为请求1*1gif
    this.custno = custno || '';
    this.appName = appName || '';
    this.appVersion = appVersion || '';
    this.accptMd = accptMd || '';
    if (!this.apiServer) {
      console.error(
        '[Monitor报错]：埋点方法需要上报服务端URL，一般为请求1*1gif'
      );
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
        if (macLocal) {
          this.maccode = macLocal;
        } else {
          this.maccode = `${String(Date.now())}-${Math.floor(
            1e7 * Math.random()
          )}-${Math.random()
            .toString(16)
            .replace('.', '')}`;
          window.localStorage.setItem('maccode', this.maccode);
        }
      }

      // 监听浏览器关闭和刷新
      const self = this;
      window.onbeforeunload = function() {
        self.processLogSerial('AE', ''); // 自动加AE点， TODO：无ID
        self.sendLog();
      };
    } catch (e) {
      console.log('[Monitor初始化报错]:', e);
    }

    this.generateNormal(); // 生成外层通用字段
    getIP(ip => {
      this.baseInfo.ip = ip;
    });
  }

  // 发送日志
  sendLog() {
    try {
      if (this.ev.length > 0) {
        // 当this.baseInfo中无IP信息
        if (!this.baseInfo.ip) {
          this.baseInfo.ip = getIP(ip => (this.baseInfo.ip = ip));
        }
        const request = new XMLHttpRequest();
        // request.responseType = 'blob';
        request.open('post', this.apiServer, true);
        /* request.setRequestHeader(
          this.storageName,
          encodeURIComponent(JSON.stringify({ ...this.baseInfo, ev: this.ev })),
        ); */
        request.onreadystatechange = () => {
          if (
            request.readyState === XMLHttpRequest.DONE &&
            request.status === 200
          ) {
            // 成功送达则清除数据
            this.ev = [];
            window.localStorage.setItem(this.storageName, '[]');
          } else {
            // TODO 是否做超时重发
            // console.error('[Monitor报错]：埋点上报不成功');
          }
        };
        request.send(
          JSON.stringify({ loyalvalleylog: { ...this.baseInfo, ev: this.ev } })
        );
      }
    } catch (e) {
      console.log('[Monitor报错]', e);
    }
  }

  // 整合日志
  processLogSerial(type, id, custom, force) {
    if (this.ev && Array.isArray(this.ev)) {
      this.ev.push({
        type,
        ts: new Date().getTime(),
        id,
        custom // TODO，没有不上报
      });
      window.localStorage.setItem(this.storageName, JSON.stringify(this.ev));
      if (this.ev.length >= this.maxStorage || force) {
        this.sendLog();
      }
    } else {
      console.error('[Monitor报错]：埋点方法需要先初始化，this.ev未定义');
    }
  }

  // 子日志生成装饰器
  track({ id = '', type = 'PV', custom }) {
    const self = this;
    if (type && id) {
      return (...target) => {
        console.log('target:', target);
        console.log(this);
        if (target.length === 1) {
          // 装饰Class
          return self.withTrackingComponentDecorator(
            type,
            id,
            custom
          )(...target);
        }

        return self.trackEventMethodDecorator(type, id, custom)(...target);
      };
    }
    console.error('[Monitor报错]：埋点需要埋点类型和事件ID');
  }

  // Class装饰器
  withTrackingComponentDecorator(type, id) {
    const self = this;
    // target为装饰的Class组件
    // return target => {
    //   // const decoratedComponentName = target.displayName || target.name || 'Component';
    //   // PV点，监听组件componentDidMount
    //   if (target.prototype.componentDidMount) {
    //     console.log(this);
    //     const didMount = target.prototype.componentDidMount;
    //     // eslint-disable-next-line
    //     target.prototype.componentDidMount = () => {
    //       self.processLogSerial(type, id);
    //       didMount.bind(target)();
    //     };
    //   } else {
    //     // eslint-disable-next-line
    //     target.prototype.componentDidMount = () => {
    //       self.processLogSerial(type, id);
    //     };
    //   }

    //   // PE点，监听组件componentWillUnmount
    //   if (target.prototype.componentWillUnmount) {
    //     const willUnMount = target.prototype.componentWillUnmount;
    //     // eslint-disable-next-line
    //     target.prototype.componentWillUnmount = () => {
    //       self.processLogSerial(type === 'PV' ? 'PE' : 'AE', id); // 如果装饰器type为PV，则这里埋PE点；如type为AS，则这里为AE
    //       self.sendLog(); // 在页面或APP卸载时发送所有存在的日志
    //       willUnMount.bind(target)();
    //     };
    //   } else {
    //     // eslint-disable-next-line
    //     target.prototype.componentWillUnmount = () => {
    //       self.processLogSerial(type === 'PV' ? 'PE' : 'AE', id);
    //       self.sendLog(); // 在页面或APP卸载时发送所有存在的日志
    //     };
    //   }
    // };
    return WrappedComponent =>
      class extends React.Component {
        componentDidMount() {
          self.processLogSerial(type, id);
        }

        componentWillUnmount() {
          self.processLogSerial(type === 'PV' ? 'PE' : 'AE', id); // 如果装饰器type为PV，则这里埋PE点；如type为AS，则这里为AE
          self.sendLog(); // 在页面或APP卸载时发送所有存在的日志
        }

        render() {
          return <WrappedComponent {...this.props} />;
        }
      };
  }

  // Class方法装饰器
  trackEventMethodDecorator(type, id, custom) {
    const self = this;
    return (target, name, describe) => {
      console.log(target, name, describe);
      const fn = describe.value;
      // eslint-disable-next-line
      describe.value = () => {
        self.processLogSerial(type, id, custom);
        fn();
      };
    };
  }

  // 事件日志侵入生成， force表示是否强制立即推送
  trackEv(type, id, custom, force = false) {
    this.processLogSerial(type, id, custom, force);
  }

  // 通用字段配置
  generateNormal() {
    if (!this.baseInfo) {
      // 用户
      if (this.custno === '') {
        this.custno =
          (JSON.parse(window.localStorage.getItem('userInfo')) || {}).custno ||
          null;
      }
      // 设备指纹
      const ua = window.navigator.userAgent;
      const device = new UserAgent(ua);
      this.deviceInfo = {
        ua, // 客户端的user agent
        os: device.os && device.os.name, // 根据UA计算，操作系统
        osv: device.os && device.os.version && device.os.version.alias, // 根据UA计算，操作系统版本
        dt: device.device && device.device.type, // 设备类型
        bt: device.browser && device.browser.name, // 浏览器类型
        btv:
          device.browser &&
          device.browser.version &&
          device.browser.version.original, // 浏览器版本
        maccode: this.maccode
      };
      if (!this.accptMd) {
        if (window.deviceInfo && window.deviceInfo.os) {
          this.accptmd =
            (window.deviceInfo || {}).os.toLowerCase() === 'ios' ? '2' : '3';
        } else {
          this.accptmd = isAndroidOrIOS() === 'android' ? '3' : '2';
        }
      }

      this.baseInfo = {
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
        sc:
          window &&
          window.screen &&
          `${window.screen.width}X${window.screen.height}`, // 屏幕尺寸/分辨率
        dpi: window.devicePixelRatio || '', // 设备像素比
        accptmd: this.accptMd // 终端类型 1 -> PC ;  2 -> iOS;  3 -> Android ;  4 -> H5;  5 -> 微信小程序
      };
    }
  }

  // 变更用户信息
  setUser(custno) {
    this.custno = custno;
    this.baseInfo = { ...this.baseInfo, custno };
  }

  // 设置流量来源
  setUTM(source) {
    this.utm = source;
    this.baseInfo = { ...this.baseInfo, utm: source };
  }

  // 设置设备指纹，当项目在如APP能通过JSBridge获取时，可以自定义设置设备指纹信息
  setDeviceInfo(deviceInfo) {
    this.deviceInfo = {
      ...this.deviceInfo,
      ...deviceInfo
    };
    this.baseInfo = {
      ...this.baseInfo,
      ...this.deviceInfo
    };
  }

  // 专供函数组件使用的PV/PE埋点hooks，在函数组件中调用 monitor.useTrack('123', {}); force表示是否立即发送
  useTrack(id, custom, force = false) {
    useEffect(() => {
      this.processLogSerial('PV', id, custom, force);
      return () => {
        this.processLogSerial('PE', id, custom, force);
      };
    }, []);
    return [];
  }
}

export default new Monitor();
