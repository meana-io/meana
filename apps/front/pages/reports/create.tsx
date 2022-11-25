import { Formik, Form, FieldArray, FormikProps, getIn } from 'formik';
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
import Progress from '@/components/Progress/Progress';
import { CreateNodeReport, useCreateNodeReport } from '@/api/nodeReports';
import { NodeReportProperty } from '@/types/nodeReport';

const validationSchema = Yup.object().shape({
  from: Yup.date().required('From is required'),
  to: Yup.date().required('To is required'),
  aggregatePeriod: Yup.string().required('Time agregation is required'),
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
  domain: string;
  propertyName: string;
}

const options: Option[] = [
  {
    group: 'Disk',
    label: 'Capacity',
    domain: 'node_disk',
    propertyName: 'capacity',
  },
  {
    group: 'Ram',
    label: 'Used',
    domain: 'node_ram',
    propertyName: 'used',
  },
  {
    group: 'Ram',
    label: 'Capacity',
    domain: 'node_ram',
    propertyName: 'total',
  },
  {
    group: 'Cpu',
    label: 'Usage',
    domain: 'node_cpu',
    propertyName: 'usage',
  },
];

const AGREGATION_PERIOD = [
  { label: 'Every Minute', value: 60 },
  { label: 'Every Hour', value: 60 * 60 },
  { label: 'Every 12h', value: 60 * 60 * 12 },
  { label: 'Every Day', value: 60 * 60 * 24 },
];

interface Property {
  nodeUuid: string;
  property: {
    domain: string;
    propertyName: string;
  };
}

const property: Property = {
  nodeUuid: '',
  property: {
    domain: '',
    propertyName: '',
  },
};

const initialValues: CreateNodeReport = {
  from: '',
  to: '',
  aggregatePeriod: 60,
  properties: [property],
};

const CreaetReport: NextPage = () => {
  const { data: nodes, isLoading } = useGetNodesList();
  const { data: report, mutateAsync } = useCreateNodeReport();

  const onSubmit = async (values) => {
    const data = {
      ...values,
      properties: values.properties.reduce((arr, el) => {
        return [
          ...arr,
          ...el.property.map(({ domain, propertyName }) => ({
            nodeUuid: el.nodeUuid,
            property: { domain, propertyName },
          })),
        ];
      }, []),
    };

    await mutateAsync(data);
  };

  if (isLoading) {
    return <Progress />;
  }

  return (
    <ReportsLayout>
      <pre>{JSON.stringify(report, null, 2)}</pre>
      <Formik
        initialValues={initialValues}
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
        }: FormikProps<CreateNodeReport>) => (
          <Form>
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
                            onClick={() => push(property)}
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
                            <InputLabel id="agregation-period">
                              Agregation Period
                            </InputLabel>
                            <Select
                              labelId="agregation-period"
                              label="Agregation Period"
                              name="aggregatePeriod"
                              value={values.aggregatePeriod}
                              onChange={handleChange}
                              error={
                                touched.aggregatePeriod &&
                                Boolean(errors.aggregatePeriod)
                              }
                              onBlur={handleBlur}
                            >
                              {AGREGATION_PERIOD.map(({ label, value }) => (
                                <MenuItem key={value} value={value}>
                                  {label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      {values.properties.map((_, index) => (
                        <Grid key={index} item container spacing={2}>
                          <Grid item xs={4}>
                            <FormControl fullWidth>
                              <InputLabel id="node-id">Node</InputLabel>
                              <Select
                                labelId="node-id"
                                label="Node"
                                name={`properties[${index}].nodeUuid`}
                                value={values.properties.at(index).nodeUuid}
                                onChange={handleChange}
                                error={
                                  getIn(
                                    touched,
                                    `properties[${index}].nodeUuid`
                                  ) &&
                                  !!getIn(
                                    errors,
                                    `properties[${index}].nodeUuid`
                                  )
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
                                values.properties.at(index).property =
                                  value.map(({ domain, propertyName }) => ({
                                    domain,
                                    propertyName,
                                  })) as NodeReportProperty[];
                              }}
                              isOptionEqualToValue={(
                                option: Option,
                                selected: Option
                              ) =>
                                `${option.domain}.${option.propertyName}` ===
                                `${selected.domain}.${selected.propertyName}`
                              }
                              multiple
                              disableCloseOnSelect
                              options={options}
                              groupBy={(option: Option) => option.group}
                              getOptionLabel={(option: Option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Properties"
                                  value={values.properties.at(index).property}
                                  name={`properties[${index}].properties`}
                                  error={
                                    getIn(
                                      touched,
                                      `properties[${index}].properties`
                                    ) &&
                                    !!getIn(
                                      errors,
                                      `properties[${index}].properties`
                                    )
                                  }
                                  helperText={
                                    getIn(
                                      touched,
                                      `properties[${index}].properties`
                                    ) &&
                                    getIn(
                                      errors,
                                      `properties[${index}].properties`
                                    )
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
