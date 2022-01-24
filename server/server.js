const express = require("express");
const path = require("path");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
	// create a new Apollo server and pass in our schema data
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		// This ensures that every request performs an authentication check, and the updated request object will be passed to the resolvers as the "context"
		context: authMiddleware,
	});

	// Start the Apollo server
	await server.start();

	// integrate our Apollo server with the Express application as middleware
	server.applyMiddleware({ app });

	// log where we can go to test our GQL API
	console.log(`Use GraphQL at http://localhost:$PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

// wildcard GET route for the server
// If we make a GET request to any location on the server that doesn't have an explicit route defined, respond with the production-ready React front-end code.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});
