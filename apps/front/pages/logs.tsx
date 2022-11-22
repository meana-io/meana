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
import { NextPage } from 'next';
import BaseLayout from '@/layouts/Base/BaseLayout';
import { useGetNodesList } from '@/api/nodes';
import Progress from '@/components/Progress/Progress';
import { useGetLogs } from '@/api/logs';
import { useEffect, useState } from 'react';
import LogsViewer from 'sections/logs/LogsViewer';

const LOG_FILE_TYPES = ['auth.log', 'kern.log', 'system.log', 'dpkg.log'];

const Logs: NextPage = () => {
  const [nodeId, setNodeId] = useState('');
  const [fileType, setFileType] = useState('');

  const { data: nodes, isLoading: isNodesLoading } = useGetNodesList();
  const {
    data: logs,
    refetch,
    isFetching,
  } = useGetLogs(nodeId, fileType, { enabled: false });

  useEffect(() => {
    if (nodeId && fileType) {
      refetch();
    }
  }, [nodeId, fileType, refetch]);

  if (isNodesLoading) {
    return <Progress />;
  }

  return (
    <BaseLayout>
      <Card style={{ height: '70vh' }}>
        <CardHeader title="Logs" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="node-id">Node</InputLabel>
                  <Select
                    labelId="node-id"
                    label="Node"
                    name="node"
                    value={nodeId}
                    onChange={(e) => setNodeId(e.target.value)}
                  >
                    {nodes.map(({ uuid, name }) => (
                      <MenuItem key={uuid} value={uuid}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="log-file">Log File</InputLabel>
                  <Select
                    labelId="log-file"
                    label="Log File"
                    name="file"
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
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
              <LogsViewer data={logs} isFetching={isFetching} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </BaseLayout>
  );
};

export default Logs;
