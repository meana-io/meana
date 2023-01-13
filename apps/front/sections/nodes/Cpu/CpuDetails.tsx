import { Grid } from '@mui/material';

import Cpu from '@/types/cpu';
import { toTitleCase } from '@/utility/toTitleCase';
import CustomCard from '../../../components/CustomCard/CustomCard';
import { useRouter } from 'next/router';

import { COMPONENT_NAME } from '@/components/Dashboard/Cpu/CpuCustomCard';
import { hashParams } from '@/utility/hashParams';

interface CpuDetailsProps {
  cpu: Cpu;
}

const CpuDetails: React.FC<CpuDetailsProps> = ({ cpu }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const keysToDisplay: (keyof Cpu)[] = [
    'frequency',
    'coresQuantity',
    'manufacture',
    'model',
    'socketDesignation',
    'type',
    'cpuId',
    'version',
    'voltage',
    'externalClock',
    'maxSpeed',
    'status',
    'upgrade',
    'l1CacheHandle',
    'l2CacheHandle',
    'l3CacheHandle',
    'serialNumber',
    'assetTag',
    'partNumber',
    'coreEnabled',
    'threadCount',
    'characteristics','frequency',
    'coresQuantity',
    'manufacture',
    'model',
    'socketDesignation',
    'type',
    'cpuId',
    'version',
    'voltage',
    'externalClock',
    'maxSpeed',
    'status',
    'upgrade',
    'l1CacheHandle',
    'l2CacheHandle',
    'l3CacheHandle',
    'serialNumber',
    'assetTag',
    'partNumber',
    'coreEnabled',
    'threadCount',
    'characteristics',
  ];

  return (
    <Grid container spacing={2}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} md={12} lg={3} item key={key}>
          <CustomCard
            hash={hashParams(COMPONENT_NAME, nodeId, toTitleCase(key), key)}
            title={toTitleCase(key)}
            value={cpu[key] || 'N/A'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CpuDetails;
