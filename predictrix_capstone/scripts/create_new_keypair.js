import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import wallet from './dev-wallet.json' assert { type: 'json' };

import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';


// ###############################################
// ############CREATE NEW KEYPAIR#################
// ###############################################


// 1 RUN: sui client new-address ed25519
// 2 TAKE: mnemonic amd use it in the exampleMnemonic variable and run script
// 3 UNCOMMENT: the decodeSuiPrivateKey function 
// 4 TAKE: the encoded private key and use it in the secKey_one variable as a string and run script
// 5 TAKE: the raw bytes of the private key and use it a new json file with the structure of dev-wallet.json
// 6 ADD: the new json file to the gitignore file
// 6 IMPORT: and use the new json file in the wallet variable



// generate a keypair from mnemonic
const exampleMnemonic = '';
 
const keyPair_one = Ed25519Keypair.deriveKeypair(exampleMnemonic);

// logs the public key
console.log(`Public Key One: ${keyPair_one.getPublicKey().toSuiAddress()}`);

console.log(`Public Key One to raw bytes: ${keyPair_one.getPublicKey().toRawBytes()}`);




// logs the private key
const pk_one = keyPair_one.getSecretKey();

console.log(`Private Key One: ${pk_one}`);





// get pkey encoded from the secretKey function then decode it
// const secKey_one = '';

// const secKey  = decodeSuiPrivateKey(secKey_one);

// console.log(`Private Key One to raw bytes: ${secKey.secretKey}`);


console.log(`END OF SCRIPT`);


