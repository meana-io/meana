import { Typography, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Progress from '@/components/Progress/Progress';
const LazyLog = dynamic(
  () => import('react-lazylog').then((module) => module.LazyLog),
  {
    ssr: false,
  }
);

interface LogsViewerProps {
  isFetching: boolean;
  data: string;
}

const LogsViewer: React.FC<LogsViewerProps> = ({ isFetching, data }) => {
  if (isFetching) {
    return <Progress />;
  }

  if (!data) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography>No logs</Typography>
      </Box>
    );
  }

  // eslint-disable-next-line
  return <LazyLog extraLines={1} enableSearch text={data} caseInsensitive />;
};

export default LogsViewer;
