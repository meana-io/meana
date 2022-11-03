import { useGetNodesList } from '@/api/nodes';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface RamFormProps {}

const RamForm: React.FC<RamFormProps> = ({}) => {
  const { data: nodes } = useGetNodesList();

  return (
    <FormControl fullWidth>
      <InputLabel id="select-node">Select Node</InputLabel>
      <Select labelId="select-node" id="node-select" label="Node">
        {nodes.map(({ name, uuid }) => (
          <MenuItem key={uuid} value={uuid}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RamForm;
