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

const Settings: NextPage = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  const { data: disksAndPartitions, isLoading } =
    useGetNodeDisksAndPartitions(nodeId);

  const formik = useFormik({
    initialValues: {
      disk: '',
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
                  label="Email"
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
            </CardContent>
            <CardActions>
              <Box
                p={2}
                display="flex"
                sx={{ width: '100%' }}
                justifyContent="flex-end"
              >
                <Button size="large" variant="contained">
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
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Partition
              </Typography>
              <Select>
                <MenuItem value={10}>Ala</MenuItem>
                <MenuItem value={20}>Ma</MenuItem>
                <MenuItem value={30}>Kota</MenuItem>
              </Select>
            </CardContent>
            <CardActions>
              <Box
                p={2}
                display="flex"
                sx={{ width: '100%' }}
                justifyContent="flex-end"
              >
                <Button size="large" variant="contained">
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
                  defaultValue={50}
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
                <Button size="large" variant="contained">
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
                  defaultValue={50}
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
                <Button size="large" variant="contained">
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
