import { Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import BaseErrorMessage from './ErrorMessage';
import BaseLoader from './Loader';

interface ErrorBoundryProps {
  children: React.ReactNode;
}

const ErrorBoundry: React.FC<ErrorBoundryProps> = ({ children }) => {
  return (
    <ReactErrorBoundary fallback={<BaseErrorMessage />}>
      <Suspense fallback={<BaseLoader />}>{children}</Suspense>
    </ReactErrorBoundary>
  );
};

export default ErrorBoundry;
