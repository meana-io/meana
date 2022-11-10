import { Grid } from '@mui/material';
import CustomCard from '../CustomCard/CustomCard';

import { formatBytes } from '@/utility/formatBytes';

import Ram from '@/types/ram';
import { toTitleCase } from '@/utility/toTitleCase';
import { useRouter } from 'next/router';

import { COMPONENT_NAME } from '@/components/Dashboard/Ram/RamCustomCard';
import { hashParams } from '@/utility/hashParams';

const toFormatBytesInNumber = (value: string) => {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) ? formatBytes(parsed) : value;
};

interface RamDetailsProps {
  ram: Ram;
}

const RamDetails: React.FC<RamDetailsProps> = ({ ram }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const keysToDisplay: (keyof Ram)[] = ['total', 'used'];

  return (
    <Grid container spacing={2}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} md={12} lg={3} item key={key}>
          <CustomCard
            hash={hashParams(COMPONENT_NAME, nodeId, toTitleCase(key), key)}
            title={toTitleCase(key)}
            value={toFormatBytesInNumber(ram[key]) || 'N/A'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RamDetails;
