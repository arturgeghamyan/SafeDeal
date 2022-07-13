import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import BigNumber from "bignumber.js";

import CONTRACTS from "@/contracts/addresses";
import { getChainById } from "@/constants/networks";

import ERC20_ABI from "@/contracts/abis/ERC20";

export default (ctx, inject) => {
	let provider;
	let chainID = ctx.env.app.defaultChainId;
	const web3obj = new Web3(getChainById(chainID).url);
	const readWeb3Provider = new Web3.providers.HttpProvider(getChainById(chainID).url);

	const readWeb3obj = new Web3(readWeb3Provider);

	const $contracts = {
		tokens: {},
		strategies: [],
	};

	const $multicall = (data) => {
		if (!data.length) {
			return Promise.resolve([]);
		}
		const args = data[0].target
			? data
			: data.map((d) => {
				return {
					target: d._parent._address,
					callData: d.encodeABI(),
				};
			});
		return $contracts.multicall.methods
			.aggregate(args)
			.call()
			.then(({ returnData }) =>
				returnData.map((d, i) => {
					const types = data[i].outputs || data[i]._method.outputs;
					const r = web3obj.eth.abi.decodeParameters(
						types.map(({ type }) => type),
						d,
					);
					if (types.length === 1) {
						return r[0];
					}
					if (types[0].name === "blockNumber") {
						const outputs = data[i].secondaryOutputs;
						return r[1].map((rr, i) => {
							const decoded = web3obj.eth.abi.decodeParameters(
								outputs[i].map(({ type }) => type),
								rr,
							);
							if (outputs[i].length === 1) {
								return decoded[0];
							}
							const resultObject = {};
							outputs[i].forEach(({ name }, index) => {
								resultObject[name] = decoded[index];
							});
							return resultObject;
						});
					}
					const resultObject = {};
					types.forEach(({ name }, index) => {
						resultObject[name] = r[index];
					});
					return resultObject;
				}),
			);
	};

	const setChainId = (id) => {
		if (chainID !== id) {
			ctx.app.store.commit("web3/SET_LOADING", true);
		}
		chainID = id;
		readWeb3obj.setProvider(new Web3.providers.HttpProvider(getChainById(chainID).url));
		try {
			Object.keys(CONTRACTS).forEach((contractName) => {
				const contractAddress = CONTRACTS[contractName][id];
				if (contractName.toUpperCase().includes("TOKEN")) {
					$contracts.tokens[contractName.toUpperCase().replace("TOKEN", "")]._address =
						contractAddress;
				} else {
					$contracts[contractName[0].toLowerCase() + contractName.slice(1)]._address =
						contractAddress;
				}
			});
		} catch (e) {
			console.error(e);
		} finally {
			ctx.app.store.commit("web3/SET_CHAIN_ID", chainID);
			ctx.app.store.commit("web3/SET_LOADING", false);
		}
	};

	Object.keys(CONTRACTS).forEach((contractName) => {
		let ABI;
		const contractNameUppercase = `${contractName[0].toUpperCase()}${contractName.slice(
			1,
		)}`;
		if (contractName.toUpperCase().includes("TOKEN")) {
			try {
				ABI = require(`@/contracts/abis/${contractNameUppercase}.json`);
			} catch (e) {
				ABI = ERC20_ABI;
			}
			$contracts.tokens[contractName.toUpperCase().replace("TOKEN", "")] =
				new web3obj.eth.Contract(ABI);
		} else {
			ABI = require(`@/contracts/abis/${contractNameUppercase}.json`);
			if (["Multicall"].includes(contractNameUppercase)) {
				$contracts[contractName[0].toLocaleLowerCase() + contractName.slice(1)] =
					new readWeb3obj.eth.Contract(ABI);
			} else {
				$contracts[contractName[0].toLocaleLowerCase() + contractName.slice(1)] =
					new web3obj.eth.Contract(ABI);
			}
		}
	});

	setChainId(chainID);

	const interval = setInterval(async () => {
		try {
			provider = await detectEthereumProvider(1000);
			if (provider) {
				web3obj.setProvider(provider);
				clearInterval(interval);
			}
		} catch (e) {
			// console.error(e);
		}
	}, 1500);

	const web3 = () => {
		return web3obj;
	};
	const readWeb3 = () => {
		return readWeb3obj;
	};

	const ethereum = () => {
		return provider;
	};

	const setWeb3Provider = async (p) => {
		let providerObject;
		switch (p) {
			case "injected":
				providerObject = window.ethereum;
				break;
			case "walletlink": {
				const walletLink = new WalletLink({
					darkMode: false,
					// appLogoUrl: "https://example.com/logo.png",
					// darkMode: "false"
				});
				providerObject = walletLink.makeWeb3Provider(
					`https://mainnet.infura.io/v3/${ctx.env.app.infuraKey}`,
					1,
				);
				break;
			}
			case "walletconnect":
				providerObject = new WalletConnectProvider({
					chainId: 56,
					network: "binance",
					rpc: {
						56: getChainById(chainID).url,
					},
				});
				break;
			case "binance": {
				providerObject = window.BinanceChain;
				break;
			}
		}
		await providerObject.enable();
		web3obj.setProvider(providerObject);
		provider = providerObject;
		setChainId(await web3obj.eth.getChainId());
		provider.on("chainChanged", (id) => {
			setChainId(parseInt(id));
		});
	};

	const $chainId = () => {
		return chainID;
	};

	const $bigNumber = (n) => {
		return new BigNumber(n);
	};

	const $addWeb3Query = (id, query, callback) => {
		return ctx.app.store.commit("web3/transactions/ADD_QUERY", {
			chainId: ctx.app.store.$chainId(),
			id,
			query,
			callback,
		});
	};

	const $sendWeb3Transaction = (callback, value = 0) => {
		return ctx.app.store.dispatch("web3/transactions/send", {
			value,
			callback,
		});
	};

	const $addContract = (name, address, path = null) => {
		const ABI = require(`@/contracts/abis/${name}.json`);
		const contract = new web3obj.eth.Contract(ABI, address);
		if (!path) {
			$contracts[name] = contract;
		} else {
			let link = $contracts;
			while (path.length > 0) {
				const p = path.shift();
				if (path.length > 0) {
					if (!link[p]) {
						link[p] = {};
					}
					link = link[p];
				} else {
					link[p] = contract;
				}
			}
		}
	};

	ctx.$web3 = web3;
	ctx.$readWeb3 = readWeb3;
	ctx.$ethereum = ethereum;
	ctx.$setWeb3Provider = setWeb3Provider;
	ctx.$chainId = $chainId;
	ctx.$contracts = $contracts;
	ctx.$multicall = $multicall;
	ctx.$bigNumber = $bigNumber;
	ctx.$addWeb3Query = $addWeb3Query;
	ctx.$sendWeb3Transaction = $sendWeb3Transaction;
	ctx.$addContract = $addContract;

	inject("contracts", $contracts);
	inject("multicall", $multicall);
	inject("bigNumber", $bigNumber);
	inject("addWeb3Query", $addWeb3Query);
	inject("sendWeb3Transaction", $sendWeb3Transaction);
	inject("addContract", $addContract);
	inject("web3", web3);
	inject("readWeb3", readWeb3);
	inject("ethereum", ethereum);
	inject("setWeb3Provider", setWeb3Provider);
	inject("chainId", $chainId);
};
