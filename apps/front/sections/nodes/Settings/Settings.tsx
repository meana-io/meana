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
import { Formik, Form } from 'formik';
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

  const onSubmit = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Formik
      initialValues={{
        nodeId,
        diskCapacity: {
          uuid: '',
          minmax: [0, 50],
        },
        partitionCapacity: {
          uuid: '',
          minmax: [0, 50],
        },
        partitionUsedSpace: {
          uuid: '',
          minmax: [0, 50],
        },
        ram: {
          minmax: [0, 50],
        },
        cpu: {
          minmax: [0, 50],
        },
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Disk" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <FormControl fullWidth>
                        <InputLabel id="disk-label">Disk</InputLabel>
                        <Select
                          labelId="disk-label"
                          id="disk"
                          name="diskCapacity.uuid"
                          label="Disk"
                          value={values.diskCapacity.uuid}
                          onChange={handleChange}
                        >
                          {disksAndPartitions.map(({ name }, index) => (
                            <MenuItem key={index} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography gutterBottom>
                        Min and Max Disk Capacity:
                      </Typography>
                      <Slider
                        id="diskCapacity.minmax"
                        name="diskCapacity.minmax"
                        value={values.diskCapacity.minmax}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <StyledCardActions>
                  <Button type="submit" size="large" variant="contained" data-cy="SaveDisk">
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
                          label="Partition"
                          name="partitionCapacity.uuid"
                          value={values.partitionCapacity.uuid}
                          onChange={handleChange}
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
                      <Typography gutterBottom>
                        Min and Max Partition Capacity:
                      </Typography>
                      <Slider
                        id="partitionCapacity.minmax"
                        name="partitionCapacity.minmax"
                        value={values.partitionCapacity.minmax}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
                      />
                    </Grid>

                    <Grid item sm={12}>
                      <Typography gutterBottom>
                        Min and Max Partition Used Space:
                      </Typography>
                      <Slider
                        id="partitionUsedSpace.minmax"
                        name="partitionUsedSpace.minmax"
                        value={values.partitionUsedSpace.minmax}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
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
                      <Typography gutterBottom>
                        Min and Max RAM Usage:
                      </Typography>
                      <Slider
                        id="ram.minmax"
                        name="ram.minmax"
                        value={values.ram.minmax}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
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
                      <Typography gutterBottom>
                        Min and Max CUP Usage:
                      </Typography>
                      <Slider
                        id="cpu.minmax"
                        name="cpu.minmax"
                        value={values.cpu.minmax}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
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
        </Form>
      )}
    </Formik>
  );
};

export default Settings;
