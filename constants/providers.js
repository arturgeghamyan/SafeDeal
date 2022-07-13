import metamask from "@/assets/images/icons/providers/metamask.svg?inline";
import wallet from "@/assets/images/icons/providers/wallet.svg?inline";
import binance from "@/assets/images/icons/providers/binance.svg?inline";

export const PROVIDERS = [
	{
		img: metamask,
		alt: "MetaMask",
		title: "MetaMask",
		providerName: "injected",
		indetifier: "isMetaMask",
		installLink: "https://metamask.io",
		isInstalled: () => !!window.ethereum,
	},
	{
		img: wallet,
		alt: "Wallet Connect",
		title: "WalletConnect",
		providerName: "walletconnect",
		supportedChains: [1],
		isInstalled: () => true,
	},
	{
		img: binance,
		title: "Binance Wallet",
		providerName: "binance",
		supportedChains: [56, 97],
		installLink: "https://docs.binance.org/smart-chain/wallet/binance.html",
		isInstalled: () => !!window.BinanceChain,
	},
];
