import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetLogs } from '@/api/logs';
import LogsViewer from 'sections/nodes/Logs/LogsViewer';
import { useRouter } from 'next/router';

const LOG_FILE_TYPES = ['auth.log', 'kern.log', 'syslog', 'dpkg.log'];

const Logs: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const [logFileName, setLogFileName] = useState('');

  const {
    data: logs,
    isFetching,
    refetch,
  } = useGetLogs(nodeId, logFileName, { enabled: false });

  useEffect(() => {
    if (logFileName) {
      refetch();
    }
  }, [logFileName, refetch]);

  return (
    <Card style={{ height: '70vh' }}>
      <CardHeader title="Logs" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="log-file-name">Logs File</InputLabel>
                <Select
                  labelId="log-file-name"
                  label="Logs File"
                  name="logFileName"
                  value={logFileName}
                  onChange={({ target }) => setLogFileName(target.value)}
                >
                  {LOG_FILE_TYPES.map((fileType) => (
                    <MenuItem key={fileType} value={fileType}>
                      {fileType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LogsViewer isFetching={isFetching} data={logs} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Logs;
