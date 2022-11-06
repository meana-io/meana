import { Grid } from '@mui/material';

import Cpu from '@/types/cpu';
import { toTitleCase } from '@/utility/toTitleCase';
import CustomCard from '../CustomCard/CustomCard';

interface CpuDetailsProps {
  cpu: Cpu;
}

const CpuDetails: React.FC<CpuDetailsProps> = ({ cpu }) => {
  const keysToDisplay: (keyof Cpu)[] = [
    'frequency',
    'coresQuantity',
    'manufacture',
    'model',
  ];

  return (
    <Grid container spacing={2}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} md={12} lg={3} item key={key}>
          <CustomCard title={toTitleCase(key)} value={cpu[key] || 'N/A'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CpuDetails;
