import { TextField } from '@mui/material';

interface CpuFormProps {}

const CpuForm: React.FC<CpuFormProps> = ({}) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="query"
      label="Select"
      type="text"
      fullWidth
      variant="standard"
    />
  );
};

export default CpuForm;
