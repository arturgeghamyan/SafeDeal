// import BigNumber from "bignumber.js";
// import { NFTS } from "~/constants/nfts";
// import { QUERY_LIMIT } from "~/constants/app";

// export const state = () => {
// 	return {
// 		tokenPrice: new BigNumber(0),
// 		lpTokenPrice: new BigNumber(0),
// 		caseOpeningPrice: new BigNumber(0),
// 		caseOpeningPriceForLp: new BigNumber(0),
// 		totalSupply: new BigNumber(0),
// 		totalBurned: new BigNumber(0),
// 		totalStaked: new BigNumber(0),
// 		totalVaultStaked: new BigNumber(0),
// 		totalLpStaked: new BigNumber(0),
// 		minStakingAmount: new BigNumber(0),
// 		totalStakedNFTs: Array(6).fill({ amount: 0 }),
// 		totalCaseOpened: 0,
// 		totalNftMinted: {},
// 		totalLockedValue: 0,
// 		blockPerDay: 28000,
// 		optionsOfNfts: NFTS,
// 	};
// };

// export const mutations = {
// 	SET_DATA(state, data) {
// 		for (const key in data) {
// 			state[key] = data[key];
// 		}
// 	},
// };

// export const actions = {
// 	async load({ commit, state }) {
// 		try {
// 			// total minted nft
// 			const queryMintedNft = new this.$Moralis.Query("MintedNft");
// 			queryMintedNft.limit(QUERY_LIMIT);

// 			// total opened cases
// 			const queryCaseOpened = new this.$Moralis.Query("CaseOpened");
// 			queryCaseOpened.limit(QUERY_LIMIT);

// 			// total burned
// 			const queryBurned = new this.$Moralis.Query("Burned");
// 			queryBurned.limit(QUERY_LIMIT);

// 			// total LP staked
// 			const queryStakedLp = new this.$Moralis.Query("BurnedLp");
// 			queryBurned.limit(QUERY_LIMIT);

// 			const { totalNftMinted, totalCaseOpened, totalBurned, totalLpStaked } = await Promise.all([
// 				queryMintedNft.find(),
// 				queryCaseOpened.find(),
// 				queryBurned.find(),
// 				queryStakedLp.find(),
// 			]).then((r) => {
// 				let totalNftMinted = {}
// 				r[0].forEach((item) => {
// 					item.attributes.values.forEach((value, index) => {
// 						totalNftMinted = {
// 							...totalNftMinted,
// 							[index]:
// 								(+totalNftMinted[index] || 0) + +value,
// 						};
// 					})
// 				})

// 				return {
// 					totalNftMinted,

// 					totalCaseOpened: r[1].reduce((total, item) => {
// 						total += +item.attributes.amount || 0;
// 						return total;
// 					}, 0),

// 					totalBurned: r[2].reduce(
// 						(total, item) =>
// 							total.plus(new BigNumber(item.attributes.value).div('1e18')),
// 						new BigNumber(0),
// 					),

// 					totalLpStaked: r[3].reduce(
// 						(total, item) =>
// 							total.plus(new BigNumber(item.attributes.amount).div('1e18')),
// 						new BigNumber(0),
// 					),
// 				};
// 			});

// 			commit("SET_DATA", {
// 				totalBurned,
// 				totalCaseOpened,
// 				totalNftMinted,
// 				totalLpStaked,
// 			});

// 			const stakes = Array(6).fill(this.$contracts.buniverseNFTStaking.options.address);
// 			this.$addWeb3Query(
// 				"STATS_LOAD_DATA",
// 				[
// 					this.$contracts.buniverse.methods.CASE_OPEN_PRICE(),
// 					this.$contracts.buniverse.methods.caseOpenPriceForLP(),
// 					this.$contracts.stakingBUNI.methods.manualTotalStakes(),
// 					this.$contracts.stakingBUNI.methods.stakeOfAuto(
// 						this.$contracts.stakingBUNI.options.address,
// 					),
// 					this.$contracts.buniverseNFT.methods.balanceOfBatch(stakes, [0, 1, 2, 3, 4, 5]),
// 					this.$contracts.tokens.BUNI.methods.totalSupply(),
// 					this.$contracts.buniverse.methods.lpToBUNI(),
// 					this.$contracts.tokens.BUNI.methods.balanceOf(this.$contracts.tokens.BUNI_BNB_LP.options.address),
// 					this.$contracts.tokens.WETH.methods.balanceOf(this.$contracts.tokens.BUNI_BNB_LP.options.address),
// 				],
// 				(r) => {
// 					let tokenPrice = new BigNumber(r[8]).div(new BigNumber(r[7]));
// 					if (!tokenPrice.toNumber()) {
// 						tokenPrice = new BigNumber(0);
// 					}
// 					commit("SET_DATA", {
// 						tokenPrice,
// 						caseOpeningPrice: new BigNumber(r[0]).div('1e18'),
// 						caseOpeningPriceForLp: new BigNumber(r[1]).div('1e18'),
// 						totalStaked: new BigNumber(r[2]).div('1e18'),
// 						totalVaultStaked: new BigNumber(r[3]).div('1e18'),
// 						totalStakedNFTs: r[4].map((item, index) => {
// 							return {
// 								id: index,
// 								amount: item,
// 							};
// 						}),
// 						totalSupply: new BigNumber(r[5]).div('1e18'),
// 						lpTokenPrice: new BigNumber(r[6]).times(tokenPrice),
// 					});
// 				},
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},
// };

// export const getters = {
// 	data: (state) => state,
// 	totalLockedValue: (state) =>
// 		state.totalStaked * state.tokenPrice +
// 		state.totalLpStaked * state.lpTokenPrice +
// 		state.totalStakedNFTs.reduce(
// 			(total, item, index) => total + item.amount * state.optionsOfNfts[index].price,
// 			0,
// 		),
// };
