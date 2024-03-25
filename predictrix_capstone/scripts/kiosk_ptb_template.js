// imports
import { getFullnodeUrl, SuiClient, SuiHTTPTransport  } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import wallet from './dev-wallet.json' assert { type: 'json' };
import { KioskClient, Network, KioskTransaction } from '@mysten/kiosk';
import { WebSocket } from 'ws';



// generate a keypair
const privateKeyArray = wallet.privateKey.split(',').map(num => parseInt(num, 10));
const privateKeyBytes = new Uint8Array(privateKeyArray);
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);


console.log(`Public Key raw bytes: ${keypair.getPublicKey().toRawBytes()}`);

console.log(`Public Key: ${keypair.getPublicKey().toSuiAddress()}`);


const itemType = '';


// client
const client = new SuiClient({
    transport: new SuiHTTPTransport({
        url: getFullnodeUrl('testnet'),
        WebSocketConstructor: WebSocket
    }),
});


// kiosk client
const kioskClient = new KioskClient({
    client, 
    network: Network.TESTNET,
});



const getCap = async () => {
    let { kioskOwnerCaps } = await kioskClient.getOwnedKiosks(keypair.getPublicKey().toRawBytes());
    // Assume that the user has only 1 kiosk.
    // Here, you need to do some more checks in a realistic scenario.
    // And possibly give the user in our dApp a kiosk selector to choose which one they want to interact with (if they own more than one).
    return kioskOwnerCaps[0];
}




(async () => {
    try {
     
        
        // create Transaction Block
        const txb = new TransactionBlock();
        


        // create Kiosk TxBlock
        const kioskTx = new KioskTransaction({ kioskClient, transactionBlock: txb, cap: await getCap() });



        // create a new kiosk
        kioskTx.create();

        


        

       





        
    
        // place a prediction in the kiosk (works)
        const prediction_id = kioskTx.place({
            item: txb.object(prediction),
            itemType: itemType,
        });




    


        // take the prediction from the kiosk
        kioskTx.take({
            itemType: prediction,
            itemId: prediction_id,
        });





        kioskTx.shareAndTransferCap(keypair.getPublicKey().toRawBytes());

        // finalize the kiosk transaction
        kioskTx.finalize();
        
        



        
        // finalize the transaction block
        let txid = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: txb,
        });
        


        // log the transaction result
        console.log(`Transaction result: ${JSON.stringify(txid, null, 2)}`);
        console.log(`success: https://suiexplorer.com/txblock/${txid.digest}?network=testnet`);



    } catch (e) {
        console.error(`error: ${e}`);
    }
})();
