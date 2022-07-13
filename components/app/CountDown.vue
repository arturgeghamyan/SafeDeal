<template>
	<div class="d-flex justify-content-between align-items-center">
		<p class="time-item">{{ days }} days : {{ hours }} h : {{ minutes }} m</p>
	</div>
</template>

<script>
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default {
	props: {
		initialTime: {
			type: Number,
			default: 0,
		},
		isDecreasable: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			time: this.initialTime,
			intervalId: 0,
		};
	},

	computed: {
		days() {
			return Math.floor(this.time / DAY);
		},
		hours() {
			let res = Math.floor(this.time / HOUR);
			res -= this.days * 24;
			return res;
		},
		minutes() {
			let res = Math.floor(this.time / 60) - this.hours * 60;
			res -= this.days * 24 * 60;
			return res;
		},
		seconds() {
			let res = this.time - this.minutes * 60 - this.hours * HOUR;
			res -= this.days * DAY;
			return res;
		},
	},

	watch: {
		initialTime(to) {
			this.time = to;
		},
		isDecreasable(to) {
			this.interval(to)
		},
	},

	mounted() {
		this.interval(this.isDecreasable);
	},

	methods: {
		interval(isDecreasable) {
			if (isDecreasable) {
				this.intervalId = setInterval(() => {
					this.time -= 60;
				}, 60000)
			} else {
				clearInterval(this.intervalId);
			}
		},
	},
};
</script>
