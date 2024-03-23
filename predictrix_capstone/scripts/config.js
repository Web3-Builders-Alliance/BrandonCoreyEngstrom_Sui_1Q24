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
export const PACKAGE = "0xeee834a8c14dda5c0722cb99470cb9613ec9aad3ac343476c910933c7eb2952b";
export const START_GAME_CAP = "0x714fffa412f7b3580682536671a7181b886c6071887082573cc010750a079310";
export const END_GAME_CAP = "0x6975936e7df459647be317a085b6b244a7d247ed939cc82f58ddb4321f23a772";
export const GAME_OWNER_CAP = "0x3fac1172066821fe6ea4a24f2fa307a5d4d0edba1103f696646744dc8aa5ebf8";
export const TRANSFER_POLICY  = "";
export const TRANSFER_POLICY_CAP = "0x3d12fd42c98fd5daaacf82fddee2ba55d36a3f68240d0191889e14257a3bd692";
export const PUBLISHER = "";
export const UPGRADE_CAP = "";
export const ITEMTYPE = `${PACKAGE}::kiosk_practice::Prediction`;


// START GAME SCRIPT
export const GAME_PRICE = "1000000";

// (election event on Nov. 5)
// get from get time event log
export const PREDICT_START_TIME = 1711147963913;

// November 3, 2024, at 12:00 AM (GMT)
export const PREDICT_END_TIME = 1730592000000;

// November 10, 2024 at 12:00 AM (GMT)
export const REPORT_START_TIME = 1731196800000;

// February 2, 2024, at 12:00 AM (GMT)
export const REPORT_END_TIME = 1706832000000;




//CLOSE GAME SCRIPT
// game id
export const GAME_ID = "0x5e2842c1727d6430dbbe6496bdbe7f681f407ad9e96685ab18f6c63dc2d0bf3f";

export const GAME_STATUS = false;



// ADD BALANCE TO GAME SCRIPT
export const COIN_TO_ADD = "0x81e5534a23552d8e80250a62729a193df59dab977c033feda484493b859236f6";




// GAME RESULT SCRIPT
export const GAME_RESULT = "223";



// PREDCITION SCRIPT
export const PREDICTION = "0xf2a6c426ae44abb525f5375fedc2d167f086af09268b41333f103623dd4f6545";
export const PREDICTION_ID = "0xf2a6c426ae44abb525f5375fedc2d167f086af09268b41333f103623dd4f6545";

export const PREDICTION_TWO = "";


export const GUESS = 444;



// KIOSK SCRIPT
export const KIOSK = "";
export const KIOSK_OWNER_CAP = "";




// WALLETS

export const devWalletPublicKeyRef = "0xb3d4cb714181fec39c22d820c963da9cfac970d3ab77c464b0dea06ce673c3e5";

export const walletOneRef = "0x6dc3f9438f890ff4031f6a2151b3ca02aebf9e1522f0014a956dd8ef067e3b01";

export const walletTwoRef = "0xe5f5e09892328ff278b473f485cbf85cef8a9958112023c84126aec3d32b8114";

export const walletThreeRef = "0x07095af51002db0e9be284b8dab97263f77fec2a1be68cd42b7dd2358a6eccdd";

export const walletFourRef = "0xf84965aee90c0e4d56a9658d78ecbc01e7908cab78cad6a62bcc558171cd2b34";

export const walletFiveRef = "0x95b2e05ab1b7f9f53f7085069dd5b7f9d7d1055e406605791d87b34253bca1cb";