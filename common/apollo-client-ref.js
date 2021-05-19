// import { ApolloLink } from 'apollo-client-preset';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_URL } from '../constants'

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` })

const client = new ApolloClient({
  // link: httpLinkWithAuthToken,
  link: httpLink, // uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
  // defaultOptions: defaultOptions,
})

export default client
