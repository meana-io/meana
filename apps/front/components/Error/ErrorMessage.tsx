import { Alert, AlertTitle } from '@mui/material';

const ErrorMessage: React.FC = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Could not fetch data.
    </Alert>
  );
};

export default ErrorMessage;
