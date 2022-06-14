import { Grid, Typography } from '@mui/material';

import RamDetails from './RamDetails';
import ChartCard from './ChartCard';
import Ram from '@/types/ram';

interface RamProps {
  ram: Ram;
}

const Ram: React.FC<RamProps> = ({ ram }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={6}>
          <RamDetails ram={ram} />
        </Grid>
        <Grid item xs={6}>
          <ChartCard
            title="Ram space"
            labels={['Used', 'Free']}
            series={[
              parseInt(ram?.used || '0', 10),
              parseInt(ram?.total || '0', 10) - parseInt(ram?.used || '0', 10),
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Ram;
