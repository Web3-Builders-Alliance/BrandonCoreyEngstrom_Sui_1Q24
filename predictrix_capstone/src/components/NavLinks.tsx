// NavigationLinks.js
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});

const NavigationLinks = () => {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'Finger Paint' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>Home</Link>
      <Link to="/second-page" style={{ textDecoration: 'none', color: 'blue' }}>Kiosk Options</Link>
    </Box>
    </ThemeProvider>
  );
};

export default NavigationLinks;
