import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { NextPage } from 'next';
import { Add as AddIcon } from '@mui/icons-material';
import ReportsLayout from '@/layouts/Reports/ReportsLayout';

const validationSchema = Yup.object().shape({
  from: Yup.date().required('From is required'),
  to: Yup.date().required('From is required'),
  timeAgregation: Yup.string().required('From is required'),
  tickets: Yup.array().of(
    Yup.object().shape({
      nodeId: Yup.string().required('Node is required'),
      property: Yup.string().required('Property is required'),
    })
  ),
});

const Reports: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      timeAgregation: '',
      values: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <ReportsLayout>
      <Grid container spacing={2}>
        <Grid item>
          <Button size="large" variant="contained" startIcon={<AddIcon />}>
            Add Field
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="From"
            type="datetime-local"
            name="from"
            defaultValue={new Date()}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.from}
            onChange={formik.handleChange}
            error={formik.touched.from && Boolean(formik.errors.from)}
            helperText={formik.touched.from && formik.errors.from}
          />
        </Grid>
        <Grid item>
          <TextField
            label="To"
            type="datetime-local"
            name="to"
            defaultValue={new Date()}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.from}
            onChange={formik.handleChange}
            error={formik.touched.from && Boolean(formik.errors.from)}
            helperText={formik.touched.from && formik.errors.from}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="time-agragation">Time agregation</InputLabel>
            <Select labelId="time-agragation" label="Time agregation">
              <MenuItem value={10}>Every Minute</MenuItem>
              <MenuItem value={20}>Evey Hour</MenuItem>
              <MenuItem value={30}>Every Day</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl>
            <InputLabel id="time-agragation">Time agregation</InputLabel>
            <Select labelId="time-agragation" label="Time agregation">
              <MenuItem value={10}>Every Minute</MenuItem>
              <MenuItem value={20}>Evey Hour</MenuItem>
              <MenuItem value={30}>Every Day</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="time-agragation">Time agregation</InputLabel>
            <Select labelId="time-agragation" label="Time agregation">
              <MenuItem value={10}>Every Minute</MenuItem>
              <MenuItem value={20}>Evey Hour</MenuItem>
              <MenuItem value={30}>Every Day</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ReportsLayout>
  );
};

export default Reports;
