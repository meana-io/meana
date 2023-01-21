import { NextPage } from 'next';
import * as yup from 'yup';
import {
  Card,
  Button,
  CardContent,
  CardHeader,
  Grid,
  CardActions,
  Typography,
  Slider,
  Box,
  TextField,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import Progress from '@/components/Progress/Progress';
import { styled } from '@mui/system';
import { useGetNodeSettings, useUpdateNodeSettings } from '@/api/settings';
import NoData from '@/components/NoData/NoData';
import DeleteNodeModal from './DeleteNodeModal';
import { useGetNode, useUpdateNode } from '@/api/nodes';

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const validationSchema = yup.object({
  name: yup.string().required('Node name is required'),
});

const Settings: NextPage = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  const { data: nodeSettings, isLoading } = useGetNodeSettings(nodeId);
  const { mutateAsync: updateNodeSettings } = useUpdateNodeSettings(nodeId);
  const { data: node, isLoading: isLoadingNode } = useGetNode(nodeId);
  const { mutateAsync: updateNodeName } = useUpdateNode();

  const onSubmit = async (values) => {
    const [ramMin, ramMax] = values.ram;
    const [cpuMin, cpuMax] = values.cpu;

    await updateNodeSettings({
      ramMin,
      ramMax,
      cpuMin,
      cpuMax,
    });
  };

  const updateNode = async (values) => {
    await updateNodeName({ name: values.name, nodeId });
  };

  if (isLoading || isLoadingNode) {
    return <Progress />;
  }

  return (
    <>
      {!nodeSettings && <NoData />}
      {nodeSettings && (
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
                      <StyledCardActions>
                        <Button type="submit" variant="contained">
                          Save
                        </Button>
                      </StyledCardActions>
                    </CardContent>
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
                      <StyledCardActions>
                        <Button type="submit" variant="contained">
                          Save
                        </Button>
                      </StyledCardActions>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <Box mt={4}>
        <Formik
          initialValues={{
            name: node.name,
          }}
          validationSchema={validationSchema}
          onSubmit={updateNode}
        >
          {({ values, touched, errors, handleChange }) => (
            <Form>
              <Card variant="outlined">
                <CardHeader title="Edit Node" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="node-name"
                        name="name"
                        label="Node name"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        disabled
                        fullWidth
                        id="node-uuid"
                        name="node-uuid"
                        label="Node UUID"
                        value={node?.uuid}
                        helperText="Cannot be changed"
                      />
                    </Grid>
                  </Grid>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button variant="contained" type="submit">
                      Update
                    </Button>
                    <DeleteNodeModal />
                  </CardActions>
                </CardContent>
              </Card>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Settings;
