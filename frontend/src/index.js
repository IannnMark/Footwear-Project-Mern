import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store'
import App from './App';

// import { positions, transitions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'

import { ToastContainer } from 'react-toastify';

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_CENTER,
//   transition: transitions.SCALE
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <BrowserRouter>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
      <ToastContainer />
      {/* </AlertProvider> */}
    </BrowserRouter>

  </Provider>

);