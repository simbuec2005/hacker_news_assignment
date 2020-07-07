import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
// import { StaticRouter, matchPath } from "react-router-dom";

import App from '../src/App';
import { configureStore } from '../src/store';
import { getNews } from '../src/actions';
import { fetchNewsApi } from '../src/services/api';



const PORT = 3000;
const app = express();

app.use(express.static('./build'));

let reactDom;

app.get('/*', (req, res) => {

    const store = configureStore();
    const dataPromise = store.dispatch(fetchNewsApi(req.query));
    const indexFile = path.resolve('./build/index.html');
    

    dataPromise.then((data) => {
        const jsx = (
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        );
        reactDom = renderToString(jsx);
        const reduxState = store.getState();

        
        return fs.readFile(indexFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!');
            }
    
            return res.send(
                data.replace('<div id="root"></div>', `<div id="root">${reactDom}<script>
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // https://redux.js.org/recipes/server-rendering/#security-considerations
                window.data = ${JSON.stringify(reduxState).replace(
                /</g,
                '\\u003c'
            )}
              </script></div>`)
            );
        });
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});