<template>
	<main>
		<app-switcher
			:tabs="[
				{ name: 'sender', title: 'sender' },
				{ name: 'reciver', title: 'reciver' },
			]"
		>
			<template #sender>
				<app-sender />
			</template>
			<template #reciver>
				<app-reciver />
			</template>
		</app-switcher>
	</main>
</template>

<script>
import user from '~/mixins/user'
export default {
	mixins: [ user ],
	mounted() {
		// this.$router.push('sender')
	},
};
</script>

<style lang="scss" scoped>
main {
	padding-top: 160px;
}
</style>
