Reproduction of https://github.com/ardatan/graphql-tools/issues/1453

To run:
```
yarn && yarn run test
```

Notice that the first test passes. The `filter` argument is `undefined` in the search resolver, not `null`. Notice the second test fails and the query throws an execption because `filter` is `null`. The only difference between these two tests is that the first uses `makeExecutableSchema` exclusively, and the second uses `mergeSchemas`.
