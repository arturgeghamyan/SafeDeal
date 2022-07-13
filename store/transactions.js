export const state = () => {
	return {
		transactions: {},
	};
};

export const mutations = {
	SET_TRANSACTION(state, { txhash, status, error }) {
		state.transactions = {
			...state.transactions,
			[txhash]: {
				...state.transactions[txhash],
				status,
				error,
			},
		};
	},
};

export const actions = {
	send({ commit, rootState }, { callback }) {
		let txhash;
		return callback
			.send({
				from: rootState.auth.address,
			})
			.on("transactionHash", (hash) => {
				txhash = hash;

				commit("SET_TRANSACTION", { txhash, status: "PENDING", error: null });
			})
			.then(() => {
				commit("SET_TRANSACTION", { txhash, status: "CONFIRMED", error: null });
			})
			.catch((error) => {
				console.error(error);
				if (txhash) {
					commit("SET_TRANSACTION", { txhash, status: "ERROR", error });
				}
				throw error;
			});
	},
};

export const getters = {
	all: ({ transactions }) => transactions,
};
