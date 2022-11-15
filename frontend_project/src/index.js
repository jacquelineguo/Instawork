import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUsers } from './usersSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';

store.dispatch(fetchUsers());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
