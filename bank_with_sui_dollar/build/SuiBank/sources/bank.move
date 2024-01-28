module sui_bank::bank {

    use sui::sui::SUI;
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self, TxContext};



    use sui_bank::sui_dollar::{Self, CapWrapper, SUI_DOLLAR};

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



   public fun withdraw(self: &mut Bank, account: &mut Account, value: u64, ctx: &mut TxContext): Coin<SUI> {
        assert!(account.debt == 0, EPayYourLoan);
        assert!(account.deposit >= value, ENotEnoughBalance);

        account.deposit = account.deposit - value;

        coin::from_balance(balance::split(&mut self.balance, value), ctx)
    }


    public fun borrow(account: &mut Account , cap: &mut CapWrapper, value: u64, ctx: &mut TxContext) : Coin<SUI_DOLLAR> {
        let max_borrow_amount = (((account.deposit as u128) * EXCHANGE_RATE / 100) as u64);

        assert!(max_borrow_amount >= account.debt + value, EBorrowIsTooHigh);
        account.debt = account.debt + value;

        sui_dollar::mint(cap, value, ctx)
    }


    public fun repay( account: &mut Account, cap: &mut CapWrapper, coin_in: Coin<SUI_DOLLAR>) {
        let amount = sui_dollar::burn(cap, coin_in);

        account.debt = account.debt - amount;
    }


    public fun destroy_empty_account(account: Account) {
        let Account  { id, debt: _, deposit, user: _} = account;
        assert!( deposit == 0, EAccountMustBeEmpty);
        object::delete(id);

    }

    // ADMIN FUNCTIONS
    public fun claim(_: &OwnerCap, self: &mut Bank, ctx: &mut TxContext): Coin<SUI> {
        let value = balance::value(&self.admin_balance);
        coin::take(&mut self.admin_balance, value, ctx)
    }


    // swap challenge functions


    public fun swap_sui(self: &mut Bank, capwrap: &mut CapWrapper, coin_in: Coin<SUI>, ctx: &mut TxContext) : Coin<SUI_DOLLAR> {

        let value_in = coin::value(&coin_in);

        let sui_dollar_amount = (((value_in as u128) * EXCHANGE_RATE / 100) as u64);

        let val_bank = &mut self.balance;

        balance::join(val_bank, coin::into_balance(coin_in));

        sui_dollar::mint( capwrap, sui_dollar_amount, ctx)

     }



     public fun swap_sui_dollar(self: &mut Bank, capwrap: &mut CapWrapper, coin_in: Coin<SUI_DOLLAR>, ctx: &mut TxContext): Coin<SUI> {


        let dol_val = coin::value(&coin_in);

        sui_dollar::burn(capwrap, coin_in);

        let amount = ((((dol_val as u128) * 100)/ EXCHANGE_RATE) as u64);

        let split_bal = balance::split(&mut self.balance, amount);

        coin::from_balance(split_bal, ctx)

     }



}