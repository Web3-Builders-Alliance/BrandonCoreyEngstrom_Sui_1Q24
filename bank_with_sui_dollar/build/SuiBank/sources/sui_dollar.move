module sui_bank::sui_dollar {

    use std::option;
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::coin::{Self, Coin, TreasuryCap};


    struct SUI_DOLLAR has drop {}

    friend sui_bank::bank;

    // public shared object
    struct CapWrapper has key {
        id: UID, 
        cap: TreasuryCap<SUI_DOLLAR>,
    }




    #[lint_allow(share_owned)]
    fun init(witness: SUI_DOLLAR, ctx: &mut TxContext) {
        
        let (treasury_cap, metadata) = coin::create_currency<SUI_DOLLAR>(
            witness, 
            9,
            b"SUID",
            b"Sui Dollar",
            b"Stable coin issued by sui bank",
            option::none(),
            ctx,
        );

        transfer::share_object( CapWrapper{ id: object::new(ctx), cap: treasury_cap});
        transfer::public_share_object(metadata);

    }


    public fun burn( cap: &mut CapWrapper, coin_in: Coin<SUI_DOLLAR> ): u64 {
        coin::burn(&mut cap.cap, coin_in)
    }


    public(friend) fun mint(cap: &mut CapWrapper, val: u64 , ctx: &mut TxContext) : Coin<SUI_DOLLAR> {
        coin::mint( &mut cap.cap, val, ctx)
    }


}