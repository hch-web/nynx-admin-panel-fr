import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

// COMPONENTS
import store from 'store';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
