import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	computed: {
		...mapGetters({
			address: "auth/address",
		}),
	},

	data() {
		return {
			accounts: [],
			accountsTimer: null,
		};
	},

	methods: {
		...mapActions({
			login: "auth/login",
			_loadUserData: "user/loadData",
			startQueryTimeout: 'web3/transactions/startQueryTimeout',
		}),

		...mapMutations({
			logout: "auth/LOGOUT",
		}),

		__loadUserData() {
			if (this.address) {
				try {
					console.log(111);
					this._loadUserData();
				} catch (e) {
					console.error(e);
				}
			}
		},

		async getAccounts() {
			this.accounts = await this.$web3().eth.getAccounts();
			clearTimeout(this.accountsTimer);
			this.accountsTimer = setTimeout(this.getAccounts, 1000);
		},
	},

	watch: {
		address(to) {
			if (to) {
				this.__loadUserData();
				this.$nextTick(() => {
					this.startQueryTimeout();
				});
			}
		},

		accounts(data) {
			if (!data.length) {
				this.logout();
				this.$localForage.removeItem("provider");
			}
		},
	},

	mounted() {
		this.__loadUserData();
	},

	destroyed() {
		clearTimeout(this.accountsTimer);
	},
};
