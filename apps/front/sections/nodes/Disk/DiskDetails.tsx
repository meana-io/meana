import { Grid } from '@mui/material';

import { toTitleCase } from '@/utility/toTitleCase';
import Disk from '@/types/disk';

import CustomCard from '@/components/CustomCard/CustomCard';
import { COMPONENT_NAME } from '@/components/Dashboard/Disk/DiskCustomCard';
import { useRouter } from 'next/router';
import { hashParams } from '@/utility/hashParams';
import { toFormatBytesInNumber } from '@/utility/formatBytes';

interface DiskDetailsProps {
  disk: Disk;
}
const DiskDetails: React.FC<DiskDetailsProps> = ({ disk }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const keysToDisplay: (keyof Disk)[] = [
    'name',
    'capacity',
    'model',
    'manufacture',
    'serialNumber',
  ];

  return (
    <Grid container spacing={2} item xs={12} lg={6}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} lg={6} xl={4} item key={key}>
          <CustomCard
            hash={hashParams(
              COMPONENT_NAME,
              nodeId,
              disk.name,
              toTitleCase(key),
              key
            )}
            title={toTitleCase(key)}
            value={toFormatBytesInNumber(disk[key] as string) || 'N/A'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DiskDetails;
