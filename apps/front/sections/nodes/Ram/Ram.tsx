import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import RamDetails from './RamDetails';
import { useGetNodeRam, useGetNodeRamStick } from '@/api/ram';
import RamUsageChart from 'sections/nodes/Ram/RamUsageChart';
import NodeRam from '@/types/ram';
import Progress from '@/components/Progress/Progress';
import RamStickDetails from './RamStickDetails';

export const getRamLabels = (ram: NodeRam[]) => ram?.map(({ time }) => time);

export const getRamUsage = (ram: NodeRam[]) =>
  ram?.map(({ used, total }) =>
    Math.floor((parseInt(used, 10) / parseInt(total, 10)) * 100)
  );

const Ram: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: ram, isLoading } = useGetNodeRam(
    nodeId,
    {},
    {
      refetchInterval: 1000 * 5,
    }
  );

  const { data: ramStick, isLoading: isLoadingRamStick } = useGetNodeRamStick(
    nodeId,
    {},
    {
      refetchInterval: 1000 * 5,
    }
  );

  if (isLoading && isLoadingRamStick) {
    return <Progress />;
  }
console.log(ramStick)
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        {/* <RamDetails ram={ram.at(-1)} /> */}
        <RamStickDetails ramStick={ramStick.at(-1)} />
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
