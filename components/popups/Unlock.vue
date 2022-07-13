<template>
	<popups-wrapper title="Connect Wallet" name="unlock">
		<div slot-scope="popup" class="pt-3 pb-5">
			<p class="text-center">Select your preferred Wallet</p>
			<div
				v-for="provider of providers"
				:key="provider.providerName"
				class=""
			>
				<component
					:is="tag(provider)"
					v-if="!($device.isMobile && provider.providerName === 'binance')"
					class="btn btn-provider d-flex align-items-center justify-content-center m-auto py-3 px-4 mb-4 bg-secondary-bg text-secondary rounded-pill"
					:href="!provider.isInstalled() && provider.installLink"
					:target="!provider.isInstalled() && '_blank'"
					@click="handleConnect(provider, popup.close)"
				>
					<component :is="provider.img" class="me-auto" width="24" height="24"/>
					<p class="mb-0 small fw-bold text-start me-auto">
						{{ provider.title }}
					</p>
				</component>
			</div>
		</div>
	</popups-wrapper>
</template>

<script>
import { mapActions } from "vuex";
import { PROVIDERS } from "@/constants/providers";

export default {
	name: "Unlock",
	data() {
		return {
			providers: PROVIDERS,
		};
	},

	methods: {
		...mapActions({
			login: "auth/login",
		}),
		tag(provider) {
			return provider.isInstalled() ? "button" : "a";
		},
		async handleConnect(provider, close) {
			if (!provider.isInstalled()) {
				if (this.$device.isAndroid) {
					window.location.replace(
						`intent://${location.host}#Intent;scheme=https;package=io.metamask;end`,
					);
				}
				if (this.$device.isIos) {
					window.location.replace(`https://metamask.app.link/dapp/${location.host}`);
				}
				return;
			}
			try {
				await this.$localForage.setItem("provider", provider.providerName);
				await this.$setWeb3Provider(provider.providerName);

				await this.login();
				close();
			} catch (err) {
				console.error(err);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.unlock {
	&-popup {
		padding: 24px 0 36px;
	}
}
.btn-provider {
	width: 320px;
	&:hover {
		border: 1px solid $primary;
		color: $body-color !important;
	}
}
</style>
