import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as Router from 'react-router-dom';
import * as Containers from './containers';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Router.BrowserRouter>
      <Containers.App />
    </Router.BrowserRouter>,
  );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
