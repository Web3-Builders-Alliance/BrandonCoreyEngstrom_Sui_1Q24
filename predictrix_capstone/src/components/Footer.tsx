import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{  p: 3, bottom: 0, width: '100%',  }}>
      <Typography variant="body1" color="red" align="center">
        © 2024 PREDICTRIX.MOV
      </Typography>
      <Typography variant="body1" color="red" align="center">
          GitHub:
          <Link href="https://github.com/ecorey/Prediction_Market_Vite/tree/main" color="inherit" underline="hover">
             -PACKAGE SCRIPTS AND TESTS-
          </Link>
        </Typography>
    </Box>
    </ThemeProvider>
  );
};

export default Footer;
