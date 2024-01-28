import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import dotenv from "dotenv";

dotenv.config();

export const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from(process.env.KEY!)).slice(1));

export const client = new SuiClient( { url: getFullnodeUrl('testnet') } );

// ------

export const PACKAGE = ""
export const BANK = ""
export const ACCOUNT = ""