import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWallet } from '@suiet/wallet-kit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransactionBlock} from '@mysten/sui.js/transactions';
import { KioskClient, Network, KioskTransaction } from '@mysten/kiosk';
import { getFullnodeUrl, SuiClient, SuiHTTPTransport } from "@mysten/sui.js/client";



const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});


// client
const client = new SuiClient({
  transport: new SuiHTTPTransport({
      url: getFullnodeUrl('testnet'),
  }),
});



// kiosk client
const kioskClient = new KioskClient({
  client, 
  network: Network.TESTNET,
});



const CreateKiosk = () => {

  const { connected, account, signAndExecuteTransactionBlock } = useWallet();



  const handleCreateAndPlace = async () => {

    if (!connected  ) {
      alert("Please connect your wallet");
    } 

    // create Transaction Block
    const txb = new TransactionBlock();
      

    // create Kiosk TxBlock
    const kioskTx = new KioskTransaction({ transactionBlock: txb, kioskClient });


    txb.setGasBudget(10000000);




    // create a new kiosk public shared kiosk
    kioskTx.create();

    
    
    

    if (account) {
      kioskTx.shareAndTransferCap(account.address);
      console.log(`Kiosk created and Kiosk cap sent to ${account.address} !`);
      kioskTx.finalize();
    }



    // Sign and execute transaction block.
    const predictionData = await signAndExecuteTransactionBlock({ transactionBlock: txb });

    alert(`Congrats! KioskCreated! \n Digest: ${predictionData.digest}`);

    console.log(`Congrats! KioskCreated! \n Digest: ${predictionData.digest}`);
    



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
        color: 'red',
      }}>

        <Typography variant="h4" gutterBottom>
          Create Kiosk 
        </Typography>
        
        <Button
          variant="contained"
          onClick={handleCreateAndPlace}
          disabled={!connected}
        >
           Create Kiosk
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default CreateKiosk;
