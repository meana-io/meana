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
import { useGetNodeDisksAndPartitions } from '@/api/disks';
import { useEffect, useState } from 'react';
import useIsMobile from '@/hooks/isMobile';
import { blueGrey } from '@mui/material/colors';

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

const AGGREGATION_TYPES = ['min', 'max', 'avg'];
interface Property {
  nodeUuid: string;
  diskIdentifier: string;
  property: {
    domain: string;
    propertyName: string;
    aggregationType: 'min' | 'max' | 'avg';
  };
}

const property: Property = {
  nodeUuid: '',
  diskIdentifier: '',
  property: {
    domain: '',
    propertyName: '',
    aggregationType: 'min',
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
];

const initialValues = {
  from: '',
  to: '',
  aggregatePeriod: 3600,
  properties: [property],
};

const CreaetReport: NextPage = () => {
  const isMobile = useIsMobile();
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const { data: nodes, isLoading } = useGetNodesList();
  const { data: reports, mutateAsync } = useCreateNodeReport();
  const {
    data: disks,
    isLoading: isLoadingDisks,
    refetch,
  } = useGetNodeDisksAndPartitions(selectedNodeId, {
    enabled: false,
  });

  const onSubmit = async (values) => {
    const data = {
      ...values,
      properties: values.properties.reduce(
        (arr, { nodeUuid, diskIdentifier, property }) => {
          const [domain, propertyName] = property.propertyName.split('.');
          return [
            ...arr,
            {
              nodeUuid,
              diskIdentifier,
              property: {
                ...property,
                domain,
                propertyName,
              },
            },
          ];
        },
        []
      ),
    };

    await mutateAsync(data);
  };

  useEffect(() => {
    if (selectedNodeId !== '') {
      refetch();
    }
  }, [selectedNodeId, refetch]);

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
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="From"
                            type="datetime-local"
                            name="from"
                            fullWidth
                            data-cy="date-from"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.from}
                            onChange={handleChange}
                            error={touched.from && Boolean(errors.from)}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="To"
                            type="datetime-local"
                            name="to"
                            fullWidth
                            data-cy="date-to"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.to}
                            onChange={handleChange}
                            error={touched.to && Boolean(errors.to)}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel id="agregation-period">
                              Agregation Period
                            </InputLabel>
                            <Select
                              required
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
                            <Grid item xs={12} md={6} lg={3}>
                              <FormControl fullWidth>
                                <InputLabel id="node-id">Node</InputLabel>
                                <Select
                                  required
                                  labelId="node-id"
                                  label="Node"
                                  name={`properties[${index}].nodeUuid`}
                                  value={values.properties.at(index).nodeUuid}
                                  onChange={(e) => {
                                    handleChange(e);
                                    setSelectedNodeId(e.target.value);
                                  }}
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

                            <Grid item xs={12} md={6} lg={3}>
                              <FormControl fullWidth>
                                <InputLabel id="property">Property</InputLabel>
                                <Select
                                  required
                                  labelId="property"
                                  label="Property"
                                  name={`properties[${index}].property.propertyName`}
                                  onChange={(e) => {
                                    handleChange(e);
                                    const { value } = e.target;
                                    if (value !== 'node_disk_partitions') {
                                      delete values.properties.at(index)
                                        .diskIdentifier;
                                    }
                                  }}
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

                            {values.properties
                              .at(index)
                              .property.propertyName.includes(
                                'node_disk_partitions'
                              ) && (
                              <Grid item xs={12} md={6} lg={2}>
                                <FormControl fullWidth>
                                  <InputLabel id="partition">
                                    Partition
                                  </InputLabel>
                                  <Select
                                    required
                                    labelId="partition"
                                    label="partition"
                                    name={`properties[${index}].diskIdentifier`}
                                    onChange={handleChange}
                                    error={
                                      getIn(
                                        touched,
                                        `properties[${index}].diskIdentifier`
                                      ) &&
                                      !!getIn(
                                        errors,
                                        `properties[${index}].diskIdentifier`
                                      )
                                    }
                                    onBlur={handleBlur}
                                  >
                                    {Array.isArray(disks) &&
                                      disks?.map(({ name, partitions }) => {
                                        return partitions?.map(
                                          ({ path, diskIdentifier }) => (
                                            <MenuItem
                                              key={`${path}.${diskIdentifier}`}
                                              value={`${path}.${diskIdentifier}`}
                                            >
                                              {name} - {path}
                                            </MenuItem>
                                          )
                                        );
                                      })}
                                  </Select>
                                </FormControl>
                              </Grid>
                            )}

                            <Grid item xs={12} md={6} lg={3}>
                              <FormControl fullWidth>
                                <InputLabel id="aggregation-type">
                                  Aggregation Type
                                </InputLabel>
                                <Select
                                  required
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
                                  {AGGREGATION_TYPES.map((type, index) => (
                                    <MenuItem
                                      key={`${index}-${type}`}
                                      value={type}
                                    >
                                      {type}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} alignItems="center">
                              <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                color="error"
                                onClick={() => remove(index)}
                              >
                                <CloseIcon />
                              </Button>
                            </Grid>
                            <Box
                              sx={{
                                marginLeft: 2,
                                marginY: 2,
                                width: '100%',
                                height: 2,
                                backgroundColor: blueGrey['100'],
                              }}
                            />
                          </Grid>
                        );
                      })}

                      <Grid item xs={12} lg={2}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={<AddIcon />}
                          onClick={() => push(property)}
                        >
                          Add Field
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </FieldArray>
                <CardActions>
                  <Grid container>
                    <Grid item xs={12} lg={2}>
                      <Button
                        fullWidth
                        type="submit"
                        color="secondary"
                        size="large"
                        variant="contained"
                        data-cy="run"
                      >
                        Run
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </CardContent>
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
