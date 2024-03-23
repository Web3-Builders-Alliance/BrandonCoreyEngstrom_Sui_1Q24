import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{  p: 3, bottom: 0, width: '100%' }}>
      <Typography variant="body1" color="white" align="center">
        © 2024 PREDICTRIX.
      </Typography>
    </Box>
    </ThemeProvider>
  );
};

export default Footer;
