// ####################################################
// ###################  OUTLINE #######################
// ####################################################

// The structure of the program is as follows:
// 1. GAME LOGIC
// 2. INIT / TRANSFER POLICY LOGIC
// 3. PREDICTION LOGIC
// 4. KIOSK LOGIC
// 5. WITHDRAW FUNCTIONS
// 6. TESTS


// 1) GAME LOGIC
// - EPOCH struct to hold game times
// - GameOwnerCap that goes to sender of the init function
// - Game struct to hold a game instance
// - Winner event emitted when a winner is claimed
// - function to create a new game instance
// - function to start the game and allows predictions to be made
// - function to close the game/ sets the result and allows the report winner function to be called
// - function to claim the winner within timeframe by ref, add event to mark the winner
// - function to set predict epoch
// - funciton to set report epoch



// 2) INIT / TRANSFER POLICY LOGIC
// - OTW for the init function4
// - Registry struct that will hold the transfer policy
// - function for the init  that creates the transfer policy and stores it in the regisry which is a shared object
// - function that adds the royalty rule to the transfer policy



// 3) PREDICTION LOGIC
// - PredictionMade event emitted when a prediction is made
// - Prediction struct
// - function to make a prediction and lock it in the users kiosk, also emits an event for the prediction



// 4) KIOSK LOGIC
// - function that creates a new kiosk for a user that can hold the predictions
// - function that burns the prediction from the kiosk and deletes the prediction
// - function that lists the prediction in the kiosk for sale
// - functioin that delists the prediction from the kiosk
// - function to purchase a prediction from another user
// - funciton to withdraw from a personal kiosk
// - function to withdraw from the transfer policy



// 5) WITHDRAW FUNCTIONS
// - function to withdraw from a personal kiosk
// - function to withdraw from the transfer policy
// - function to withdraw from game balance



// 6) Tests
// - test the init function
// - test the sender has the game owner cap
// - test making a prediction



// ####################################################
// ###################  FLOW ##########################
// ####################################################

// when the init function is called, it creates the transfer policy and stores it in the regisry which is a shared object
// and transfers the transfer policy cap and game owner cap to the sender
// the game owner cap is then used to start the game and close the game
// the transfer policy is used to enforce a 5% royalty fee when making a prediction
// the predictions are held and locked in a users kiosk and they can be listed/ delisted, purchased, and burned.
// the game owner cap is used to close the game and allow the claim the winner function to be called
// the winner can then claim the pot and the game instance is deleted

// ####################################################
// ####################################################
// ####################################################






module predictrix::predictrix {

    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::transfer_policy::{Self as tp, TransferPolicy, TransferPolicyCap, TransferRequest, confirm_request, new_request};
    use sui::tx_context::{TxContext, Self};
    use sui::package::{Self, Publisher};    
    use std::string::{String};
    use sui::display::{Self, Display};
    use std::option::{Self, Option};
    use sui::event;
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::table::Table;
    use sui::coin::{Self, Coin};    
    use sui::clock::{Self, Clock};
    use sui::borrow::{Self, Borrow};

    use predictrix::royalty_policy;

    use predictrix::switchboard_oracle::{Self, AggregatorInfo};
    use switchboard::aggregator::{Self, Aggregator};
    



    #[test_only]
    friend predictrix::predictrix_tests;
    




    // ########
    // #ERRORS#
    // ########

    const EOutsideWindow: u64 = 0;
    const EIncorrectPrediction: u64 = 1;
    const EGameNotClosed: u64 = 2;
    const EWrongPrice: u64 = 3;




    // ##################################
    // ############GAME LOGIC############
    // ################################## 

    // struct to hold game times
    struct PredictEpoch has key, store {
       id: UID,
       start_time: u64,
       end_time: u64,

    }


    // struct to hold game times
    struct ReportEpoch has key, store {
       id: UID,
       start_time: u64,
       end_time: u64,

    }



    // game owner cap that goes to sender of the init function
     struct GameOwnerCap has key {
        id: UID,
    }

    
    
    struct StartGameCap has key {
        id: UID,
    }



    struct EndGameCap has key {
        id: UID,
    }


    struct GameOpen has copy, drop {
        game_open: bool,
    }



    // struct to hold a game instance
    struct Game has key, store {
        id: UID,
        price: u64,
        pot: Balance<SUI>, 
        result: Option<u64>,  
        predict_epoch: PredictEpoch, 
        report_epoch: ReportEpoch, 
        game_closed: bool, 
        winner_claimed: bool, 
        
    }



    // event emitted when a winner is reported  
    struct GameStarted has copy, drop {
        time: u64,
        predict_start_time: u64,
        predict_end_time: u64,
        report_start_time: u64,
        report_end_time: u64,
    }



    // event emitted when a winner is reported  
    struct Winner has copy, drop {
        prediction: Option<u64>,
        made_by: address,
        time: u64,
    }
    


    // GET TIME

    struct TimeEvent has copy, drop, store {
        timestamp_ms: u64
    }

    

    public fun get_time(clock: &Clock)  {
        event::emit(TimeEvent {
            timestamp_ms: clock::timestamp_ms(clock),
        });

    }



    // create a new game instance
    fun new_game(price: u64, predict_epoch: PredictEpoch, report_epoch: ReportEpoch, ctx: &mut TxContext) : Game {
       
        
       
        Game {
            id: object::new(ctx),
            price, 
            pot: balance::zero<SUI>(),
            result: option::none(),
            predict_epoch,
            report_epoch,
            game_closed: false,
            winner_claimed: false,
        }

        

    }


  

    // startst the game and allows predictions to be made
    public fun start_game(start_game_cap: StartGameCap, price: u64, predict_epoch: PredictEpoch, report_epoch: ReportEpoch, clock: &Clock, ctx: &mut TxContext)  {

       

        event::emit(GameStarted {
            time: clock::timestamp_ms(clock),
            predict_start_time: predict_epoch.start_time,
            predict_end_time: predict_epoch.end_time,
            report_start_time: report_epoch.start_time,
            report_end_time: report_epoch.end_time,
        });


        event::emit(GameOpen {
            game_open: true,
        });


        let game = new_game(price, predict_epoch, report_epoch, ctx);
        
        transfer::public_share_object(game);

        let StartGameCap { id } = start_game_cap;
        object::delete(id);


        
        
    }


    // REDO
    // close the game/ sets the result and allows the report winner function to be called
    public fun close_game(end_game_cap: EndGameCap, game_instance: &mut Game, result: u64, ctx: &mut TxContext) : bool {
        
        // assert!(game_instance.predict_epoch.end_time < tx_context::epoch(ctx), EOutsideWindow);
        game_instance.game_closed = true;
        
        // switchboard_oracle::save_aggregator_info(aggregator, ctx);

        event::emit(GameOpen {
            game_open: false,
        });


        let EndGameCap { id } = end_game_cap;
        object::delete(id);

        // ORACLE logic to save the data to the game instance' result field
        game_instance.result = option::some(result);

        game_instance.game_closed
        
    }




    
    public fun claim_winner( prediction: Prediction, game_instance: &mut Game, clock: &Clock, ctx: &mut TxContext)  { 
            
        assert!(game_instance.game_closed, EGameNotClosed);
        assert!(clock::timestamp_ms(clock) > game_instance.report_epoch.start_time, EOutsideWindow);
        assert!(clock::timestamp_ms(clock) < game_instance.report_epoch.end_time, EOutsideWindow);


        assert!(prediction.timestamp > game_instance.predict_epoch.start_time, EOutsideWindow);
        assert!(prediction.timestamp < game_instance.predict_epoch.end_time, EOutsideWindow);


        assert!(prediction.prediction == game_instance.result, EIncorrectPrediction);


        game_instance.winner_claimed = true;


        let bal_all = balance::withdraw_all(&mut game_instance.pot);
        let winning_pot = coin::from_balance<SUI>(bal_all, ctx); 


        transfer::public_transfer(winning_pot, tx_context::sender(ctx));

       
        event::emit(Winner {
            prediction: prediction.prediction,
            made_by: tx_context::sender(ctx),
            time: clock::timestamp_ms(clock),
        });


        
        let Prediction {id, prediction_id: _, prediction: _, timestamp: _ } = prediction;
        object::delete(id);

         

    }

        

 
    



    public fun set_predict_epoch(start_time: u64, end_time: u64, ctx: &mut TxContext) : PredictEpoch  {
        
        let predict_epoch  = PredictEpoch {
            id: object::new(ctx),
            start_time,
            end_time,
        };

        predict_epoch

    }




    public fun set_report_epoch(start_time: u64, end_time: u64, ctx: &mut TxContext) : ReportEpoch {
        
        let report_epoch  = ReportEpoch {
            id: object::new(ctx),
            start_time,
            end_time,
        };

        report_epoch

    }
    




    
    const EIncorrectPaymentAmount: u64 = 11;

    // event emitted when a balance is added to the game
    struct GamePotIncreased has copy, drop {
        amount: u64,
        
    }




    // puts a coin into the game balance
    public fun add_game_balance(game: &mut Game, deposit: Coin<SUI>, ctx: &mut TxContext) {
        let pot = &mut game.pot;

        event::emit(GamePotIncreased { amount: coin::value<SUI>(&deposit) });

        balance::join(pot, coin::into_balance(deposit));

        
    }




    
    // ########################################
    // ############PREDICTION LOGIC############
    // ########################################

    // event emitted when a prediction is made
    // user only needs to predict the repub and dem can be caluculated from the total count
    struct PredictionMade has copy, drop {
        prediction: Option<u64>,
        made_by: address,
    }



    // the prediction struct
    struct Prediction has key, store {
        id: UID,
        prediction_id: ID,
        prediction: Option<u64>,
        timestamp: u64,
        
    }



    public fun make_prediction( predict: u64, payment: Coin<SUI>, game: &mut Game, clock: &Clock, ctx: &mut TxContext)  {
        
        
        assert!(coin::value(&payment) == game.price, EIncorrectPaymentAmount);

        add_game_balance(game, payment, ctx);

        event::emit(PredictionMade {
            prediction: option::some(predict),
            made_by: tx_context::sender(ctx),
        });


        let id = object::new(ctx);
        let prediction_id = object::uid_to_inner(&id);

        let prediction = Prediction {
            id, 
            prediction_id,
            prediction: option::some(predict),
            timestamp: clock::timestamp_ms(clock),
        };


        transfer::public_transfer(prediction, tx_context::sender(ctx));
       
    }








    // #####################################################
    // ############INIT  / TRANSFER POLICY LOGIC############
    // #####################################################

    // OTW for the init function
    struct PREDICTRIX has drop {}
    

    // event that is emitted when the init function is called and gives the time
    struct InitEvent has copy, drop {
        tx_epoch: u64,
    }




    // init creates the transfer policy and stores it in the regisry which is a shared object 
    // and transfers the transfer policy cap and game owner cap to the sender
    fun init(otw: PREDICTRIX, ctx: &mut TxContext) {


        
        let publisher = package::claim(otw, ctx);


        let ( transfer_policy, tp_cap ) = tp::new<Prediction>(&publisher, ctx);


        // add royality rule to the transfer policy with a 5% royality fee
        add_royalty_to_policy(&mut transfer_policy, &tp_cap, 005_00);


        // transfer the publisher, transfer policy cap and game owner cap to the sender and share the registry
        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(tp_cap, tx_context::sender(ctx));
        transfer::public_share_object(transfer_policy);
        

        transfer::transfer(GameOwnerCap {
            id: object::new(ctx),
        }, tx_context::sender(ctx));


        transfer::transfer(StartGameCap {
            id: object::new(ctx),
        }, tx_context::sender(ctx));


        transfer::transfer(EndGameCap {
            id: object::new(ctx),
        }, tx_context::sender(ctx));



        event::emit(InitEvent {
            tx_epoch: tx_context::epoch(ctx),
        });


    }

    

    // adds the royalty rule to the transfer policy
   public fun add_royalty_to_policy(
        policy: &mut TransferPolicy<Prediction>,
        cap: &TransferPolicyCap<Prediction>,
        amount_bp: u16, 
    ) {
        
        royalty_policy::set<Prediction>(policy, cap, amount_bp);
    }




    // ###################################
    // ############GETTER LOGIC###########
    // ###################################

    struct GameBalance has copy, drop {
        balance: u64,
    }


    // gets the game balance
    public fun balance(game: &Game) : u64 {
        
        let bal = balance::value<SUI>(&game.pot);

        event::emit(GameBalance {
            balance: bal,
        });

        bal
    }



    
    // ###################
    // WITHDRAW FUNCTIONS#
    // ###################

    // withdraw from a personal kiosk [untested]
    public fun withdraw_balance_from_kiosk(kiosk: &mut Kiosk, kiosk_owner_cap: &KioskOwnerCap, amount: Option<u64>, ctx: &mut TxContext) : Coin<SUI> {
        kiosk::withdraw(kiosk, kiosk_owner_cap, amount, ctx)
    }



    // withdraw from the transfer policy [untested]
    public fun withdraw_balance_from_tranfer_policy( transfer_policy: &mut TransferPolicy<Prediction>, transfer_policy_cap: &TransferPolicyCap<Prediction>, amount: Option<u64>, ctx: &mut TxContext ) : Coin<SUI> {
        tp::withdraw(transfer_policy, transfer_policy_cap, amount, ctx)
    }



    // withdraw from game balance
    public fun withdraw_balance_from_game(_: &GameOwnerCap, game: &mut Game, amount: u64, ctx: &mut TxContext) {
       
        assert!(game.game_closed, EGameNotClosed);  
        
        let withdrawal = balance::split(&mut game.pot, amount);
    
        let bal = coin::from_balance(withdrawal, ctx);

        transfer::public_transfer(bal, tx_context::sender(ctx));
    }



   

    


    // ###################
    // CLEANUP FUNCTIONS##
    // ###################


    // deletes the epoch
    public entry fun delete_predict_epoch(predict_epoch: PredictEpoch, ctx: &mut TxContext) {
        let PredictEpoch { id, start_time: _, end_time: _ } = predict_epoch;
        object::delete(id);
    }


     // deletes the epoch
    public entry fun delete_report_epoch(report_epoch: ReportEpoch, ctx: &mut TxContext) {
        let ReportEpoch { id, start_time: _, end_time: _ } = report_epoch;
        object::delete(id);
    }


   // deletes the game owner cap
    public fun delete_game_owner_cap(game_owner_cap: GameOwnerCap, ctx: &mut TxContext) {
        let GameOwnerCap { id } = game_owner_cap;
        object::delete(id);
    }


    // deletes the game
    public fun delete_game(game: Game, _: &GameOwnerCap, ctx: &mut TxContext) : Balance<SUI> {
        let Game { id, price: _, pot, result: _, predict_epoch, report_epoch, game_closed: _, winner_claimed: _ } = game;
        object::delete(id);
        delete_predict_epoch(predict_epoch, ctx);
        delete_report_epoch(report_epoch, ctx);
        pot
    }



    // deletes the prediction
    public fun delete_prediction(prediction: Prediction, ctx: &mut TxContext) {

        let Prediction { id, prediction_id: _, prediction: _, timestamp: _ } = prediction;
        object::delete(id);

    }






    // ###################################
    // ############KIOSK LOGIC############
    // ###################################




    // done in ptb
    // place, take, list, delist, purchase 
    








    // ###################################
    // ############TEST LOGIC#############
    // ###################################



    // wrapper for the init function allowing it to be called from the test module
    #[test_only]
    public fun init_for_testing(otw: PREDICTRIX, ctx: &mut TxContext) {
        init(otw, ctx);
    }

   


}


















