import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
