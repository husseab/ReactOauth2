import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import {domain, clientId, redirectUri, audience, scope} from './keys'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={redirectUri}
    audience={audience}
    scope={scope}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);

