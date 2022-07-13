<template>
	<form @submit.prevent="submit">
		<slot />
	</form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		callback: {
			type: Function,
			required: true,
		},
		isDisabled: {
			type: Boolean,
			default: false,
		},
	},
	
	computed: {
		...mapGetters({
			isSupportedChain: "web3/isSupportedChain",
		}),
	},

	methods: {
		async submit() {
			if (!this.isDisabled && this.isSupportedChain) {
				try {
					this.$nuxt.$emit("popups.transaction.open");
					await this.callback();
					this.$emit("success");
				} catch (e) {
					console.error(e);
					this.$nuxt.$emit("popups.transaction.error", e);
				}
			}
		},
	},
};
</script>
