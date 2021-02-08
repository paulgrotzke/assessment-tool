import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AdminContext } from './lib/context';

ReactDOM.render(
  <AdminContext.Provider
    value={{ admin: 'S7G90ov5HxgdTvv2bDdRQAxx6vO2' }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AdminContext.Provider>,
  document.getElementById('root'),
);
