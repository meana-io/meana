import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import RamDetails from './RamDetails';
import { useGetNodeRam } from '@/api/ram';
import RamUsageChart from 'sections/nodes/RamUsageChart';
import NodeRam from '@/types/ram';
import Progress from '../Progress/Progress';

const getRamLabels = (ram: NodeRam[]) => ram.map(({ time }) => time);

const getRamUsage = (ram: NodeRam[]) =>
  ram.map(({ used, total }) =>
    Math.floor((parseInt(used, 10) / parseInt(total, 10)) * 100)
  );

const Ram: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: ram, isLoading } = useGetNodeRam(nodeId);

  if (isLoading) {
    return <Progress />;
  }

  console.log(ram);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        <RamDetails ram={ram.at(-1)} />
      </Grid>
      <Grid item xs={12} md={6}>
        <RamUsageChart
          title="Ram usage"
          chartLabels={getRamLabels(ram)}
          chartData={[
            {
              name: 'Usage',
              type: 'area',
              fill: 'gradient',
              data: getRamUsage(ram),
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default Ram;
