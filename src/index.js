import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router, Route } from 'react-router-dom'

import './wheelRotation.css';
import './index.css';

Math.radians = function(degrees) { return degrees * Math.PI / 180; };
Math.degrees = function(radians) { return radians * 180 / Math.PI; };

const routes = () => (
  <Router>
    <Route path="/:name?" component={App}/>
  </Router>
);

ReactDOM.render(routes(), document.getElementById('root'));
registerServiceWorker();
