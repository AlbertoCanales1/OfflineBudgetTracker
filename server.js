const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const {ApolloServer} = require("apollo-server-express")

const PORT = process.env.PORT || 3000;

const app = express();


let server
async function startServer() {

  server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,

  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});