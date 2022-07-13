export const actions = {
	loadData({ dispatch }) {
		try {
			dispatch("assets/loadBalances");
		} catch (error) {
			console.error(error);
		}
	},
};
