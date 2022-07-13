import pkg from "./package";
require("dotenv").config();

export default {
	ssr: false,
	target: "static",
	components: true,
	/*
	 ** Headers of the page
	 */
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	head: {
		title: process.env.APP_NAME,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.APP_DESC || pkg.description,
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description,
			},
			{
				property: 'og:title',
				content: process.env.OG_TITLE || process.env.APP_NAME || pkg.name,
			},
			{
				property: 'og:description',
				content: process.env.APP_OG_DESC || process.env.APP_DESC || pkg.description,
			},
			{
				property: 'og:image',
				content: `${process.env.APP_URL}og-image.jpg?v=${pkg.version}`,
			},
			{
				property: 'og:type',
				content: 'website',
			},
		],

		script: [],

		link: [
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap",
			},
		],
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: false,
	/*
	 ** Global CSS
	 */
	css: ["@/assets/scss/app.scss"],
	styleResources: {
		scss: [
			"@/node_modules/bootstrap/scss/_functions.scss",
			"@/node_modules/bootstrap/scss/_mixins.scss",
			"@/assets/scss/_variables.scss",
		],
	},
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		"~/plugins/web3",
		// "~plugins/moralis.js",
		"~/plugins/vue-countup",
		"~/plugins/vueintersect",
		"~/plugins/vClickOutside",
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		"@nuxtjs/eslint-module",
		// "@nuxtjs/stylelint-module",
		"@nuxtjs/svg",
		"@nuxtjs/style-resources",
		"@nuxtjs/localforage",
		"@nuxtjs/axios",
		"@nuxtjs/dotenv",
		"@nuxtjs/device",
		// "nuxt-purgecss",
	],
	purgeCSS: {
		whitelist: () => ["html", "body", "#__nuxt", "#__layout"],
		whitelistPatterns: () => [/navbar/, /alert/, /bg/, /dropdown/],
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"@nuxtjs/axios",
		["vue-scrollto/nuxt", { duration: 700 }],
		'nuxt-rfg-icon',
		'@nuxtjs/manifest',
	],

	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** Build configuration
	 */
	build: {
		extractCSS: true,
	},
	env: {
		contracts: {
			weth: process.env.CONTRACT_ADDRESS_WETH,
		},
		app: {
			infuraKey: process.env.INFURA_API_KEY,
			name: process.env.APP_TITLE || pkg.name,
			defaultChainId: process.env.DEFAULT_CHAIN_ID || 97,
		},
	},
	generate: {
		fallback: true,
	},
};
