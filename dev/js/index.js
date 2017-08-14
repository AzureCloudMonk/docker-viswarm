import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import history from './supports/history';
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';

import SwarmPage from './containers/swarm';
import Services from './containers/services';
import Tasks from './containers/tasks';
import Networks from './containers/networks';
import Sidebar from './containers/layouts/side-bar';

const middleware = routerMiddleware(history);
const logger = createLogger();
const store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, logger, middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Sidebar/>
                <Switch>
                    <Route exact path="/" component={SwarmPage}/>
                    <Route path="/nodes" component={SwarmPage}/>
                    <Route path="/services" component={Services}/>
                    <Route path="/tasks" component={Tasks}/>
                    <Route path="/networks" component={Networks}/>
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
