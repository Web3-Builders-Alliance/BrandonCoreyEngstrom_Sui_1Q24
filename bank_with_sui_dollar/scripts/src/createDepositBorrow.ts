// to construct transactions import TransactionBlock
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keypair, PACKAGE } from './config.js';



const txb = new TransactionBlock();



//  PTB defined, you can directly execute it with a signer using signAndExecuteTransactionBlock
const result = await client.signAndExecuteTransactionBlock({
    signer: keypair, 
    transactionBlock: txb,
    options: {
        showEffects: true,
    },
    requestType: "WaitForLocalExecution"
});

// 1
// create bank::new_account
// public fun new_account(ctx: &mut TxContext): Account {
//     Account {
//       id: object::new(ctx),
//       user: tx_context::sender(ctx),
//       debt: 0,
//       deposit: 0
//     }
//   }


// 2
// DEPOSIT

// public fun deposit(self: &mut Bank, account: &mut Account, token: Coin<SUI>, ctx: &mut TxContext) {
//     let value = coin::value(&token);
//     let deposit_value = value - (((value as u128) * FEE / 100) as u64);
//     let admin_fee = value - deposit_value;

//     let admin_coin = coin::split(&mut token, admin_fee, ctx);
//     balance::join(&mut self.admin_balance, coin::into_balance(admin_coin));
//     balance::join(&mut self.balance, coin::into_balance(token));

//     account.deposit = account.deposit + deposit_value;
//   }  



// 3
// BORROW
// public fun borrow(account: &mut Account, cap: &mut CapWrapper, value: u64, ctx: &mut TxContext): Coin<SUI_DOLLAR> {
//     let max_borrow_amount = (((account.deposit as u128) * EXCHANGE_RATE / 100) as u64);

//     assert!(max_borrow_amount >= account.debt + value, EBorrowAmountIsTooHigh);

//     account.debt = account.debt + value;

//     sui_dollar::mint(cap, value, ctx)
//   }