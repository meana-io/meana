import { useState } from 'react';

import { Grid, Box } from '@mui/material';

import Header from './Header';
import RamDetails from './RamDetails';
//import PartitionDetails from './RamDetails';
//import ChartCard from './ChartCard';
import Ram from '@/types/ram';

interface RamProps {
  rams: Ram[];
}

const Ram: React.FC<RamProps> = ({ rams}) => {
  const [ram, setRam] = useState<Ram | undefined>(undefined);

  const handleRamChange = (ramId: string) => {
    const selectedRam = rams.find((r) => r.id === ramId);
    setRam(selectedRam);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Header
          rams={rams}
          handleRamChange={handleRamChange}
        />
      </Grid>
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={6}>
          <RamDetails ram={ram} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Ram;
