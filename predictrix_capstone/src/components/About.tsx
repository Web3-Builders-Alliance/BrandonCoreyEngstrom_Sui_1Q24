import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cn from 'classnames'; 

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});


const About = () => {
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
      <Typography className={cn("px-2 py-2 m-2 pixelify_sans")}  variant="h4" gutterBottom component="div" sx={{ color: 'red', }}>
        About Predictrix
      </Typography>
      
      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        Predictrix is a decentralized application that allows users to predict the outcome of the 2024 US Presidential Election using SUI. Predictrix is currently in a test phase and is for educational purposes only. No actual monetary value is exchanged. 
      </Typography>
      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        CURRENTLY PREDICTRIX IS DESKTOP VERSION ONLY.
      </Typography>
      
    </Box>
    </ThemeProvider>
  );
};

export default About;
