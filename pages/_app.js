import { ApolloProvider } from 'react-apollo'
import client from '../common/apollo-client-ref'
// import 'antd/dist/antd.min.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/collapse/style/index.css'
import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
