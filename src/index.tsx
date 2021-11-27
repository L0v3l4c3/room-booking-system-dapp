import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import Auth from './components/Auth';
import reportWebVitals from './reportWebVitals';

import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Auth>
        <App />
      </Auth>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
