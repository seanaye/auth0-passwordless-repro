import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <div>is authenticated: {`${isAuthenticated}`}</div>
      </div>
      <button onClick={loginWithRedirect}>Login</button>
    </div>
  );
};

const Callback = () => {
  const { handleRedirectCallback } = useAuth0();
  const history = useHistory()

  useEffect(() => {
    async function handler() {
      const callbackRes = await handleRedirectCallback();
      console.log({ callbackRes })
      history.push("/")
    }
    handler()
  }, [])
  
  return <div>loading...</div>
}

export default function App() {
  return (
    <Auth0Provider
      domain="coparse-dev.us.auth0.com"
      clientId="5ZLPQyMRdiyubalGiXaPREGiEU9myGeD"
      redirectUri="http://localhost:1212/callback"
      audience="https://auth.coparse.com"
    >
      <Router>
        <Switch>
          <Route path="/" component={Hello} />
          <Route path="/callback" component={Callback} />
        </Switch>
      </Router>
    </Auth0Provider>
  );
}
