import './App.css';
import { Outlet } from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
const token = localStorage.getItem('token');
import { setContext } from '@apollo/client/link/context';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `bearer ${token}`,
  },
});

import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <Navbar />
      <Outlet />
      </div>
    </ApolloProvider>
  )
}

export default App;
