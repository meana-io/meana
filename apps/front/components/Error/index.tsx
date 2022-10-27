import { Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import BaseErrorMessage from './ErrorMessage';
import BaseLoader from './Loader';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: string;
  loader?: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  errorMessage,
  loader,
}) => {
  return (
    <ReactErrorBoundary
      fallback={<BaseErrorMessage>{errorMessage}</BaseErrorMessage>}
    >
      <Suspense fallback={loader ? loader : <BaseLoader />}>
        {children}
      </Suspense>
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
