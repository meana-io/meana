import { useGetNodeDevices } from '@/api/devices';
import Progress from '@/components/Progress/Progress';
import { useRouter } from 'next/router';
import {
  CardContent,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface DevicesProps {}

const Devices: React.FC<DevicesProps> = ({}) => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: nodeDevices, isLoading } = useGetNodeDevices(nodeId);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Grid container spacing={2} item xs={12} lg={12}>
      <Card>
        <CardContent>
          <List>
            {nodeDevices?.map(({ name, port }, index) => (
              <ListItem key={index}>
                <ListItemText primary={name} secondary={port} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Devices;
