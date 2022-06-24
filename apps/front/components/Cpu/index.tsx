import { Grid } from '@mui/material';

// import ChartCard from './ChartCard';
import Cpu from '@/types/cpu';
import CpuDetails from './CpuDetails';

interface CpuProps {
  cpu: Cpu;
}

const Cpu: React.FC<CpuProps> = ({ cpu }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={12}>
          <CpuDetails cpu={cpu} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cpu;
