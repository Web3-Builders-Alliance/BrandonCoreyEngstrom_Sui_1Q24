import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cn from 'classnames'; 

const ConfirmWinner = () => {
  return (
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
      opacity: 0.5, 
      backgroundColor: 'rgba(128, 128, 128, 0.2)', 
      pointerEvents: 'none', 
    }}>
      <Typography className={cn("px-2 py-2 m-2 pixelify_sans")} variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', color: 'red', }}>
        Confirm Winning Prediction
      </Typography>
      {/* Content here */}
      <Typography paragraph>
        Content not available.
      </Typography>
    </Box>
  );
};

export default ConfirmWinner;
