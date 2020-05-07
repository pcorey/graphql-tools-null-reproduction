const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { mergeSchemas } = require("graphql-tools");

let typeDefs = `
  enum Filter {
    all
    some
  }

  type Query {
    search(filter: Filter): String!
  }
`;

const resolvers = {
  Query: {
    search: (root, args, context) => {
      if (args.filter === null) {
        throw new Error("filter is null");
      }
      return "result";
    },
  },
};

let query = `
  query search($filter: Filter) {
    search(filter: $filter)
  }
`;

let variables = {};

it("works", async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  let result = await graphql(schema, query, {}, {}, variables);
  console.log(result);

  expect(result.data.search).toBe("result");
});

it("does not work", async () => {
  const schema = mergeSchemas({
    schemas: [
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
    ],
    resolvers: [],
  });

  let result = await graphql(schema, query, {}, {}, variables);
  console.log(result);

  expect(result.data.search).toBe("result");
});

it("works without variables", async () => {
  const schema = mergeSchemas({
    schemas: [
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
    ],
    resolvers: [],
  });

  let query = `
    query {
      search
    }
  `;

  let result = await graphql(schema, query, {}, {}, variables);
  console.log(result);

  expect(result.data.search).toBe("result");
});
