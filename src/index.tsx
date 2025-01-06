// import '@babel/polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.less';
import { DRoutes } from './routes';
import Storage from './utils/Storage';
import configs from './configs';
import monitor from './utils/monitor';

Storage.setNamespace(configs.name);
monitor.init({
  appName: configs.name,
  headerName: 'loyalvalleylog',
  apiUrl: 'http://localhost:3000/log.gif'
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <DRoutes />
  </Provider>
  , 
);
