import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import axios from 'axios';
// import CustomHeatmapDisplay from './heatmapCustom';
import reportWebVitals from './reportWebVitals';
// import dailyHeatmapMain from './dailyHeatmapMain';
const base_ip = window.location.href.replace("http://", "").split(":")[0];
axios.defaults.baseURL = "http://" + base_ip + ":5001";
ReactDOM.render(
  
  // <React.StrictMode>
  <BrowserRouter>
      <App/>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
