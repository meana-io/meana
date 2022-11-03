import { CardContent, CardProps, Typography } from '@mui/material';
import ComponentPreview from '../../ComponentPreview';

const CpuComponentPreview: React.FC<CardProps> = ({ onClick }) => {
  return (
    <ComponentPreview title="CPU" onClick={onClick}>
      <CardContent>
        <Typography component="div" variant="h6">
          Frequency: 3123MH
        </Typography>
        <Typography component="div" variant="h6">
          CoresQuantity: 4
        </Typography>
        <Typography component="div" variant="h6">
          Manufacture: Intel
        </Typography>
        <Typography component="div" variant="h6">
          Model: 312313
        </Typography>
      </CardContent>
    </ComponentPreview>
  );
};

export default CpuComponentPreview;
