import React from "react";
// `useQuery` will allow us to make requests to the GraphQL server we connected to using the <ApolloProvider> component in App.js.
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Home = () => {
	// use useQuery hook to make query request
	const { loading, data } = useQuery(QUERY_THOUGHTS);

	// optional chaining: negates the need to check if an object even exists before accessing its properties.
	const thoughts = data?.thoughts || [];
	console.log(thoughts);

	return (
		<main>
			<div className="flex-row justify-space-between">
				<div className="col-12 mb-3">
					{loading ? (
						<div>Loading...</div>
					) : (
						<ThoughtList
							thoughts={thoughts}
							title="Some Feed for Thought(s)..."
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default Home;
