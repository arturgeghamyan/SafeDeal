<template>
	<span
		v-if="(newValue && isFinite(newValue)) || newValue > 1"
		class="d-inline-flex mb-0"
	>
		<i-count-up
			:start-val="oldValue"
			:end-val="format(newValue).number"
			:options="{
				decimalPlaces,
				separator: ' ',
				decimal: '.',
			}"
		/>
		<span v-if="newValue >= 1000000" class="ps-2">
			{{ format(newValue).prefix }}
		</span>
	</span>
	<span v-else>{{ isFinite(newValue) ? newValue : "∞" }}</span>
</template>

<script>
import BigNumber from "bignumber.js";

export default {
	props: {
		value: {
			type: [Number, BigNumber],
			default: () => null,
		},
		decimals: {
			type: Number,
			default: () => NaN,
		},
	},

	data() {
		return {
			oldValue: 0,
			newValue: this.value?.toNumber ? this.value.toNumber() : this.value || 0,
			defaultDecimalPlaces: 2,
		};
	},

	computed: {
		decimalPlaces() {
			if (!isNaN(this.decimals)) {
				return this.decimals;
			}
			const newValue = this.format(this.newValue).number
			const num = newValue.toString().split(".");
			const decimal =
				Math.floor(newValue) === newValue
					? 0
					: +newValue < 10
					? +newValue < 1 ? 7 : 5
					: this.defaultDecimalPlaces;

			return this.fixDecimal(num[1], decimal);
		},
	},

	watch: {
		value(to, from) {
			this.oldValue = from?.toNumber ? from.toNumber() : +from;
			this.newValue = to?.toNumber ? to.toNumber() : +to;
		},
	},

	methods: {
		fixDecimal(number, decimal) {
			return number?.length < decimal ? number.length : decimal;
		},
		format(n) {
			let i = 0;
			let res = +n;
			const prefixes = ["", "million", "billion", "trillion", "quadrillion"];
			if(res >= 1000_000) {
				res /= 1000_000;
				i++;
				while (res >= 1000 && prefixes[i + 1]) {
					res /= 1000;
					i++;
				}
			}
			return { number: res, prefix: prefixes[i] };
		},
	},
};
</script>
