import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import RootRouter from './router';

import Snowfall from 'react-snowfall';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/react-leaflet-markercluster/dist/styles.min.css';
//import 'leaflet-defaulticon-compatibility';

import '../node_modules/react-vertical-timeline-component/style.min.css';
import '../node_modules/react-custom-scroll/dist/customScroll.css';

ReactDOM.render(
  <React.StrictMode>
    <RootRouter /> {/* 轉換頁面分流器 */}
    {/* 12月下雪特效 */}
    {new Date().getMonth() == 11 && <Snowfall snowflakeCount={new Date().getDate()*10} />}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
