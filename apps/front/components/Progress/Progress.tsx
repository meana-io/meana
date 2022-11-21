import { CircularProgress, Box } from '@mui/material';

const Progress: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Progress;
