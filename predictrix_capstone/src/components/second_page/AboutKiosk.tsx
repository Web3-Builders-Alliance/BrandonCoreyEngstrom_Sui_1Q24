import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cn from 'classnames'; 

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});


const AboutKiosk = () => {
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
      <Typography className={cn("px-2 py-2 m-2 pixelify_sans")}  variant="h4" gutterBottom component="div" sx={{ color: 'blue', }}>
        About Kiosk and Predictrix
      </Typography>
      
      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        Predictrix is a decentralized application that leverages the power of SUI and uses the SUI kiosk to manage predictions made on this site. You can connect your wallet to manage your prediction using the KIOSK here.
        Any information required can be found by using a blockchain explorer to search for your wallet and then the needed id numbers.
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        To create a new Kiosk and Place the Prediction in the kiosk see below.      
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        To Take your Prediction from the Kiosk see below.      
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        To List a Prediction in the Kiosk see below.
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        To Delist a Prediction from the Kiosk see below.      
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        To Purchase a Prediction from the Kiosk see below.      
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        To Withdraw funds from your Kiosk see below.      
      </Typography>

      





    </Box>
    </ThemeProvider>
  );
};

export default AboutKiosk;
