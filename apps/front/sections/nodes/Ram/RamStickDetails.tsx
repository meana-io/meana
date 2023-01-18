import { Grid } from '@mui/material';
import CustomCard from '@/components/CustomCard/CustomCard';

import RamStick from '@/types/ramStick';
import { toTitleCase } from '@/utility/toTitleCase';
import { useRouter } from 'next/router';
import { hashParams } from '@/utility/hashParams';
import { COMPONENT_NAME } from '@/components/Dashboard/Ram/RamCustomCard';
interface RamStickkDetailsProps {
  ramStick: RamStick;
}

const RamStickkDetails: React.FC<RamStickkDetailsProps> = ({ ramStick }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  return (
    <Grid container spacing={2}>
      {Object.keys(ramStick).map((key, index) => (
        <Grid xs={12} md={12} lg={3} item key={`${key}-${index}`}>
          <CustomCard
            hash={hashParams(COMPONENT_NAME, nodeId, toTitleCase(key), key)}
            title={toTitleCase(key)}
            value={ramStick[key]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RamStickkDetails;
