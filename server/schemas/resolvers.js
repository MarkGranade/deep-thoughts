const { User, Thought } = require("../models");

const resolvers = {
	Query: {
		// We pass in the "parent" as more of a placeholder parameter. It won't be used, but we need something in that first parameter's spot so we can access the "username" argument from the second parameter.
		thoughts: async (parent, { username }) => {
			// Ternary operator to check if "username" exists. If it does, we set "params" to an object with a "username" key set to that value. If it doesn't, we return an empty object.
			const params = username ? { username } : {};
			// We're returning the thought data in descending order, using ".sort()".
			return Thought.find(params).sort({ createdAt: -1 });
		},

		thought: async (parent, { _id }) => {
			return Thought.findOne({ _id });
		},

		// get all users
		users: async () => {
			return User.find()
				.select("-__V -password")
				.populate("friends")
				.populate("thoughts");
		},
		// get a user by username
		user: async (parent, { username }) => {
			return User.findOne({ username })
				.select("-__v -password")
				.populate("friends")
				.populate("thoughts");
		},
	},
};

module.exports = resolvers;
