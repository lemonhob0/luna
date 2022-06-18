import "@styles/globals.scss";
import Layout from "components/layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NextNProgress from "nextjs-progressbar";
const client = new ApolloClient({
  uri: "https://nono77.herokuapp.com/",
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <NextNProgress
          color="#0569c7"
          height={2}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
