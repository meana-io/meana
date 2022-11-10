import DiskPartitions from '@/types/disk';
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

interface HeaderProps {
  disksAndPartitions: DiskPartitions[];
  selectedDisk: DiskPartitions;
  handlePartitionChange: (partitionIndex: number) => void;
  handleDiskChange: (diskIndex: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  disksAndPartitions,
  selectedDisk,
  handlePartitionChange,
  handleDiskChange,
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
                handleDiskChange(+event.target.value as number)
              }
            >
              {disksAndPartitions &&
                disksAndPartitions?.map(({ name }, i) => (
                  <MenuItem key={name} value={i}>
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
              onChange={(event: SelectChangeEvent) => {
                handlePartitionChange(+event.target.value as number);
              }}
            >
              {selectedDisk?.partitions?.map(({ path }, i) => (
                <MenuItem key={path} value={i}>
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
