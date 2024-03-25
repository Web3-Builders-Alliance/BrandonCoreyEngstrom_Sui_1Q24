import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWallet } from '@suiet/wallet-kit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransactionBlock} from '@mysten/sui.js/transactions';
import { KioskClient, Network, KioskTransaction } from '@mysten/kiosk';
import { PACKAGE, CLOCK, GAME_ID } from '../../../scripts/config.ts';
import { ITEMTYPE, PREDICTION_TWO } from '../../../scripts/config.js'; 
import { getFullnodeUrl, SuiClient, SuiHTTPTransport } from "@mysten/sui.js/client";



const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});




const ListPrediction = () => {

  const { connected, account, signAndExecuteTransactionBlock } = useWallet();


  const [userPredictionId, setUserPredictionId] = useState('');
  const [kioskId, setkioskID] = useState(''); 
  const [kioskOwnerCapId, setOwnerCapId] = useState(''); 
  const [userListPrice, setListPrice] = useState('');


  const handleCreateAndPlace = async () => {

    if (!connected || !userPredictionId) {
        alert("Please connect your wallet and enter a prediction ID.");
    } 

   


    console.log(`account: ${account?.address ?? ''}`);
    

    

    try {
       
  
        const txb = new TransactionBlock();
        
        
        txb.setGasBudget(10000000);
        

        txb.moveCall({
            target: `${PACKAGE}::predictrix::list_item`,
            arguments: [
                txb.object(kioskOwnerCapId),
                txb.object(kioskId),
                txb.object(userPredictionId),
                txb.pure.u64(userListPrice),
            ],
            typeArguments: [`${PACKAGE}::predictrix::Prediction`]
        });


  
        console.log("Prediction listed successfully.");


        // Sign and execute transaction block.
        const predictionData = await signAndExecuteTransactionBlock({ transactionBlock: txb });

        console.log('Prediction listed!', predictionData);
        alert(`Congrats! Your prediction has been listed! \n Digest: ${predictionData.digest}`);
        
        
      } catch (error) {
        console.error("Error in listing prediction:", error);
      }




    setUserPredictionId('');
    setkioskID('');
    setOwnerCapId('');

    

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
          List Prediction in Your Kiosk
        </Typography>
        <TextField
            label="Owner Cap ID"
            placeholder="Enter your Kiosk Owner Cap ID" 
            variant="outlined"
            value={kioskOwnerCapId}
            onChange={(e) => setOwnerCapId(e.target.value)}
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
          label="Kiosk ID"
          placeholder="Enter your Kiosk ID" 
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
          placeholder="Enter your prediction ID" 
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
          label="List Price"
          placeholder="Enter your list price" 
          variant="outlined"
          value={userListPrice}
          onChange={(e) => setListPrice(e.target.value)}
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
          List Prediction
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ListPrediction;

