import ADDRESSES from "@/contracts/addresses";
import { NETWORKS, getChainById } from "@/constants/networks";

export const state = () => {
	return {
		chainId: null,
		isLoading: true,
	};
};

export const mutations = {
	SET_LOADING(state, isLoading) {
		state.isLoading = isLoading;
	},
	SET_CHAIN_ID(state, chainId) {
		state.chainId = chainId;
	},
};

export const actions = {
	switchChain({ commit }, chainId) {
		const chain = getChainById(chainId);
		return new Promise((resolve, reject) => {
			const callback = (err, result) => {
				if (err) {
					reject(err.message);
				} else {
					resolve(result);
				}
			};
			if (chainId >= 56) {
				this.$ethereum().sendAsync(
					{
						id: 1,
						jsonrpc: "2.0",
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: `0x${chainId.toString(16)}`,
								chainName: chain.name,
								rpcUrls: [chain.url],
								nativeCurrency: chain.nativeCurrency,
								blockExplorerUrls: [chain.blockExplorerUrl],
							},
						],
					},
					callback,
				);
			} else {
				this.$ethereum().sendAsync(
					{
						id: 1,
						jsonrpc: "2.0",
						method: "wallet_switchEthereumChain",
						params: [{ chainId: `0x${chainId.toString(16)}` }],
					},
					callback,
				);
			}
		});
	},
};

export const getters = {
	chainId: ({ chainId }) => chainId,
	isLoading: ({ isLoading }) => isLoading,
	isSupportedChain: ({ chainId }) => {
		let res = true;
		const contracts = Object.values(ADDRESSES);
		for (const contract of contracts) {
			if (!contract[chainId]) {
				res = false;
				break;
			}
		}
		return res;
	},
	supportedNetworks() {
		return Object.values(NETWORKS).filter(({ chainId }) => {
			let isNetworkSupported = true;
			const contracts = Object.values(ADDRESSES);
			for (const contract of contracts) {
				if (!contract[chainId.toString()]) {
					isNetworkSupported = false;
					break;
				}
			}
			return isNetworkSupported;
		});
	},
};
