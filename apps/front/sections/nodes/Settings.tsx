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
  Slider,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import ListSubheader from '@mui/material/ListSubheader';
import Progress from '@/components/Progress/Progress';
import { styled } from '@mui/system';
import { useGetNodeDisksAndPartitions } from '@/api/disks';

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

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
    return <Progress />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Disks" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sm={12}>
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
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <Typography gutterBottom>Max Capacity:</Typography>
                  <Slider
                    id="sliderDisk"
                    name="sliderDisk"
                    value={formik.values.sliderDisk}
                    onChange={formik.handleChange}
                    defaultValue={50}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <StyledCardActions>
              <Button type="submit" size="large" variant="contained">
                Save
              </Button>
            </StyledCardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Partiton" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="partition-label">Partition</InputLabel>
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
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <Typography gutterBottom>Max Used Space:</Typography>
                  <Slider
                    id="sliderUsedSpacePartition"
                    name="sliderUsedSpacePartition"
                    value={formik.values.sliderUsedSpacePartition}
                    onChange={formik.handleChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography gutterBottom>Max Capacity:</Typography>
                  <Slider
                    id="sliderCapacityPartition"
                    name="sliderCapacityPartition"
                    value={formik.values.sliderCapacityPartition}
                    onChange={formik.handleChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <StyledCardActions>
              <Button type="submit" size="large" variant="contained">
                Save
              </Button>
            </StyledCardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="RAM" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Typography gutterBottom>Max RAM Usage:</Typography>
                  <Slider
                    id="sliderUsedRam"
                    name="sliderUsedRam"
                    value={formik.values.sliderUsedRam}
                    onChange={formik.handleChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <StyledCardActions>
              <Button type="submit" size="large" variant="contained">
                Save
              </Button>
            </StyledCardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="CPU" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Typography gutterBottom>Max CUP Usage:</Typography>
                  <Slider
                    id="sliderUsageCpu"
                    name="sliderUsageCpu"
                    value={formik.values.sliderUsageCpu}
                    onChange={formik.handleChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <StyledCardActions>
              <Button type="submit" size="large" variant="contained">
                Save
              </Button>
            </StyledCardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default Settings;
