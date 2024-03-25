import './App.css';
import { Container, Grid, Box, GlobalStyles } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Genie from "./components/Genie";
import ConfirmWinner from "./components/ConfirmWinner";
import About from "./components/About";
import GameStatus from './components/GameStatus';
import Roadmap from "./components/Roadmap";
import MakePrediction from "./components/MakePrediction";
import SecondPage from "./components/second_page/SecondPage"; 
import NavBar from "./components/NavBar";
import Footer from './components/Footer';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import * as React from 'react';

import background from "./assets/stars.gif";






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
    <Router>

      <div className="App" style={{ 
        backgroundImage: `url(${background})`, 
        backgroundPosition: 'center', 
        backgroundRepeat: 'repeat',
        height: 'auto', 
        
      }}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          <NavBar />
          <Routes>
            <Route path="/" element={
              <MainLayout>
                <About />
                <GameStatus />
                <MakePrediction />
                <Genie />
                <Roadmap />
                <ConfirmWinner />
              </MainLayout>
            } />
            <Route path="/second-page" element={<SecondPage />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </div>
    </Router>
  );
}


function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ flexGrow: 1, padding: '0 16px' }}> 
      <Container maxWidth="xl" sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {React.Children.map(children, child => (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              {child}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
