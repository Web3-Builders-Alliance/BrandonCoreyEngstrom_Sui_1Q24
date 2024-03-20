import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box sx={{  p: 3, bottom: 0, width: '100%' }}>
      <Typography variant="body1" color="text.primary" align="center">
        © 2024 PREDICTRIX.
      </Typography>
    </Box>
  );
};

export default Footer;
