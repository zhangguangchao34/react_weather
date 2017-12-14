import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory, browserHistory } from 'react-router';
import App from './../js/App';
import Dashboard from './../js/Dashboard';
import WeatherInfo from './../js/WeatherInfo';

import with_basename from './../utils/with_basename';
import '../styles/main.less';

// nav menu items config
var NAV_CONFIG = require('./../configs/nav_config.js');

require('react-router-loader');

render((

     <Router history={hashHistory}>
        <Route path="/" component={Dashboard}>
            <IndexRedirect to="/WeatherInfo" />
            <Route path="/WeatherInfo" component={WeatherInfo}/>
        </Route>
    </Router>


), document.getElementById('appIndex'));
