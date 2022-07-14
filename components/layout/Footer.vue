<template>
	<footer class="bg-light border-top border-light-blue p-4 mb-4 mb-md-0">
		<!-- <div
			v-intersect="{ true: ['animate__fadeInUp'], disposeWhen: true }"
			class="animate__animated footer"
		>
			<div>
				<nuxt-link
					class="navbar-brand text-body-color p-0 d-flex align-items-center"
					to="/"
				>
					<LogoIcon width="48" />
					<div class="fw-bolder ms-1">
						<p class="m-0 fs-3">BNB</p>
						<p class="m-0 small-2">Universe</p>
					</div>
				</nuxt-link>
				<p class="op-50 small fw-bold mt-3 pb-3">
					Best NFT yield farm ecosystem in BNB Smart Chain.
				</p>
			</div>
			<div class="d-flex justify-content-between flex-wrap">
				<div
					v-intersect="{ true: ['animate__fadeInUp'], disposeWhen: true }"
					class="animate__animated"
				>
					<p class="fw-bold">About</p>
					<p v-for="item in about" :key="item.title">
						<a
							:href="item.path"
							target="_blank"
							rel="noopener noreferrer"
							class="text-decoration-none text-body-color op-50 fw-bold"
						>
							{{ item.title }}
						</a>
					</p>
				</div>
				<div
					v-intersect="{ true: ['animate__fadeInUp'], disposeWhen: true }"
					class="animate__animated me-5 me-lg-0"
				>
					<p class="fw-bold">Recommendations</p>
					<p v-for="item in recommendations" :key="item.title">
						<a
							:href="item.path"
							class="text-decoration-none text-body-color op-50 fw-bold"
							rel="noopener noreferrer"
							target="_blank"
						>
							{{ item.title }}
						</a>
					</p>
				</div>
				<div
					v-intersect="{ true: ['animate__fadeInUp'], disposeWhen: true }"
					class="animate__animated w-100 w-md-auto pe-sm-3"
				>
					<p class="fw-bold mt-3 pt-3 mt-md-0 pt-md-0">Social</p>
					<a
						v-for="social in socials"
						:key="social.icon"
						:href="social.path"
						rel="noopener noreferrer"
						class="social-icon"
						target="_blank"
					>
						<img
							class="social-icon-img"
							:src="require(`@/assets/images/icons/socials/${social.icon}.svg`)"
							:alt="social.icon"
						/>
					</a>

					<div class="d-flex justify-content-between flex-wrap markets">
						<a v-for="item in info" :key="item.img" target="_blank">
							<img :src="require(`@/assets/images/logos/${item.img}.png`)" class="h-24" />
						</a>
					</div>
				</div>
			</div>
			<hr class="text-light-blue op-50 mt-lg-5" />
			<p class="small fw-bold op-50 mb-3 mb-md-0">© 2022 BNB Universe</p>
		</div>-->
	</footer> 
</template>

// <script>
// import LogoIcon from "@/assets/images/icons/logo.svg?inline";

// export default {
// 	components: { LogoIcon },
// 	data() {
// 		return {
// 			info: [],
// 			about: [],
// 			socials: [],
// 			recommendations: [],
// 		};
// 	},
// };
// </script>

// <style lang="scss" scoped>
// .footer {
// 	max-width: 881px;
// 	margin: auto;
// }

// .h-24 {
// 	height: 24px;
// }

// .social {
// 	&-icon {
// 		margin-right: 18px;

// 		&-img {
// 			width: 24px;
// 		}
// 	}
// }
// .markets {
// 	margin-top: 36px;
//     gap: 10px 24px;
// }
// </style>
