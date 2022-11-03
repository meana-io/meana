import { CardContent, CardProps, Typography } from '@mui/material';
import ComponentPreview from '../../ComponentPreview';

const RamComponentPreview: React.FC<CardProps> = ({ onClick }) => {
  return (
    <ComponentPreview title="RAM" onClick={onClick}>
      <CardContent>
        <Typography component="div" variant="h6">
          Used Space: 883.9 MB
        </Typography>
        <Typography component="div" variant="h6">
          Capacity: 976.83 MB
        </Typography>
      </CardContent>
    </ComponentPreview>
  );
};

export default RamComponentPreview;
