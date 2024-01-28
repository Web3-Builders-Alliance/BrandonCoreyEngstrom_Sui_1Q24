import { TransactionBlock } from "@mysten/sui.js/transactions";
import { client, keypair, PACKAGE } from "./config.js";

const { execSync } = require('child_process');


const { modules, dependencies } = JSON.parse(
    execSync(`${process.env.CLI_PATH!} move build --dump-bytecode-as-base64 --path ${process.env.PACKAGE_PATH!}`, {
		encoding: 'utf-8',
	}),
);

// PTB
const tx = new TransactionBlock;

let [account] = tx.moveCall({
    target: `${PACKAGE}::bank::new_account`,
    arguments: [],
});


tx.transferObjects( [account], keypair.getPublicKey().toSuiAddress() );

const result = await client.signAndExecuteTransactionBlock({
    signer: keypair,
    transactionBlock: tx,
    options: {
        showEffects: true,
    },
    requestType: "WaitForLocalExecution"
});

console.log("result: ", JSON.stringify(result, null, 2));