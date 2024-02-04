// imports
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import wallet from "./dev-wallet.json"; 

// generate a keypair
const privateKeyArray = wallet.privateKey.split(',').map(num => parseInt(num, 10));
const privateKeyBytes = new Uint8Array(privateKeyArray);
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

// client
const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
});

// package object id for bank, lending, and oracle
const packageObjectId = '0x40bff03fc40cfda9659f37f0d1902154e5822352c5b9c84dcfe02151cc71ba15';

// tx block
(async () => {
    try {
        // Assume you have the necessary objects for repay, withdraw, and destroy
        // const accountRef = /* Account reference */;
        // const capWrapperRef = /* CapWrapper reference */;
        // const coinToRepay = /* Coin<SUI_DOLLAR> object for repay */;
        // const withdrawAmount = 500; // example amount to withdraw
        // const priceObject = /* Price object from oracle */;

        // create Transaction Block
        const txb = new TransactionBlock();

        // Repay funds using the lending contract
        txb.moveCall({
            target: `${packageObjectId}::lending::repay`,
            // arguments: [accountRef, capWrapperRef, coinToRepay],
            typeArguments: [] 
        });

        // Withdraw funds from the account using the bank contract
        // txb.moveCall({
        //     target: `${packageObjectId}::bank::withdraw`,
        //     arguments: [, accountRef, withdrawAmount.toString(), ],
        //     typeArguments: [] 
        // });

        // Destroy the price object using the oracle contract
        // txb.moveCall({
        //     target: `${packageObjectId}::oracle::destroy`,
        //     arguments: [priceObject],
        //     typeArguments: [] 
        // });

        // finalize
        let txid = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: txb,
        });

        console.log(`Transaction result: ${JSON.stringify(txid, null, 2)}`);
        console.log(`success: https://suiexplorer.com/txblock/${txid.digest}?network=testnet`);

    } catch (e) {
        console.error(`error: ${e}`);
    }
})();
