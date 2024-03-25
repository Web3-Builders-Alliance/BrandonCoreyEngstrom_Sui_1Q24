import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useWallet } from '@suiet/wallet-kit';
import { useState } from 'react';


import cn from 'classnames';

import { TransactionBlock } from '@mysten/sui.js/transactions';
import { PACKAGE, CLOCK, GAME_ID, PREDICTION_ID } from '../../scripts/config.ts';


import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
  components: {
    
    MuiButton: {
      styleOverrides: {
        
        root: {
          '&.Mui-disabled': {
            
            color: 'rgba(255, 255, 255, 0.7)', 
            borderColor: 'rgba(255, 255, 255, 0.3)', 
          },
        },
      },
    },
  },
});


const ClaimWinnings = () => {
  const { connected, signAndExecuteTransactionBlock } = useWallet();
  const [userPredictionId, setUserPredictionId] = useState("");



  const handleClaimWinnings = async () => {
    if (!connected || !userPredictionId) return; 
    
    const txb = new TransactionBlock();
    
    
    txb.setGasBudget(10000000);
    


    txb.moveCall({
      target: `${PACKAGE}::predictrix::claim_winner`,
      arguments: [txb.object(userPredictionId), txb.object(GAME_ID), txb.object(CLOCK)],
    });


    try {
      const result = await signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });


      console.log('Winnings claimed successfully', result);
      alert('Your winnings have been successfully claimed!');
    } catch (error) {
      console.error('Failed to claim winnings', error);
      alert('Failed to claim winnings. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexDirection: 'column', color: 'blue', alignItems: 'center', p: 2, border: '1px solid white', boxShadow: '0px 0px 10px orange', borderRadius: '4px', m: 1, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Claim Your Winnings
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Prediction ID"
        value={userPredictionId}
        onChange={(e) => setUserPredictionId(e.target.value)}
        disabled={!connected} 
        sx={{
          borderColor: 'white',
          color: 'white',
          marginBottom: '20px',
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } },
          '&:hover fieldset': { borderColor: 'white' },
          '&.Mui-focused fieldset': { borderColor: 'white' },
          '&.Mui-disabled': { color: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(255, 255, 255, 0.3)' },
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClaimWinnings}
        disabled={!connected}
        sx={{ borderColor: 'white', color: 'white', ':hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }, }}
      >
        Claim Winnings
      </Button>
    </Box>
  </ThemeProvider>
  );
};

export default ClaimWinnings;
