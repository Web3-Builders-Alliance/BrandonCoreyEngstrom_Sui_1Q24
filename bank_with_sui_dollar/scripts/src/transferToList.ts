import { TransactionBlock } from "@mysten/sui.js/transactions";
import { client, keypair, PACKAGE } from "./config.js";


// create and transfer accounts to a list of users



const { execSync } = require('child_process');


const { modules, dependencies } = JSON.parse(
    execSync(`${process.env.CLI_PATH!} move build --dump-bytecode-as-base64 --path ${process.env.PACKAGE_PATH!}`, {
		encoding: 'utf-8',
	}),
);

//

const users = [
    '0xUserAddress1',
    '0xUserAddress2',
    // ... 
];


// PTB
for (const userAddress of users) {
    const tx = new TransactionBlock();
    let [account] = tx.moveCall({
        target: `${PACKAGE}::bank::new_account`,
        arguments: [],
    });

    tx.transferObjects([account], userAddress);

    const result = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
        options: {
            showEffects: true,
        },
        requestType: "WaitForLocalExecution"
    });

    console.log(`Account creation result for user ${userAddress}: `, JSON.stringify(result, null, 2));
}
