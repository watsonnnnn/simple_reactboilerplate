/**
 * Created by Administrator on 2017/3/21.
 */
import {Router, Route, IndexRoute, Redirect, hashHistory , browserHistory} from 'react-router';
import React, {Component, PropTypes} from 'react';
import Index from '../components';

import 'normalize.css';
import '../stylesheets/index.scss';

const history = process.env.NODE_ENV == 'production'?browserHistory:hashHistory

const Roots = (props)=>(
    <div>
        {props.children}
    </div>
)

const rootRoute = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={Index}/>
            <Redirect from='*' to='/'/>
        </Route>
    </Router>
)

export default rootRoute;
