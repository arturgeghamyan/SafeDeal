import Moralis from "moralis/dist/moralis.min.js";
import {
	MORALIS_APP_ID,
    MORALIS_SERVER_URL,
    MORALIS_APP_ID_TESTNET,
    MORALIS_SERVER_URL_TESTNET,
} from '@/constants/app';

export default (ctx, inject) => {
    let appId = MORALIS_APP_ID_TESTNET;
    let serverUrl = MORALIS_SERVER_URL_TESTNET;
	
    if(+ctx.env.app.defaultChainId === 56) {
        appId = MORALIS_APP_ID;
        serverUrl = MORALIS_SERVER_URL;
    }

    Moralis.start({ serverUrl, appId });
	inject("Moralis", Moralis);
};
