import { Container, Grid, Box } from '@mui/material';
import AboutKiosk from "./AboutKiosk";
import CreateSharedKiosk from "./CreateSharedKiosk";
import CreatePlace from "./CreatePlace";
import PlacePrediction from "./PlacePrediction";
import TakeFromKiosk from "./TakeFromKiosk";
import ListPrediction from "./ListPrediction";
import DeListPrediction from "./DeListPrediction";
import Purchase from "./Purchase";
import WithdrawFromKiosk from "./WithdrawFromKiosk";
import { useWallet } from '@suiet/wallet-kit'; 

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});

function SecondPage() {
  const { connected } = useWallet(); 

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{ flexGrow: 1, padding: '0 16px' }}>
          <Container maxWidth="xl" sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <AboutKiosk />
              </Grid>

                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CreateSharedKiosk /> 
                    </Grid>
                )}

                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PlacePrediction /> 
                    </Grid>
                )}

                

                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ListPrediction /> 
                    </Grid>
                )}


                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DeListPrediction /> 
                    </Grid>
                )}


                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TakeFromKiosk /> 
                    </Grid>
                )}


                
                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Purchase /> 
                    </Grid>
                )}

                {connected && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <WithdrawFromKiosk /> 
                    </Grid>
                )}

                

            </Grid>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default SecondPage;
