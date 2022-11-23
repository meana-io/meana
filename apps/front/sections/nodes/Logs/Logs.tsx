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

const LOG_FILE_TYPES = ['auth.log', 'kern.log', 'system.log', 'dpkg.log'];

const Logs: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const [logFileType, setLogFileType] = useState('');

  const {
    data: logs,
    isFetching,
    refetch,
  } = useGetLogs(nodeId, logFileType, { enabled: false });

  useEffect(() => {
    if (logFileType) {
      refetch();
    }
  }, [logFileType, refetch]);

  return (
    <Card style={{ height: '70vh' }}>
      <CardHeader title="Logs" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="log-file-type">Logs Type</InputLabel>
                <Select
                  labelId="log-file-type"
                  label="Logs Type"
                  name="logFileType"
                  value={logFileType}
                  onChange={({ target }) => setLogFileType(target.value)}
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
