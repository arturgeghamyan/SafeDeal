<template>
	<transition name="modal">
		<div v-if="show" class="modal" :class="{ show }" @click.self="close">
			<div class="modal-dialog modal-dialog-centered m-auto" :class="modalWidth">
				<div class="modal-content border border-light-blue mx-auto">
					<div class="modal-header px-4 py-0 border-0">
						<h5 class="fs-4 fw-bolder mt-5 m-auto">{{ title }}</h5>
						<button type="button" class="btn close m-0 p-0 position-relative" @click="close"></button>
					</div>
					<div class="modal-body p-0">
						<slot :close="close" />
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import PopupsBase from "./_Base";

export default {
	extends: PopupsBase,
	props: {
		closable: {
			type: Boolean,
			default: true,
		},
		name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: null,
		},
		icon: {
			type: Boolean,
			default: false,
		},
		modalWidth: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
.close {
	width: 28px;
	height: 28px;
	border: 2px solid rgba($gray, 0.4);
	&::after, &::before {
		content: "";
		position: absolute;
		width: 14px;
		height: 2px;
		background: rgba($gray, 0.4);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	&::after {
		transform: rotate(45deg);
	}
	&::before {
		transform: rotate(-45deg);
	}
}
</style>
