<template>
	<transition name="modal">
		<div v-if="show" class="modal" :class="{ show }" >
			<div class="modal-dialog modal-dialog-centered m-auto">
				<div class="modal-content border border-light-blue mx-auto">
					<div class="modal-header border-bottom border-light-blue bg-light shadow-light-blue">
						<h5 class="modal-title fs-4 fw-bolder text-capitalize">{{ title }}</h5>
						<button type="button" class="btn-close m-0 text-body-color" @click="close" />
					</div>
					<div class="modal-body p-4">
						<div class="text-center">
							<p class="mb-0 op-80 fw-bold">{{ text }}</p>
							<div  class="position-relative mb-34">
								<div 
									:class="{ 'border-right-pink': error || isConfirmed, 'load': !error || !isConfirmed  }"
								 	class="loading-circle mb-4 mt-5 rounded-circle" 
								 />		
								<PopupInfo  v-if="error" class="position-absolute spinner-svg" />
								<PopupConfirmed v-else-if="isConfirmed" class="position-absolute spinner-svg" />
								<PopupSpinner v-else class="spinner-svg rotate position-absolute"/>
							</div>
							<div v-if="isConfirmed">
								<a
									:href="explorerLink"
									target="_blank"
									class="text-decoration-none text-primary fw-bolder small"
								>
									<span>View at BSCScan</span>
									<img src="@/assets/images/icons/arrow.svg" alt="arrow" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
import PopupsBase from "./_Base";
import { EXPLORER } from "@/constants/app";
import PopupInfo from "~/assets/images/popup-info.svg?inline";
import PopupSpinner from "~/assets/images/icons/logo.svg?inline";
import PopupConfirmed from "~/assets/images/popup-confirmed.svg?inline";

export default {
	components: {
		PopupInfo,
		PopupSpinner,
		PopupConfirmed,
	},
	extends: PopupsBase,
	data() {
		return {
			name: "transaction",
			txhash: null,
			error: null,
			explorerLink: `${EXPLORER}/token/${this.$contracts.tokens.BUNI.options.address}`,
		};
	},

	computed: {
		...mapGetters({
			transactions: "web3/transactions/all",
		}),

		isConfirmed() {
			return this.txhash && this.transactions[this.txhash]?.status === "CONFIRMED";
		},

		isPending() {
			return this.txhash && this.transactions[this.txhash]?.status === "PENDING";
		},

		text() {
			if (this.error) {
				return "Transaction cancelled or failed, please try again";
			}
			return this.isConfirmed
				? "Transaction successfully confirmed"
				: this.txhash
					? "Waiting for transaction to confirm"
					: "Please confirm popped-up transaction";
		},
		title() {
			if (this.error) {
				return "Transaction Failed";
			}

			return this.isConfirmed
				? "Transaction Confirmed"
				: this.txhash
					? "Please Wait"
					: "Confirm Transaction";
		},
	},
	watch: {
		transactions(to, from) {
			const tos = Object.keys(to);
			const froms = Object.keys(from);
			const newTxHash = tos.filter((x) => !froms.includes(x))[0];
			if (newTxHash) {
				this.explorerLink += newTxHash;
				this.txhash = newTxHash;
				this.show = true;
			}
		},

		isConfirmed(to) {
			if (to) {
				this.show = true;
                const transactionTimer = setTimeout(() => {
                    this.close()
                    clearTimeout(transactionTimer)
                }, 2000)
			}
		},

		isPending(to) {
			to && (this.show = true);
		},
	},

	mounted() {
		this.registerEvent("error", (e) => {
			this.error = e;
			this.show = true;
		});
	},

	methods: {
		close() {
			if (this.isConfirmed) {
				this.txhash = null;
				this.explorerLink = `${EXPLORER}/tx/`;
			}
			this.error = null;
			this.show = false;
		},
	},
};
</script>

<style scoped lang="scss">
.modal {
	&-header {
		padding: 19px 24px;
	}
	&-title {
		line-height: 20px;
	}
}

.btn {
	&-close {
		width: 14px;
		height: 14px;
	}
}

.mb-34 {
	margin-bottom: 34px;
}

.spinner-svg {
	top: 0;
    left: 0;
    right: 0;
    bottom: 0;
	width: 36px;
	height: 36px;
    margin: auto;
}
.loading {
	&-circle {
		width: 70px;
		height: 70px;
		margin: auto;
		border: 6px solid #572495;
		border-right-color: #2b2e3580;
	}
}

.border-right-pink {
	border-right-color: #572495;
}

.load {
	animation: load 2s infinite linear;
}

.rotate {
	animation: loadInverse 2s infinite linear;	
}

@keyframes load {
	0% {
		transform: rotate(45deg);
	}
	100% {
		transform: rotate(405deg);
	}
}

@keyframes loadInverse {
    from { 
		transform: rotate(0deg) translateX(30px) rotate(0deg); 
	}
    to { 
		transform: rotate(360deg) translateX(30px) rotate(-360deg);
	}
}
</style>
