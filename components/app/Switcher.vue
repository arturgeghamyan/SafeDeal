<template>
	<div>
		<div class="container">
			<ul
				class="nav nav-pills justify-content-lg-center m-auto rounded  bg-white"
			>
				<li v-for="tab in tabs" :key="tab.name" class="nav-item p-1">
					<component
						:is="tab.disabled ? 'span' : 'nuxt-link'"
						class="
							nav-link
							text-secondary
							py-3 px-5 fs-4 fw-bold
						"
						href="javascript:void(0)"
						:to="`/${$route.path.split('/')[1]}/${tab.name}`"
						aria-current="page"
					>
						{{ tab.title }}
					</component>
				</li>
			</ul>
		</div>
		<div v-for="tab in tabs" :key="tab.name"  class="mt-5">
			<slot v-if="tab.name === $route.params.tab" :name="tab.name"/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tabs: {
			type: Array,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.nav {
	width: max-content;
}
.nuxt-link-active {
	color: $primary !important;
	background: $secondary-bg;
	opacity: 1 !important;
}
</style>
