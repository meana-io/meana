import { Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import BaseErrorMessage from './ErrorMessage';
import BaseLoader from './Loader';

interface ErrorBoundryProps {
  children: React.ReactNode;
  errorMessage?: string;
  loader?: React.ReactNode;
}

const ErrorBoundry: React.FC<ErrorBoundryProps> = ({
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

export default ErrorBoundry;
