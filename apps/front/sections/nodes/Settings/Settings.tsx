import { NextPage } from 'next';
import {
  Card,
  Button,
  CardContent,
  CardHeader,
  Grid,
  CardActions,
  Typography,
  Slider,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import Progress from '@/components/Progress/Progress';
import { styled } from '@mui/system';
import { useGetNodeSettings, useUpdateNodeSettings } from '@/api/settings';
import NoData from '@/components/NoData/NoData';
import DeleteNodeModal from './DeleteNodeModal';

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const Settings: NextPage = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  const { data: nodeSettings, isLoading } = useGetNodeSettings(nodeId);
  const { mutateAsync } = useUpdateNodeSettings(nodeId);

  const onSubmit = async (values) => {
    const [ramMin, ramMax] = values.ram;
    const [cpuMin, cpuMax] = values.cpu;

    await mutateAsync({
      ramMin,
      ramMax,
      cpuMin,
      cpuMax,
    });
  };

  if (isLoading) {
    return <Progress />;
  }

  if (!nodeSettings) {
    return (
      <>
        <NoData />
        <DeleteNodeModal />
      </>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          ram: [nodeSettings.ramMin, nodeSettings.ramMax],
          cpu: [nodeSettings.cpuMin, nodeSettings.cpuMax],
        }}
        onSubmit={onSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardHeader title="RAM" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item sm={12}>
                        <Typography gutterBottom>
                          Min and Max RAM Usage:
                        </Typography>
                        <Slider
                          id="ram"
                          name="ram"
                          value={values.ram}
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
                <Card variant="outlined">
                  <CardHeader title="CPU" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item sm={12}>
                        <Typography gutterBottom>
                          Min and Max CPU Usage:
                        </Typography>
                        <Slider
                          id="cpu"
                          name="cpu"
                          value={values.cpu}
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
      <DeleteNodeModal />
    </>
  );
};

export default Settings;
