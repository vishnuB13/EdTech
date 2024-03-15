import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { LoginProvider } from './Context/LoginContext.js';
import { TutorLoginProvider } from './Context/TutorContext.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './redux/Store/store.js';
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
   <React.StrictMode>
     <GoogleOAuthProvider clientId='185441576043-cd48iocgaq1u0g0ooptloqp3k62ijbar.apps.googleusercontent.com'>
      <LoginProvider>
          <TutorLoginProvider>
            <App />
          </TutorLoginProvider>
      </LoginProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
 </Provider>
);
reportWebVitals();
