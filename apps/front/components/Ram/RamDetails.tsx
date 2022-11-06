import { Grid } from '@mui/material';
import CustomCard from '../CustomCard/CustomCard';

import { formatBytes } from '@/utility/formatBytes';

import Ram from '@/types/ram';
import { toTitleCase } from '@/utility/toTitleCase';

const toFormatBytesInNumber = (value: string) => {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) ? formatBytes(parsed) : value;
};

interface RamDetailsProps {
  ram: Ram;
}

const RamDetails: React.FC<RamDetailsProps> = ({ ram }) => {
  const keysToDisplay: (keyof Ram)[] = ['total', 'used'];

  return (
    <Grid container spacing={2}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} md={12} lg={3} item key={key}>
          <CustomCard
            title={toTitleCase(key)}
            value={toFormatBytesInNumber(ram[key]) || 'N/A'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RamDetails;
