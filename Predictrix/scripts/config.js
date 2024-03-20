// ###################################
// ############CONFIG#################
// ###################################




// ORDER OF SCRIPTS AFTER PUBLISHING PACKAGE 

// 1. node subscribe_events.js [FIX]


// 2. node current_time.js (use to set PREDICT_START_TIME in config.js)
// 3. node start_game.js (use to set GAME_ID in config.js)
// 4. node game_balance.js (check before adding to game balance)
// 5. node add_balance_to_game.js (set COIN_TO_ADD in config.js)
// 6. node game_balance.js (check after adding the game balance)


// 7. node withdraw_bal_from_game.js [FIX]

// 8. node make_prediction.js
// 9. node create_kiosk_and_place.js
// 10. node kiosk_list_prediction.js
// 11. node kiosk_delist_prediction.js




//   KIOSK SCRIPTS [TODO]
// - purchase with another wallet
// - withdraw balance from kiosk and transfer policy
//   WINNER SCRIPTS [TODO]
// - get winner





// 98. node close_game.js 
// 99. node delete_owner_cap.js 







// ###################################
// ############CONSTS#################
// ###################################

export const CLOCK = "0x6";


export const DEV_WALLET = "0x07095af51002db0e9be284b8dab97263f77fec2a1be68cd42b7dd2358a6eccdd";


// created in init
export const PACKAGE = "0xcd57af4426f53698e011dac73ca0703d6399eb8f83fbd9e3ddd75c0e2de7db56";
export const START_GAME_CAP = "0xa4ecb4b05c0137e5178658a8beec84373e5d90de20b590312ed071e5ed23a5c4";
export const END_GAME_CAP = "0xdab932fd52efb97360f96789ee0973cb637e5331fc1bc818ae13bbaa3e1a86fb";
export const GAME_OWNER_CAP = "0xca747f2cdafe81220973ed5be0aa468102628585ec6af232f7191c48ce9dbdf0";
export const TRANSFER_POLICY  = "export const itemType = `${PACKAGE}::kiosk_practice::Prediction`;";
export const TRANSFER_POLICY_CAP = "0x2ff59d79e8c34f79d62f8c2ee4db27cf2bc00efca6b94783ad2e0d96274d9028";
export const PUBLISHER = "";
export const UPGRADE_CAP = "";
export const ITEMTYPE = `${PACKAGE}::kiosk_practice::Prediction`;


// START GAME SCRIPT
export const GAME_PRICE = "1000000";

// (election event on Nov. 5)
// get from get time event log
export const PREDICT_START_TIME = 1710651841557;

// November 3, 2024, at 12:00 AM (GMT)
export const PREDICT_END_TIME = 1730592000000;

// November 10, 2024 at 12:00 AM (GMT)
export const REPORT_START_TIME = 1731196800000;

// December 1, 2024 at 12:00 AM (GMT)
export const REPORT_END_TIME = 1733011200000;




//CLOSE GAME SCRIPT
// game id
export const GAME_ID = "0xfda03fa340647d1e87e42cb56a135c5b5b5cd066bd8cf366342b9c8df497bd09";




// ADD BALANCE TO GAME SCRIPT
export const COIN_TO_ADD = "0x58e0ccb2acbdb75aef883e1b61710cfe371d4e3e993715499526e7965acdc9b5";




// GAME RESULT SCRIPT
export const GAME_RESULT = "223";



// PREDCITION SCRIPT
export const PREDICTION = "0xeff1dcd15977e3bb42fdab5322e8ed1c07af195250cb68a3f69e5d02117d1091";
export const PREDICTION_ID = "0xeff1dcd15977e3bb42fdab5322e8ed1c07af195250cb68a3f69e5d02117d1091";

export const PREDICTION_TWO = "0xc8315a7ec44be9c23914d114b4eaab9b07270f04bbdad728858a166787dc8ab1";


export const GUESS = 444;



// KIOSK SCRIPT
export const KIOSK = "0xf9c26f45757096716492210edc25cb846088a6300185137375cbc2ba5ea70dde";
export const KIOSK_OWNER_CAP = "0x6a7421356a817ad2c948ad84356612a13034c431b95360c8bad9520b14eaf554";




// WALLETS

export const devWalletPublicKeyRef = "0xb3d4cb714181fec39c22d820c963da9cfac970d3ab77c464b0dea06ce673c3e5";

export const walletOneRef = "0x6dc3f9438f890ff4031f6a2151b3ca02aebf9e1522f0014a956dd8ef067e3b01";

export const walletTwoRef = "0xe5f5e09892328ff278b473f485cbf85cef8a9958112023c84126aec3d32b8114";

export const walletThreeRef = "0x07095af51002db0e9be284b8dab97263f77fec2a1be68cd42b7dd2358a6eccdd";

export const walletFourRef = "0xf84965aee90c0e4d56a9658d78ecbc01e7908cab78cad6a62bcc558171cd2b34";

export const walletFiveRef = "0x95b2e05ab1b7f9f53f7085069dd5b7f9d7d1055e406605791d87b34253bca1cb";