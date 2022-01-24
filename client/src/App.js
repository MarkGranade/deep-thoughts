import React from "react";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

function App() {
	// we wrap the entire returning JSX with <ApolloProvider> because we're passing...
	// ... the `client` variable in as the value for the client prop in the provider, ...
	// ... everything between the JSX tags will eventually have access to ther server's API data through the `client` we set up.
	return (
		<ApolloProvider client={client}>
			<div className="flex-column justify-flex-start min-100-vh">
				<Header />
				<div className="container">
					<Home />
				</div>
				<Footer />
			</div>
		</ApolloProvider>
	);
}

export default App;
