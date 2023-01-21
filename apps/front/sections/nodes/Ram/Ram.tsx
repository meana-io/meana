import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import RamDetails from './RamDetails';
import { useGetNodeRam, useGetNodeRamStick } from '@/api/ram';
import RamUsageChart from 'sections/nodes/Ram/RamUsageChart';
import NodeRam from '@/types/ram';
import Progress from '@/components/Progress/Progress';
import RamStickDetails from './RamStickDetails';
import NoData from '@/components/NoData/NoData';

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

  if (isLoading || isLoadingRamStick) {
    return <Progress />;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        {Array.isArray(ram) && ram.length > 0 ? (
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
        ) : (
          <NoData />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {ramStick ? <RamStickDetails ramStick={ramStick.at(-1)} /> : <NoData />}
      </Grid>
    </Grid>
  );
};

export default Ram;
