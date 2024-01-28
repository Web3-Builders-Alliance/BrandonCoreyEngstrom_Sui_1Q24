module sui_bank::bank {

    use sui::sui::SUI;
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self, TxContext};



    // use sui_bank::sui_dollar::{Self, CapWrapper, SUI_DOLLAR};

    struct Bank has key {
        id: UID, 
        balance: Balance<SUI>,
        admin_balance: Balance<SUI>,
    }


    struct Account has key, store {

        id: UID, 
        user: address,
        debt: u64,
        deposit: u64,

    }


    struct OwnerCap has key, store {
        id: UID,
    }




    const ENotEnoughBalance: u64 = 0;
    const EBorrowIsTooHigh: u64 = 1;
    const EAccountMustBeEmpty: u64 = 2;
    const EPayYourLoan: u64 = 3;


    const FEE: u128 = 5;
    const EXCHANGE_RATE: u128 = 40;




    fun init(ctx: &mut TxContext) {

        transfer::share_object (
            Bank {
                id: object::new(ctx),
                balance: balance::zero(),
                admin_balance: balance::zero(),
            }
        );

        transfer::transfer(OwnerCap { id: object::new(ctx)}, tx_context::sender(ctx));

    }



    public fun new_account(ctx: &mut TxContext): Account {
        Account {
        id: object::new(ctx),
        user: tx_context::sender(ctx),
        debt: 0,
        deposit: 0
        }
    }


    public fun balance(self: &Bank): u64 {
        balance::value(&self.balance)
    }


    public fun admin_balance(self: &Bank): u64 {
        balance::value(&self.admin_balance)
    }


    public fun user(account: &Account ): address {
        account.user
    }

    public fun debt(account: &Account ): u64 {
        account.debt
    }


    // pub mut functions
    public fun deposit(self: &mut Bank, account: &mut Account, token: Coin<SUI>, ctx: &mut TxContext) {
        
        // gets value of passed token
        let value = coin::value(&token);
        // calculates fees for deposit and admin
        let fee = value - (((value as u128) * FEE / 100 ) as u64);
        let admin_fee = value - fee;

        let admin_coin = coin::split(&mut token , admin_fee , ctx);
        // deposit to admin balance of bank the calculated rate
        balance::join(&mut self.admin_balance, coin::into_balance(admin_coin));
        // deposit into balance of self bank  the token
        balance::join(&mut self.balance, coin::into_balance(token));

        // deposit to Account
        account.deposit = account.deposit + fee;


    }










}