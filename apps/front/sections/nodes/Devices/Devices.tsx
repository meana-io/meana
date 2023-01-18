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
import NoData from '@/components/NoData/NoData';
import CustomCard from '@/components/CustomCard/CustomCard';
import { hashParams } from '@/utility/hashParams';
import { toTitleCase } from '@/utility/toTitleCase';
import { COMPONENT_NAME } from '@/components/Dashboard/Device/DeviceCustomCard';

const Devices: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: nodeDevices, isLoading } = useGetNodeDevices(nodeId);

  console.log(nodeDevices);

  if (isLoading) {
    return <Progress />;
  }

  if (!nodeDevices) {
    return <NoData />;
  }

  return (
    <Grid container spacing={2} item xs={12}>
      {nodeDevices?.map(({ name, port }) => (
        <Grid xs={12} lg={4} item key={name}>
          <CustomCard
            hash={hashParams(
              COMPONENT_NAME,
              nodeId,
              name,
              toTitleCase(name),
              name
            )}
            title={toTitleCase(name)}
          >
            {port || 'N/A'}
          </CustomCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Devices;
