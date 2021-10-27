import { graphqlHTTP } from "express-graphql";
import { buildSchema, assertInputType } from "graphql";
import express from "express";

// Construct a schema, using GraphQL schema language
var restaurants = [
  {
    id: 1,
    name: "WoodsHill ",
    description:
      "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      {
        name: "Swordfish grill",
        price: 27,
      },
      {
        name: "Roasted Broccily ",
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description:
      "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      {
        name: "Flatbread",
        price: 14,
      },
      {
        name: "Carbonara",
        price: 18,
      },
      {
        name: "Spaghetti",
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description:
      "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      {
        name: "Dragon Roll",
        price: 12,
      },
      {
        name: "Pancake roll ",
        price: 11,
      },
      {
        name: "Cod cakes",
        price: 13,
      },
    ],
  },
];
var schema = buildSchema(`
type Query{
  restaurant(id: Int): restaurant
  restaurants: [restaurant]
},
type restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input restaurantInput{
  id: Int
  name: String
  description: String
  dishes: String
}
type DeleteResponse{
  ok: Boolean!
}
type Mutation{
  setrestaurant(input: restaurantInput): restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, name: String!): restaurant
}
`);
// The root provides a resolver function for each API endpoint

var root = {
  restaurant: (arg) => {
    // Your code goes here
    return restaurants[id]
  },
  restaurants: () => {
    // Your code goes here
    return restaurants
  },
  setrestaurant: ({ input }) => {
    // Your code goes here
    restaurants.push(
      {
        id: input.id,
        name: input.name,
        description: input.description,
      }
    )
    console.log(restaurants)
    return input
  },
  deleterestaurant: ({ id }) => {
    // Your code goes here
    const ok = Boolean(restaurants[id])
    let deleteThisOne = restaurants[id]
    restaurants = restaurants.filter((item) => item.id !== id)
    console.log(deleteThisOne)
    console.log(restaurants)
    return ok
  },
  editrestaurant: ({ id, ...restaurant }) => {
    // Your code goes here
    if (!restaurants[id]) {
      throw new Error('Restaurant does not exist in our database')
    }
    restaurants[id] = {
      ...restaurants[id],...restaurant
    }
    console.log(restaurants[id])
    return restaurants[id]
  }
};
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
var port = 5555;
app.listen(port, () => console.log("Running Graphql on Port:" + port));

export default root;
