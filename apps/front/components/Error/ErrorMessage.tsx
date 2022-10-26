import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  children?: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {children ? children : 'Could not fetch data.'}
    </Alert>
  );
};

export default ErrorMessage;
