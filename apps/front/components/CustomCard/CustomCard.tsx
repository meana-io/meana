import { Box, Paper, Typography } from '@mui/material';
import AddToFavorites from '../AddToFavorites/AddToFavorites';

interface CustomCardProps {
  title: string;
  value: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, value }) => {
  return (
    <Paper variant="elevation">
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
            <AddToFavorites />
          </Box>
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomCard;
