import { TextField } from '@mui/material';

interface RamFormProps {}

const RamForm: React.FC<RamFormProps> = ({}) => {
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

export default RamForm;
