import { Grid } from '@mui/material';

import CpuDetails from './CpuDetails';
import ChartCard from './ChartCard';
import Cpu from '@/types/cpu';

interface CpuProps {
  cpu: Cpu;
}

const Cpu: React.FC<CpuProps> = ({ cpu }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={6}>
          <CpuDetails cpu={cpu} />
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cpu;
