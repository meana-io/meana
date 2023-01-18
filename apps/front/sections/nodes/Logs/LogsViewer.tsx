import { Typography, Box } from '@mui/material';
import Progress from '@/components/Progress/Progress';
import dynamic from 'next/dynamic';
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

  return (
    <Box sx={{ height: '50vh' }}>
      {/* @ts-ignore:next-line */}
      <LazyLog enableSearch text={data} caseInsensitive />
    </Box>
  );
};

export default LogsViewer;
