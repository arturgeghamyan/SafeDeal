import { mapGetters, mapActions } from "vuex";

export default {
	computed: {
		...mapGetters({
			chainId: "web3/chainId",
		}),
	},

	methods: {
		...mapActions({
			_loadStatsData: "stats/load",
			startQueryTimeout: "web3/transactions/startQueryTimeout",
		}),
	},

	watch: {
		chainId() {
			this._loadStatsData();
			this.$nextTick(() => {
				this.startQueryTimeout();
			});
		},
	},

	mounted() {
		this._loadStatsData();
		this.$nextTick(() => {
			this.startQueryTimeout();
		});
	},
};
