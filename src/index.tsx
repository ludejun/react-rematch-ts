// import '@babel/polyfill';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.less';
import Routes from './routes';
import Storage from './utils/Storage';
import configs from './configs';
import * as serviceWorker from './serviceWorker';
import monitor from './utils/monitor';

Storage.setNamespace(configs.name);
monitor.init({
  appName: configs.name,
  headerName: 'loyalvalleylog',
  apiUrl: 'http://localhost:3000/log.gif',
});

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
