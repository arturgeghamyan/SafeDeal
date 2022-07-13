import { mapGetters, mapActions } from "vuex";

export default {
	computed: {
		...mapGetters({
			address: "auth/address",
		}),
	},

	methods: {
        ...mapActions({
            login: "auth/login",
        }),
        
		async tryLogin() {
			let provider = await this.$localForage.getItem("provider");
			if (this.$device.isMobile &&  !!window.ethereum) {
				provider = 'injected'
			}
			if (!this.$ethereum()) {
				setTimeout(this.tryLogin, 1000);
				return;
			}
			if (["injected", "binance"].includes(provider)) {
				this.$setWeb3Provider(provider);
				this.login().catch((err) => {
					console.error(err);
					return this.$localForage.removeItem("provider");
				});
			}
		},
	},

	mounted() {
		try {
			if (!this.address) {
				this.tryLogin();
			}
		} catch (err) {
			console.error(err);
		}
	},
};
