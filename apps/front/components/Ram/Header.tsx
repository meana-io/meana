import {
  Box,
  Card,
  Typography,
  CardContent,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import Ram from '@/types/ram';

interface HeaderProps {
  rams: Ram[];
  handleRamChange: (ramId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  handleRamChange,
  rams,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4" fontWeight={500} mb={2}>
          Rams
        </Typography>
        <Box display="flex" flex={1} gap={2}>
          <FormControl fullWidth>
            <InputLabel id="ram">Ram</InputLabel>
            <Select
              labelId="ram"
              id="ram"
              label="Ram"
              defaultValue=""
              onChange={(event: SelectChangeEvent) =>
                handleRamChange(event.target.value)
              }
            >
              {rams.map(({ id, path }) => (
                <MenuItem key={id} value={id}>
                  {path}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Header;
