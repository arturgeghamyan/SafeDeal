// import BigNumber from "bignumber.js";
// import { DEFAULT_REFERRER, QUERY_LIMIT } from "@/constants/app";

// export const state = () => {
// 	return {
// 		stakedTokens: new BigNumber(0),
// 		lpStakedTokens: new BigNumber(0),
// 		autoStakedTokens: new BigNumber(0),
// 		stakedNFTs: [],
// 		pendingReward: new BigNumber(0),
// 		pendingRewardLp: new BigNumber(0),
// 		pendingRewardNft: new BigNumber(0),
// 		totalEarned: new BigNumber(0),
// 		claimedTokens: new BigNumber(0),
// 		hasOpenedCases: false,
// 		lockPeriod: 0,
// 		usersInvited: 0,
// 	};
// };

// export const mutations = {
// 	SET_DATA(state, data) {
// 		for (const key in data) {
// 			state[key] = data[key];
// 		}
// 	},
// 	RESET(state) {
// 		state.stakedTokens = new BigNumber(0);
// 		state.lpStakedTokens = new BigNumber(0);
// 		state.autoStakedTokens = new BigNumber(0);
// 		state.stakedNFTs = [];
// 		state.pendingReward = new BigNumber(0);
// 		state.pendingRewardLp = new BigNumber(0);
// 		state.pendingRewardNft = new BigNumber(0);
// 		state.totalEarned = new BigNumber(0);
// 		state.claimedTokens = new BigNumber(0);
// 		state.hasOpenedCases = false;
// 		state.lockPeriod = 0;
// 		state.usersInvited = 0;
// 	},
// };

// export const actions = {
// 	async loadLpStakedTokens({ commit, rootState, rootGetters }) {
// 		try {
// 			const { address } = rootState.auth;
// 			// user LP staked
// 			const queryStakedLp = new this.$Moralis.Query("BurnedLp");
// 			queryStakedLp.limit(QUERY_LIMIT);
// 			queryStakedLp.equalTo("user", address.toLowerCase());

// 			await queryStakedLp.find().then((r) => {
// 				const lpStakedTokens = r[0] ? new BigNumber(r[0].attributes.amount.toString()).div('1e18') : 0;
// 				commit("SET_DATA", { lpStakedTokens });
// 			})
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	async load({ commit, state, rootState, rootGetters, dispatch }) {
// 		try {
// 			let { address } = rootState.auth;
// 			address = address.toLowerCase();

// 			// ClaimedOfBuni
// 			const queryClaimedOfBuni = new this.$Moralis.Query("ClaimedOfBuni");
// 			queryClaimedOfBuni.limit(QUERY_LIMIT);
// 			queryClaimedOfBuni.equalTo("user", address);

// 			// ClaimedOfLp
// 			const queryClaimedOfLp = new this.$Moralis.Query("ClaimedOfLp");
// 			queryClaimedOfLp.limit(QUERY_LIMIT);
// 			queryClaimedOfLp.equalTo("user", address);

// 			// ClaimedOfNft
// 			const queryClaimedOfNft = new this.$Moralis.Query("ClaimedOfNft");
// 			queryClaimedOfNft.limit(QUERY_LIMIT);
// 			queryClaimedOfNft.equalTo("user", address);

// 			// usersInvited
// 			const queryReferrer = new this.$Moralis.Query("CaseOpened");
// 			queryReferrer.limit(QUERY_LIMIT);
// 			queryReferrer.equalTo("referrer", address);

// 			// has user opened cases
// 			const queryCaseOpened = new this.$Moralis.Query("CaseOpened");
// 			queryCaseOpened.limit(QUERY_LIMIT);
// 			queryCaseOpened.equalTo("caseOpener", address);

// 			const {
// 				claimedOfBunis,
// 				claimedOfLps,
// 				claimedOfNfts,
// 				usersInvited,
// 				hasOpenedCases,
// 			} = await Promise.all([
// 				queryClaimedOfBuni.find(),
// 				queryClaimedOfLp.find(),
// 				queryClaimedOfNft.find(),
// 				queryReferrer.find(),
// 				queryCaseOpened.find(),
// 			]).then((r) => {
// 				return {
// 					claimedOfBunis: r[0].reduce(
// 						(total, item) =>
// 							total.plus(new BigNumber(item.attributes.amount)),
// 						new BigNumber(0),
// 					),
// 					claimedOfLps: r[1].reduce(
// 						(total, item) =>
// 							total.plus(new BigNumber(item.attributes.amount)),
// 						new BigNumber(0),
// 					),
// 					claimedOfNfts: r[2].reduce(
// 						(total, item) =>
// 							total.plus(new BigNumber(item.attributes.amount)),
// 						new BigNumber(0),
// 					),
// 					usersInvited: r[3].length,
// 					hasOpenedCases: !!r[4][0],
// 				};
// 			});

// 			const claimedTokens =
// 				(claimedOfBunis.plus(claimedOfLps).plus(claimedOfNfts)).div('1e18')
// 				;

// 			const currentBlock = await this.$web3().eth.getBlockNumber();
// 			state.lpStakedTokens === 0 && dispatch("loadLpStakedTokens");
// 			await this.$addWeb3Query(
// 				"USER_LOAD_DATA",
// 				[
// 					this.$contracts.stakingBUNI.methods.manualStakes(address),
// 					this.$contracts.stakingBUNI.methods.stakeOfAuto(address),
// 					this.$contracts.stakingBUNI.methods.pendingReward(address),
// 					this.$contracts.stakingLP.methods.pendingReward(address),
// 					this.$contracts.stakingBUNI.methods.autoStakes(address),
// 				],
// 				(r) => {
// 					commit("SET_DATA", {
// 						stakedTokens: new BigNumber(r[0].amount).div('1e18'),
// 						autoStakedTokens: new BigNumber(r[1]).div('1e18'),
// 						pendingReward: new BigNumber(r[2]).div('1e18'),
// 						pendingRewardLp: new BigNumber(r[3]).div('1e18'),
// 						lockPeriod: Math.floor(
// 							(3 * rootState.stats.blockPerDay - +currentBlock + +r[4].checkpoint) * 86400 /
// 							rootState.stats.blockPerDay,
// 						),
// 					});
// 				},
// 			);

// 			// stakedNFTs
// 			const stakes = Array(6)
// 				.fill()
// 				.map((a, i) => {
// 					return this.$contracts.buniverseNFTStaking.methods.userStakes(address, i);
// 				});

// 			this.$addWeb3Query(
// 				"USER_LOAD_STAKED_NFTS",
// 				stakes,
// 				(r) => {
// 					const stakedNFTs = r.map((item, index) => {
// 						return {
// 							id: index,
// 							amount: item.amount,
// 						};
// 					})
// 					commit("SET_DATA", { stakedNFTs })
// 				},
// 			);

// 			// pendingRewardForNFT
// 			const pendingRewardForNFT = Array(6)
// 				.fill()
// 				.map((a, i) => {
// 					return this.$contracts.buniverseNFTStaking.methods.pendingReward(address, i);
// 				});

// 			this.$addWeb3Query(
// 				"USER_LOAD_PENDING_REWARD_FOR_NFTS",
// 				pendingRewardForNFT,
// 				(r) => {
// 					const pendingRewardNft = r.reduce(
// 						(total, item) => total.plus(new BigNumber(item).div('1e18')),
// 						new BigNumber(0),
// 					)
// 					commit("SET_DATA", { pendingRewardNft })
// 				},
// 			);
// 			commit("SET_DATA", {
// 				claimedTokens,
// 				hasOpenedCases,
// 				usersInvited,
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	claim({ dispatch }, contract) {
// 		try {
// 			const selectedContract = contract === "lp" ? "stakingLP" : "stakingBUNI";
// 			return this.$sendWeb3Transaction(
// 				contract === "nft"
// 					? this.$contracts.buniverseNFTStaking.methods.claimAll()
// 					: this.$contracts[selectedContract].methods.claimReward(),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	claimAndStake() {
// 		try {
// 			return this.$sendWeb3Transaction(
// 				this.$contracts.stakingBUNI.methods.claimAndStake(),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	stake({ dispatch }, { amount, isAutoCompound, contract }) {
// 		try {
// 			return this.$sendWeb3Transaction(
// 				contract === "lp"
// 					? this.$contracts.stakingLP.methods.stake(this.$web3().utils.toWei(amount.toString()))
// 					: this.$contracts.stakingBUNI.methods.stake(
// 						isAutoCompound,
// 						this.$web3().utils.toWei(amount.toString()),
// 					),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	unstake({ dispatch }, { amount, isAutoCompound }) {
// 		try {
// 			return this.$sendWeb3Transaction(
// 				this.$contracts.stakingBUNI.methods.unstake(
// 					isAutoCompound,
// 					this.$web3().utils.toWei(amount.toString()),
// 				),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	stakeNFT({ dispatch }, { id, quantity }) {
// 		try {
// 			return this.$sendWeb3Transaction(
// 				this.$contracts.buniverseNFTStaking.methods.stake(id, quantity),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	unstakeNFT({ dispatch }, { id, quantity }) {
// 		try {
// 			return this.$sendWeb3Transaction(
// 				this.$contracts.buniverseNFTStaking.methods.unstake(id, quantity),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	async openCase({ dispatch, state }, quantity) {
// 		try {
// 			const { hasOpenedCases } = state;
// 			let referrer;
// 			if (!hasOpenedCases) {
// 				const ref = await this.$localForage.getItem("referrer");
// 				referrer = ref || DEFAULT_REFERRER;
// 			}
// 			return this.$sendWeb3Transaction(
// 				!hasOpenedCases
// 					? this.$contracts.buniverse.methods.openCase(referrer, quantity)
// 					: this.$contracts.buniverse.methods.openCase(quantity),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},

// 	openCaseWithLp({ dispatch }, quantity) {
// 		try {
// 			return this.$sendWeb3Transaction(
// 				this.$contracts.buniverse.methods.openCaseWithLP(quantity),
// 			);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},
// };

// export const getters = {
// 	data: (state) => state,
// 	stakedNFTs: ({ stakedNFTs }) => stakedNFTs.filter((item) => item.amount > 0),
// 	totalEarned: ({ pendingReward, pendingRewardLp, pendingRewardNft, claimedTokens }) =>
// 		pendingReward.plus(pendingRewardLp).plus(pendingRewardNft).plus(claimedTokens),
// };
