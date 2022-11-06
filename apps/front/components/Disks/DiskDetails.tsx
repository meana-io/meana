import { Grid } from '@mui/material';

import { toTitleCase } from '@/utility/toTitleCase';
import Disk from '@/types/disk';

import CustomCard from '../CustomCard/CustomCard';

interface DiskDetailsProps {
  disk: Disk;
}
const DiskDetails: React.FC<DiskDetailsProps> = ({ disk }) => {
  const keysToDisplay: (keyof Disk)[] = [
    'name',
    'capacity',
    'model',
    'manufacture',
    'serialNumber',
    'firmwareVersion',
  ];

  return (
    <Grid container spacing={2}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} md={12} lg={4} item key={key}>
          <CustomCard title={toTitleCase(key)} value={disk[key] || 'N/A'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DiskDetails;
