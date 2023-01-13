import { Grid } from '@mui/material';
import CustomCard from '@/components/CustomCard/CustomCard';

import RamStick from '@/types/ramStick';
import { toTitleCase } from '@/utility/toTitleCase';
import { useRouter } from 'next/router';


interface RamStickkDetailsProps {
  ramStick: RamStick;
}

const RamStickkDetails: React.FC<RamStickkDetailsProps> = ({ ramStick }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;


  return (
    <Grid container spacing={2}>
      {Object.keys(ramStick).map((key) => (
        <Grid xs={12} md={12} lg={3} item key={key}>
          <CustomCard
            hash={''}
            title={toTitleCase(key)}
            value={ramStick[key]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RamStickkDetails;
