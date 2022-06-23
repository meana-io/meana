import {
  Box,
  Card,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import Disk from '@/types/disk';
import Partition from '@/types/partition';

interface HeaderProps {
  disks: Disk[];
  partitions: Partition[];
  handlePartitionChange: (partitionId: string) => void;
  handleDiskChange: (diskId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  handlePartitionChange,
  handleDiskChange,
  disks,
  partitions,
}) => {
  return (
    <Card>
      <CardHeader title="Disks" />
      <CardContent>
        <Box display="flex" flex={1} gap={2}>
          <FormControl fullWidth>
            <InputLabel id="disk">Disk</InputLabel>
            <Select
              labelId="disk"
              id="disk"
              label="Disk"
              defaultValue=""
              onChange={(event: SelectChangeEvent) =>
                handleDiskChange(event.target.value)
              }
            >
              {disks.map(({ serialNumber, name }) => (
                <MenuItem key={serialNumber} value={serialNumber}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="partition">Partiton</InputLabel>
            <Select
              labelId="partition"
              id="partition"
              label="Partition"
              defaultValue=""
              onChange={(event: SelectChangeEvent) =>
                handlePartitionChange(event.target.value)
              }
            >
              {partitions.map(({ path, diskSerialNumber }) => (
                <MenuItem key={diskSerialNumber} value={diskSerialNumber}>
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
