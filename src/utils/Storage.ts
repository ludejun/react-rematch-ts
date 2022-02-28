import Moment from './moment';
import configs from '../configs';

const baseStorage: any = window.Storage;
const { parse, stringify } = JSON;

baseStorage.prototype.set = function(key: any, value: any, expired: any) {
  const wrapped: any = {
    data: value
  };
  if (expired) {
    wrapped.expired = new Moment().add(expired, 'm');
  }
  this.setItem(`${this.namespace}_${key}`, stringify(wrapped));
};

baseStorage.prototype.get = function(key: any) {
  const string = this.getItem(`${this.namespace}_${key}`);
  const wrapped = parse(string);
  let result = null;
  if (wrapped) {
    if (this.isExpired(wrapped)) {
      // remove expired item
      this.removeItem(`${this.namespace}_${key}`);
    } else {
      result = wrapped.data;
    }
  }
  return result;
};

baseStorage.prototype.remove = function(key: any) {
  this.removeItem(`${this.namespace}_${key}`);
};

baseStorage.prototype.retrieve = function(key: any, expired: any, success: any, fail: any) {
  const data = this.get(key);
  const saveOpts = {
    key,
    expired
  };
  if (data) {
    success(data, saveOpts); // true means isCache
  } else {
    fail((res: any) => {
      if (res) {
        this.set(key, res, expired);
      }
    }, saveOpts);
  }
};

baseStorage.prototype.isExpired = function(wrapped: any) {
  const currentTime = new Date().getTime();

  if (wrapped.expired) {
    if (currentTime > wrapped.expired) {
      return true;
    }
  }
  return false;
};

baseStorage.prototype.setNamespace = function(namespace: string) {
  baseStorage.prototype.namespace = namespace || configs.name;
};

baseStorage.getStorage = function(name: string) {
  if (name === 'session') {
    return sessionStorage;
  }
  return localStorage;
};

export default baseStorage.getStorage(configs.storage);
