import './App.css';
import { Container, Grid, Box } from '@mui/material';

import Genie from "./components/Genie";
import ConfirmWinner from "./components/ConfirmWinner";
import About from "./components/About";
import GameStatus from './components/GameStatus';
import Roadmap from "./components/Roadmap";
import MakePrediction from "./components/MakePrediction";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 


// Define the theme
const theme = createTheme({
  typography: {
    fontFamily: 'PixelSans, Arial, sans-serif',
  },
  palette: {
    mode: 'dark', 
    background: {
      default: '#000000', 
    },
  },
 
});



function App() {


  return (
    <div className="App">

      <ThemeProvider theme={theme}>
      <CssBaseline />

      <NavBar />

        <Box sx={{ flexGrow: 1, padding: '0 16px' }}> 
          <Container maxWidth="xl" sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
              

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <About />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <GameStatus />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <MakePrediction />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Genie />
              </Grid>
              
              
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Roadmap />
              </Grid>
              

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ConfirmWinner />
              </Grid>


            </Grid>
          </Container>
        </Box>

      <Footer />

      </ThemeProvider>
    </div>
  );
}

export default App;