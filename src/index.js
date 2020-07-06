import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routes from './routes';
import App from './App';
import { configureStore } from './store';
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = {};

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)
// store.runSaga(rootSaga)
console.log('client');

const jsx = (
  <ReduxProvider store={store}>
    <Router>
      <Switch>
        <Route path="/search" component={App} />
      </Switch>
    </Router>
  </ReduxProvider>
);

const app = document.getElementById("root");
ReactDOM.hydrate(jsx, app);
