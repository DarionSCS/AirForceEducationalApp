import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import './styles/reset.css'
import './styles/base/_app.css';
import App from './App';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const graphQL_token = process.env.REACT_APP_HYGRAPH_ACCESS_TOKEN;

const httpLink = createHttpLink({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw9sgvon01rc07v13b3wpslk/master',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: graphQL_token ? `Bearer ${graphQL_token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
