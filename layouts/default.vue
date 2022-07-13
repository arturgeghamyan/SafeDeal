<template>
	<div id="app" ref="app">
		<layout-navbar />
		<nuxt />
		<!-- <layout-footer /> -->
		<popups-unlock />
		<popups-transaction v-if="address" />
	</div>
</template>
<script>
import { mapGetters } from "vuex";
// import stats from "~/mixins/stats";
import login from "~/mixins/login";

export default {
	mixins: [login],
	// middleware: ['redirect'],
	computed: {
		...mapGetters({
			address: "auth/address",
		}),
	},
};
</script>