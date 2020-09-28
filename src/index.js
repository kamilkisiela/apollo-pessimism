import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  assumeImmutableResults: true,
  cache: new InMemoryCache({
    addTypename: true,
    resultCaching: true,
  }),
  resolvers: {
    Query: {
      async item(_, { id }) {
        return {
          id,
          value: `value-for-id-${id}`,
        };
      },
    },
  },
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById("root")
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}