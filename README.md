# Reproduction of 

Steps:

1. First, `npm install`
1. Run `npm run production`
1. Open `http://localhost:5000`
1. Take a heap snapshot and look for a `Map` related to `watchDep` prop of `InMemoryCache`
1. Click `Unmount` button
1. Take a heap snapshot again and look for a `Map` related to `watchDep` prop of `InMemoryCache`
1. There's still a record for the query, with `callback`

