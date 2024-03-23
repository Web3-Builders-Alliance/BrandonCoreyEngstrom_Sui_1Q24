import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cn from 'classnames'; 

import genie from '/home/ub/SUI_PROJECTS/Predictrix_new/vite-project/src/assets/giphy.gif';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Finger Paint', sans-serif",
  },
});

const Genie = () => {
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
      <Typography className={cn("px-2 py-2 m-2 pixelify_sans")} variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', pb: 2, color: 'blue' }}>
        Guess
      </Typography>
      {/* Image centered within the Box */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <img src={genie} alt="Map" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Genie;
