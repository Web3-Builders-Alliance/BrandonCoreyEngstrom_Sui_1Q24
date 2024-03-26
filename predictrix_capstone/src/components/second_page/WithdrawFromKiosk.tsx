import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWallet } from '@suiet/wallet-kit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransactionBlock} from '@mysten/sui.js/transactions';
import { PACKAGE, } from '../../../scripts/config.ts';



const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});




const WithdrawFromKiosk = () => {

  const { connected, account, signAndExecuteTransactionBlock } = useWallet();


  const [userAmount, setUserAmount] = useState('');
  const [kioskId, setkioskID] = useState('');
  const [kioskOwnerCapId, setOwnerCapId] = useState('');


  const handleCreateAndPlace = async () => {

   

   


    console.log(`account: ${account?.address ?? ''}`);
    

    

    try {
       
  
        const txb = new TransactionBlock();
        
        
        txb.setGasBudget(10000000);
        

        txb.moveCall({
            target: `${PACKAGE}::predictrix::withdraw_from_kiosk`,
            arguments: [
                txb.object(kioskOwnerCapId),
                txb.object(kioskId),
                txb.pure.u64(userAmount),
            ],
            
        });


  
        console.log("Withdraw successful.");


        // Sign and execute transaction block.
        const predictionData = await signAndExecuteTransactionBlock({ transactionBlock: txb });

        console.log('Withdraw', predictionData);
        alert(`Congrats! Withdrawal Successful! \n Digest: ${predictionData.digest}`);
        
        
      } catch (error) {
        console.error("Error in Withdrawal:", error);
      }




    setUserAmount('');
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
        color: 'white',
      }}>

        <Typography variant="h4" gutterBottom >
          Withdraw Amount from Kiosk
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
          label="Amount"
          placeholder="Enter Amount to Withdraw" 
          variant="outlined"
          value={userAmount}
          onChange={(e) => setUserAmount(e.target.value)}
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
          Withdraw 
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default WithdrawFromKiosk;

