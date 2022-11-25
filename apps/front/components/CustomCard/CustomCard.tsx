import { Box, Paper, Typography } from '@mui/material';
import ToogleToDashboard from '../ToogleToDashboard/ToogleToDashboard';

interface CustomCardProps {
  title: string;
  value: string;
  hash: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, value, hash }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: 223,
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box p={3} display="flex" flexDirection="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" mt={1}>
              <Typography component="span" variant="h6">
                {value}
              </Typography>
            </Box>
            <ToogleToDashboard hash={hash} />
          </Box>
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomCard;
