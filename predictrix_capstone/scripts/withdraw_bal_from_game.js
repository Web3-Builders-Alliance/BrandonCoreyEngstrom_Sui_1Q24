import { getFullnodeUrl, SuiClient, SuiHTTPTransport  } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import walletDev from './dev-wallet.json' assert { type: 'json' };

import { WebSocket } from 'ws';

import { PACKAGE, GAME_ID, GAME_OWNER_CAP } from './config.js';


// UNDER DEVELOPMENT***********************
// ****************************************
// ########################################
// ############WITHDRAW GAME BALANCE#######
// ########################################




// generate a keypair
const privateKeyArray = walletDev.privateKey.split(',').map(num => parseInt(num, 10));
const privateKeyBytes = new Uint8Array(privateKeyArray);
const keypairdev = Ed25519Keypair.fromSecretKey(privateKeyBytes);




// client
const client = new SuiClient({
    transport: new SuiHTTPTransport({
        url: getFullnodeUrl('testnet'),
        WebSocketConstructor: WebSocket
    }),
});




(async () => {
    try {
     
        
        // create Transaction Block
        const txb = new TransactionBlock();




         // [TESTING]

        
        txb.setGasBudget(10000000);

        txb.moveCall({
            target: `${PACKAGE}::predictrix::withdraw_balance_from_game`,
            arguments: [txb.object(GAME_OWNER_CAP), txb.object(GAME_ID), txb.pure.u64(400000000)],
        });

        




        
        // finalize the transaction block
        let txid = await client.signAndExecuteTransactionBlock({
            signer: keypairdev,
            transactionBlock: txb,
        });
        


        // log the transaction result
        console.log(`Transaction result: ${JSON.stringify(txid, null, 2)}`);
        console.log(`success: https://suiexplorer.com/txblock/${txid.digest}?network=testnet`);



        console.log(`END OF SCRIPT`);

    } catch (e) {
        console.error(`error: ${e}`);
    }
})();




