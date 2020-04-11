import React from 'react';
import ReactDOM from 'react-dom';
import users from './redux-only/userStore'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import User from './redux-only/User';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={users}>
      <User />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
