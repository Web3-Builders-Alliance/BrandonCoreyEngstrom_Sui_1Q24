import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cn from 'classnames'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { PACKAGE } from '../../scripts/config.ts';


const theme = createTheme({
    typography: {
      fontFamily: "'Finger Paint', sans-serif",
    },
  });


const GameStatus = () => {
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

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'red', fontSize: '1.875rem', fontWeight: 'bold' }}>
        Game OPEN
      </Typography>
      
      <Typography className={cn("px-2 py-2 m-2 ")}  variant="h4" gutterBottom component="div" sx={{ color: 'red', fontSize: '1.875rem' }} >
        Contract: {PACKAGE}
      </Typography>
      
      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        Game Started: 0000-00-00 00:00:00 - GMT
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
       Game Ends: November 3, 2024, at 12:00 AM - GMT
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
       Start Time To Claim Winner: November 10, 2024 at 12:00 AM - GMT
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        ***
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
       End Time To Claim Winner: February 2, 2024, at 12:00 AM - GMT
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
      ----------------------------------------------------------------------
      </Typography>

      <Typography className={cn("px-2 py-2 m-2")}  variant="body1" gutterBottom component="div" sx={{ color: 'white', }}>
        Predictrix will pull the final results using a switchboard oracle from aggregated results from .gov official sources after an offical count has been etablished. Predictrix is a neutral platform and will only use the officially established result and has a long report end time in the case of a prolonged or longer than anticipated result to be established.
      </Typography>

    </Box>

    </ThemeProvider>


  );
};




export default GameStatus;
