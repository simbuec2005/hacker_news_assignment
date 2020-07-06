import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from './App';
import { configureStore } from './store';
import './App.css';
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.data;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

const jsx = (
  <ReduxProvider store={store}>
        <App />
  </ReduxProvider>
);

const app = document.getElementById("root");
ReactDOM.hydrate(jsx, app);
