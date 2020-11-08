import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import * as serviceWorker from './serviceWorker';
import allReducers from './redux/reducers/index.js'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagas/rootSaga";
import 'antd/dist/antd.css';

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
  
  allReducers,
  applyMiddleware(sagaMiddleware),
);


sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
