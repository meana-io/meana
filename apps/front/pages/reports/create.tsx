import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { NextPage } from 'next';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import ReportsLayout from '@/layouts/Reports/ReportsLayout';
import { useGetNodesList } from '@/api/nodes';

const validationSchema = Yup.object().shape({
  from: Yup.date().required('From is required'),
  to: Yup.date().required('To is required'),
  timeAgregation: Yup.string().required('Time agregation is required'),
  reports: Yup.array().of(
    Yup.object()
      .shape({
        nodeId: Yup.string().required('Node is required'),
        properties: Yup.array()
          .of(Yup.string())
          .min(1, 'At least 1 property is required')
          .required('Properties are required'),
      })
      .required('Node and Properties are required')
  ),
});

interface Option {
  group: string;
  label: string;
  value: string | number;
}

interface Report {
  nodeId: string;
  properties: string;
}

interface Values {
  from: string;
  to: string;
  timeAgregation: string;
  reports: Report[];
}

const report = {
  nodeId: '',
  properties: [],
};

const options = [
  { group: 'Disk', label: 'Memory', value: '  memory' },
  { group: 'Disk', label: 'Capacity', value: 'capacity' },
  { group: 'Disk', label: 'Usage', value: 'usage' },
  { group: 'Disk', label: 'Producent', value: 'producent' },
  { group: 'Disk', label: 'Factory', value: 'factory' },
];

const CreaetReport: NextPage = () => {
  const { data: nodes, isLoading } = useGetNodesList();

  const onSubmit = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ReportsLayout>
      <Formik
        initialValues={{
          from: '',
          to: '',
          timeAgregation: '',
          reports: [report],
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          isValid,
          isSubmitting,
          handleBlur,
        }) => (
          <Form>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <Card>
              <CardHeader title="Reports" />
              <CardContent>
                <FieldArray name="reports">
                  {({ push, remove }) => (
                    <Grid container spacing={2}>
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => push(report)}
                          >
                            Add Field
                          </Button>
                        </Grid>
                        <Grid item>
                          <TextField
                            label="From"
                            type="datetime-local"
                            name="from"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.from}
                            onChange={handleChange}
                            error={touched.from && Boolean(errors.from)}
                            helperText={touched.from && errors.from}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="To"
                            type="datetime-local"
                            name="to"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.to}
                            onChange={handleChange}
                            error={touched.to && Boolean(errors.to)}
                            helperText={touched.to && errors.to}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth>
                            <InputLabel id="time-agragation">
                              Time agregation
                            </InputLabel>
                            <Select
                              labelId="time-agragation"
                              label="Time agregation"
                              name="timeAgregation"
                              value={values.timeAgregation}
                              onChange={handleChange}
                              error={
                                touched.timeAgregation &&
                                Boolean(errors.timeAgregation)
                              }
                              helperText={
                                touched.timeAgregation && errors.timeAgregation
                              }
                              onBlur={handleBlur}
                            >
                              <MenuItem value={10}>Every Minute</MenuItem>
                              <MenuItem value={10}>Every Minute</MenuItem>
                              <MenuItem value={20}>Evey Hour</MenuItem>
                              <MenuItem value={30}>Every Day</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      {values.reports.map((_, index) => (
                        <Grid key={index} item container spacing={2}>
                          <Grid item xs={4}>
                            <FormControl fullWidth>
                              <InputLabel id="node-id">Node</InputLabel>
                              <Select
                                labelId="node-id"
                                label="Node"
                                name={`reports[${index}].nodeId`}
                                value={values.reports.at(index).nodeId}
                                onChange={handleChange}
                                error={
                                  touched.reports?.at(index)?.nodeId &&
                                  Boolean(errors.reports?.at(index)?.nodeId)
                                }
                                helperText={
                                  touched.reports?.at(index)?.nodeId &&
                                  errors.reports?.at(index)?.nodeId
                                }
                                onBlur={handleBlur}
                              >
                                {nodes.map(({ uuid, name }) => (
                                  <MenuItem key={uuid} value={uuid}>
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <Autocomplete
                              onChange={(_, value: Option[]) => {
                                values.reports.at(index).properties = value.map(
                                  ({ value }) => value
                                );
                              }}
                              isOptionEqualToValue={(
                                option: Option,
                                value: Option
                              ) => option.value === value.value}
                              multiple
                              disableCloseOnSelect
                              options={options}
                              groupBy={(option: Option) => option.group}
                              getOptionLabel={(option: Option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Properties"
                                  value={values.reports.at(index).properties}
                                  name={`reports[${index}].properties`}
                                  error={
                                    touched.reports?.at(index)?.properties &&
                                    Boolean(
                                      errors.reports?.at(index)?.properties
                                    )
                                  }
                                  helperText={
                                    touched.reports?.at(index)?.properties &&
                                    errors.reports?.at(index)?.properties
                                  }
                                  onBlur={handleBlur}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              size="large"
                              color="error"
                              onClick={() => remove(index)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  color="secondary"
                  size="large"
                  variant="contained"
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </ReportsLayout>
  );
};

export default CreaetReport;
