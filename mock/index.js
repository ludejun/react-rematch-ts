import Mock from 'mockjs';
import { apiURL } from '../src/configs/api';

// 以下为API的自定义mock
// 1. 先引入mock JSON，或者使用mockjs生成，生产文档参考：http://mockjs.com/examples.html
const loginData = require('./data/login.json');
// 2. 代理URL，第一个参数可以为fetch真实发出的url请求，也可以是正则表达式；后面函数的options参数即为fetch的options参数，包含header和body
Mock.mock(apiURL('login'), function(options) {
  return loginData;
});