import { Formik, Form, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import {
  Box,
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
import { useCreateNodeReport } from '@/api/nodeReports';
import ReportViewer from 'sections/reports/ReportViewer';
import NoData from '@/components/NoData/NoData';

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

const AGREGATION_PERIOD = [
  { label: 'Every 15 minuts ', value: 60 * 15 },
  { label: 'Every hour', value: 60 * 60 },
  { label: 'Every 12h', value: 60 * 60 * 12 },
  { label: 'Every day', value: 60 * 60 * 24 },
];

const AGGREGATION_TYPES = ['min', 'max', 'avg', ''];
interface Property {
  nodeUuid: string;
  property: {
    domain: string;
    propertyName: string;
    aggregationType: 'min' | 'max' | 'avg' | '';
  };
}

const property: Property = {
  nodeUuid: '',
  property: {
    domain: '',
    propertyName: '',
    aggregationType: '',
  },
};

const options: Option[] = [
  {
    group: 'Disk Partition',
    label: 'Used space',
    domain: 'node_disk_partitions',
    propertyName: 'usedSpace',
  },
  {
    group: 'Ram',
    label: 'Used',
    domain: 'node_rams',
    propertyName: 'used',
  },
  {
    group: 'Ram',
    label: 'Capacity',
    domain: 'node_rams',
    propertyName: 'total',
  },
  {
    group: 'Cpu',
    label: 'Usage',
    domain: 'node_cpu',
    propertyName: 'usage',
  },
  {
    group: 'Cpu',
    label: 'Cores',
    domain: 'node_cpu',
    propertyName: 'coresQuantity',
  },
  {
    group: 'Cpu',
    label: 'Frequency',
    domain: 'node_cpu',
    propertyName: 'frequency',
  },
];

const initialValues = {
  from: '',
  to: '',
  aggregatePeriod: 3600,
  properties: [property],
};

const CreaetReport: NextPage = () => {
  const { data: nodes, isLoading } = useGetNodesList();
  const { data: reports, mutateAsync } = useCreateNodeReport();

  const onSubmit = async (values) => {
    const data = {
      ...values,
      properties: values.properties.reduce((arr, { nodeUuid, property }) => {
        const [domain, propertyName] = property.propertyName.split('.');
        return [
          ...arr,
          {
            nodeUuid,
            property: {
              ...property,
              domain,
              propertyName,
            },
          },
        ];
      }, []),
    };

    await mutateAsync(data);
  };

  if (isLoading) {
    return <Progress />;
  }

  if (!nodes) {
    return <NoData />;
  }

  return (
    <ReportsLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <Card variant="outlined">
              <CardHeader title="Reports" />
              <CardContent>
                <FieldArray name="properties">
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
                            data-cy="date-from"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.from}
                            onChange={handleChange}
                            error={touched.from && Boolean(errors.from)}
                            // helperText={touched.from && errors.from}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="To"
                            type="datetime-local"
                            name="to"
                            data-cy="date-to"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.to}
                            onChange={handleChange}
                            error={touched.to && Boolean(errors.to)}
                            // helperText={touched.to && errors.to}
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
                      {values.properties.map((_, index) => {
                        return (
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
                              <FormControl fullWidth>
                                <InputLabel id="property">Property</InputLabel>
                                <Select
                                  labelId="property"
                                  label="Property"
                                  name={`properties[${index}].property.propertyName`}
                                  onChange={handleChange}
                                  error={
                                    getIn(
                                      touched,
                                      `properties[${index}].property.propertyName`
                                    ) &&
                                    !!getIn(
                                      errors,
                                      `properties[${index}].property.propertyName`
                                    )
                                  }
                                  onBlur={handleBlur}
                                >
                                  <MenuItem value=""></MenuItem>
                                  {options.map(
                                    ({
                                      group,
                                      label,
                                      domain,
                                      propertyName,
                                    }) => (
                                      <MenuItem
                                        key={`${domain}.${propertyName}`}
                                        value={`${domain}.${propertyName}`}
                                      >
                                        {group} - {label}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                              <FormControl fullWidth>
                                <InputLabel id="aggregation-type">
                                  Aggregation Type
                                </InputLabel>
                                <Select
                                  labelId="aggregation-type"
                                  label="Aggregation Type"
                                  name={`properties[${index}].property.aggregationType`}
                                  onChange={handleChange}
                                  error={
                                    getIn(
                                      touched,
                                      `properties[${index}].property.aggregationType`
                                    ) &&
                                    !!getIn(
                                      errors,
                                      `properties[${index}].property.aggregationType`
                                    )
                                  }
                                  onBlur={handleBlur}
                                >
                                  <MenuItem value=""></MenuItem>
                                  {AGGREGATION_TYPES.map((type) => (
                                    <MenuItem key={type} value={type}>
                                      {type}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
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
                        );
                      })}
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
                  data-cy="run"
                >
                  Run
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      {/* @ts-ignore:next-line */}
      <Box mt={2}>{reports && <ReportViewer reports={reports} />}</Box>
    </ReportsLayout>
  );
};

export default CreaetReport;
