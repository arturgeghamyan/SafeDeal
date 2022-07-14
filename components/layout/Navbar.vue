<template>
	<header class="fixed-top">
		<nav class="navbar mx-auto py-4">
			<nuxt-link
				v-intersect="{ true: ['animate__fadeInLeft'], disposeWhen: true }"
				class="
					animate__animated
					navbar-brand
					text-body-color
					p-0 me-5
					d-flex
					align-items-center
				"
				to="/"
			>
				<div class="d-flex align-items-center fw-bolder ms-1">
					<Logo />
					<p class="m-0 fs-3">afeDeal</p>
				</div>
			</nuxt-link>

			<div
				v-intersect="{ true: ['animate__fadeInRight'], disposeWhen: true }"
				class="animate__animated animated d-flex align-items-center"
			>
				<web3-connection-placeholder>
					<p class="m-0 bg-secondary-bg text-primary px-4 py-3 fs-4 fw-bold rounded">{{buttonText}}</p>
				</web3-connection-placeholder>
			</div>
		</nav>
	</header>
</template>
<script>
import { mapGetters } from 'vuex';
import Logo from '@/assets/images/icons/logo.svg?inline'
export default {
	components: { Logo },
	computed: {
		...mapGetters({
			address: 'auth/address',
			isSupportedChain: "web3/isSupportedChain",
		}),
		buttonText() {
			return this.isSupportedChain
				? `${this.address.slice(0, 6)}...${this.address.slice(-4, this.address.length)}`
				: "WRONG NETWORK";
		},
	},
}
</script>

<style lang="scss" scoped>
.navbar {
	max-width: 1520px;
}
</style>