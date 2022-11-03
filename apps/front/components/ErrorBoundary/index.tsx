import { Alert, AlertTitle } from '@mui/material';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: string;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  errorMessage,
}) => {
  return (
    <ReactErrorBoundary
      fallback={
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage ? errorMessage : 'Could not fetch data.'}
        </Alert>
      }
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
