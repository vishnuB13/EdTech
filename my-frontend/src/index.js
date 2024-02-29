import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { LoginProvider } from './Context/LoginContext.js';
import { AdminLoginProvider } from './Context/AdminContext.js';
import { TutorLoginProvider } from './Context/TutorContext.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='185441576043-cd48iocgaq1u0g0ooptloqp3k62ijbar.apps.googleusercontent.com'> 
    <LoginProvider>
      <AdminLoginProvider>
        <TutorLoginProvider>
      <App />
      </TutorLoginProvider>
      </AdminLoginProvider>
    </LoginProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
