import { NextPage } from 'next';
import {
  Card,
  Button,
  CardContent,
  CardHeader,
  Grid,
  CardActions,
  Typography,
  Select,
  Box,
  Slider,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useFormik } from 'formik';
import { useGetNodeDisksAndPartitions } from '@/api/disks';
import { useRouter } from 'next/router';
import ListSubheader from '@mui/material/ListSubheader';

const Settings: NextPage = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  const { data: disksAndPartitions, isLoading } =
    useGetNodeDisksAndPartitions(nodeId);

  const formik = useFormik({
    initialValues: {
      disk: '',
      partition: '',
      sliderDisk: 0,
      sliderUsedSpacePartition: 0,
      sliderCapacityPartition: 0,
      sliderUsedRam: 0,
      sliderUsageCpu: 0,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={20}>
          <Card>
            <CardHeader title="Disks" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="disk-label">Disk</InputLabel>
                <Select
                  labelId="disk-label"
                  id="disk"
                  name="disk"
                  label="Disk"
                  value={formik.values.disk}
                  onChange={formik.handleChange}
                >
                  {disksAndPartitions?.map(({ name }, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                Capacity:
              </Typography>
              <Box>
                <Slider
                  id="sliderDisk"
                  name="sliderDisk"
                  value={formik.values.sliderDisk}
                  onChange={formik.handleChange}
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Box>
              </FormControl>
            </CardContent>
            <CardActions>
              <Box
                p={2}
                display="flex"
                sx={{ width: '100%' }}
                justifyContent="flex-end"
              >
                <Button type="submit" size="large" variant="contained">
                  Save
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={20}>
          <Card>
            <CardHeader title="Partiton" />
            <CardContent>
              <FormControl fullWidth>
              <InputLabel id="partition-label">Partition</InputLabel>
              <Typography variant="body2" color="text.secondary" gutterBottom>
              </Typography>
              <Select
                labelId="partition-label"
                id="partition"
                name="partition"
                label="Partition"
                value={formik.values.partition}
                onChange={formik.handleChange}
              >
                <ListSubheader>Dysk sda</ListSubheader>
                <MenuItem value={1}>Partiton 1</MenuItem>
                <MenuItem value={2}>Partiton 2</MenuItem>
                <ListSubheader>Dysk sda1</ListSubheader>
                <MenuItem value={3}>Partiton 3</MenuItem>
                <MenuItem value={4}>Partiton 4</MenuItem>
              </Select>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                UsedSpace:
              </Typography>
              <Box>
                <Slider
                  id="sliderUsedSpacePartition"
                  name="sliderUsedSpacePartition"
                  value={formik.values.sliderUsedSpacePartition}
                  onChange={formik.handleChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Capacity:
              </Typography>
              <Box>
                <Slider
                  id="sliderCapacityPartition"
                  name="sliderCapacityPartition"
                  value={formik.values.sliderCapacityPartition}
                  onChange={formik.handleChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Box>
              </FormControl>
            </CardContent>
            <CardActions>
              <Box
                p={2}
                display="flex"
                sx={{ width: '100%' }}
                justifyContent="flex-end"
              >
                <Button type="submit" size="large" variant="contained">
                  Save
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={20}>
          <Card>
            <CardHeader title="RAM" />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Used:
              </Typography>
              <Box>
                <Slider
                  id="sliderUsedRam"
                  name="sliderUsedRam"
                  value={formik.values.sliderUsedRam}
                  onChange={formik.handleChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box
                p={2}
                display="flex"
                sx={{ width: '100%' }}
                justifyContent="flex-end"
              >
                <Button type="submit" size="large" variant="contained">
                  Save
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={20}>
          <Card>
            <CardHeader title="CPU" />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Usage:
              </Typography>
              <Box>
                <Slider
                  id="sliderUsageCpu"
                  name="sliderUsageCpu"
                  value={formik.values.sliderUsageCpu}
                  onChange={formik.handleChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box
                p={2}
                display="flex"
                sx={{ width: '100%' }}
                justifyContent="flex-end"
              >
                <Button type="submit" size="large" variant="contained">
                  Save
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default Settings;
