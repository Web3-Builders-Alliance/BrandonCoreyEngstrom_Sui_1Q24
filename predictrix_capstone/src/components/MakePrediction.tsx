import  { useState } from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import cn from 'classnames';
import { useWallet } from '@suiet/wallet-kit';


import { TransactionBlock } from '@mysten/sui.js/transactions';
import {  PACKAGE, CLOCK, GAME_ID  } from '../../scripts/config.ts';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});

const textFieldStyle = {
  input: {
    color: "white", // Ensuring text color is white for visibility
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // More readable font for input
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly dark background for the input field
    borderRadius: "4px", // Rounded corners for the input field
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  }
};





const MakePrediction = () => {
  
  const { connected, signAndExecuteTransactionBlock } = useWallet();
  const [republican, setRepublican] = useState<string>('');
  const [democrat, setDemocrat] = useState<string>('');


  // Ensure value is a positive integer or fallback to 0
  const toUint = (value: string): number => {
    const num = parseInt(value, 10);
    return isNaN(num) || num < 0 ? 0 : num;
  };


  // input boxes will always be A + B = 538
  const handleInput = (setValueOther: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    const numValue = toUint(value);
    setValueOther((538 - numValue).toString());
  };





  const handlePrediction = async () => {

    if (republican && democrat) {

      const republicanValue = toUint(republican);
      
      if (!connected) return;
      
      const txb = new TransactionBlock();


      txb.setGasBudget(10000000);


        const [coin] = txb.splitCoins(txb.gas, [txb.pure(1000000)]);


      
      txb.moveCall({
        target: `${PACKAGE}::kiosk_practice::make_prediction`,
        arguments: [txb.pure.u64(republicanValue), coin, txb.object(GAME_ID), txb.object(CLOCK)],
      });


      
      try {
        const predictionData = await signAndExecuteTransactionBlock({
          transactionBlock: txb
        });
        console.log('Prediction made!', predictionData);
        alert(`Congrats! Your prediction has been made! \n Digest: ${predictionData.digest}`);
      } catch (e) {
        console.error('Sorry, the prediction failed to be created', e);
      }
    }
  };
  

  if (connected) {
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
      }}>
        <Typography variant="h4" gutterBottom>
          Make Prediction
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
          <TextField
            id="input-a"
            variant="outlined"
            placeholder="REPUBLICANS"
            value={republican}
            onChange={(e) => setRepublican(e.target.value)}
            InputProps={{
              style: textFieldStyle.input,
            }}
            // Apply custom styles to the notched outline
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <Typography variant="h6">/</Typography>
          <TextField
            id="input-b"
            variant="outlined"
            placeholder="DEMOCRATS"
            value={democrat}
            onChange={(e) => setDemocrat(e.target.value)}
            InputProps={{
              style: textFieldStyle.input,
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <Button variant="outlined" onClick={handlePrediction}>Make Prediction</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
};
export default MakePrediction;