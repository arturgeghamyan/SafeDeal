<template>
	<component :is="tag" :class="classes">
		<slot v-if="address" :address="address" />
		<slot v-else-if="$slots.connect" name="connect" />
		<button
			v-else
			class="btn btn-primary border-0 px-4 py-3 fs-4 fw-bold"
			:class="btnClass"
			@click="$nuxt.$emit('popups.unlock.open')"
		>
			Connect Wallet
		</button>
	</component>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	props: {
		classes: {
			type: [Array, String, Object],
			default: () => [],
		},
		btnClass: {
			type: String,
			default: null,
		},
		tag: {
			type: String,
			default: "div",
		},
	},
	computed: {
		...mapGetters({
			address: "auth/address",
		}),
	},
};
</script>