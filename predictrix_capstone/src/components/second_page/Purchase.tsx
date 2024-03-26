import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWallet } from '@suiet/wallet-kit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransactionBlock} from '@mysten/sui.js/transactions';
import { KioskClient, Network, KioskTransaction } from '@mysten/kiosk';
import { PACKAGE, CLOCK, GAME_ID, TRANSFER_POLICY } from '../../../scripts/config.ts';
import { ITEMTYPE, PREDICTION_TWO } from '../../../scripts/config.js'; 
import { getFullnodeUrl, SuiClient, SuiHTTPTransport } from "@mysten/sui.js/client";



const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});




const Purchase = () => {

  const { connected, account, signAndExecuteTransactionBlock } = useWallet();


  const [userPredictionId, setUserPredictionId] = useState('');
  const [kioskId, setkioskID] = useState('');
  const [payment, setPayment] = useState('');
  const [transfer_policy, setTransferPolicy] = useState('');


  const handleCreateAndPlace = async () => {

    if (!connected || !userPredictionId) {
        alert("Please connect your wallet and enter a prediction ID.");
    } 

   


    console.log(`account: ${account?.address ?? ''}`);
    

    

    try {
       
  
        const txb = new TransactionBlock();
        
        
        txb.setGasBudget(10000000);


        let request = await txb.moveCall({
            target: `${PACKAGE}::predictrix::buy_listed_item`,
            arguments: [
                txb.object(kioskId),
                txb.object(userPredictionId),
                txb.object(payment),
                txb.object(transfer_policy),
            ],
            typeArguments: [`${PACKAGE}::predictrix::Prediction`]
        });


      

  
        console.log("Prediction purchased successfully.");


        // Sign and execute transaction block.
        const predictionData = await signAndExecuteTransactionBlock({ transactionBlock: txb  });

        console.log('Prediction purchased!', request);
        alert(`Congrats! Your prediction has been purchased! \n Digest: ${predictionData.digest}`)
        
        
      } catch (error) {
        console.error("Error in purchasing prediction:", error);
      }




    setUserPredictionId('');
    setkioskID('');
    setPayment('');

    

  };





  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        border: '1px solid white',
        boxShadow: '0px 0px 10px orange',
        borderRadius: '4px',
        m: 1,
        width: '100%',
        color: 'blue',
      }}>

        <Typography variant="h4" gutterBottom >
          Purchase a Prediction from a Kiosk
        </Typography>
        <TextField
            label="Kiosk ID"
            placeholder="Enter the Kiosk ID" 
            variant="outlined"
            value={kioskId}
            onChange={(e) => setkioskID(e.target.value)}
            sx={{
              mb: 2,
              width: '100%',
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", 
                },
                "&:hover fieldset": {
                  borderColor: "lightblue", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "lightblue", 
                },
              },
              "& .MuiInputBase-input": {
                color: "white", 
              },
            }}
          />

         <TextField
          label="Prediction ID"
          placeholder="Enter prediction ID" 
          variant="outlined"
          value={userPredictionId}
          onChange={(e) => setUserPredictionId(e.target.value)}
          sx={{
            mb: 2,
            width: '100%',
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", 
              },
              "&:hover fieldset": {
                borderColor: "lightblue", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "lightblue", 
              },
            },
            "& .MuiInputBase-input": {
              color: "white", 
            },
          }}
        />

        <TextField
          label="Payment ID"
          placeholder="Enter payment" 
          variant="outlined"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          sx={{
            mb: 2,
            width: '100%',
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", 
              },
              "&:hover fieldset": {
                borderColor: "lightblue", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "lightblue", 
              },
            },
            "& .MuiInputBase-input": {
              color: "white", 
            },
          }}
        />
        <TextField
          label="Transfer Policy ID"
          placeholder="Enter Transfer Policy ID" 
          variant="outlined"
          value={transfer_policy}
          onChange={(e) => setTransferPolicy(e.target.value)}
          sx={{
            mb: 2,
            width: '100%',
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", 
              },
              "&:hover fieldset": {
                borderColor: "lightblue", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "lightblue", 
              },
            },
            "& .MuiInputBase-input": {
              color: "white", 
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleCreateAndPlace}
          disabled={!connected}
        >
          Purchase Prediction
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Purchase;

