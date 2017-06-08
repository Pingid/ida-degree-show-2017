import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
