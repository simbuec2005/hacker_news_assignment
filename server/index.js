import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import { StaticRouter, matchPath } from "react-router-dom";

import App from '../src/App';
import { configureStore } from '../src/store';
import { getNews } from '../src/actions';
import { fetchNewsApi } from '../src/services/api';



const PORT = 3006;
const app = express();

app.use(express.static('./build'));

let reactDom;

app.get('/*', (req, res) => {

    const store = configureStore();
    const dataPromise = store.dispatch(fetchNewsApi(req.query));

    dataPromise.then((data) => {
        const jsx = (
            <Provider store={store}>
                <StaticRouter context={{}} location={req.url}>
                    <Route path="/" component={App} />
                </StaticRouter>
            </Provider>
        );
        reactDom = renderToString(jsx);
        const reduxState = store.getState();

        console.log('server');

        res.end(renderFullPage(reduxState));
    })
});

function renderFullPage(preloadedState) {


    return `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
        </head>
        <body>
          <div id="root">${reactDom}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/recipes/server-rendering/#security-considerations
            window.data = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
        )}
          </script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
      `
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});