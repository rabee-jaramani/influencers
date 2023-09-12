import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
const formData = new FormData();
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.number(),
  checkbox1: Yup.boolean(),
  checkbox2: Yup.boolean(),
  file: Yup.mixed().required('File attachment is required'),
});

const CreateForm = () => {
  const [checkboxGroup, setCheckboxGroup] = useState({
    checkbox1: '',
    checkbox2: '',
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      checkbox1: '',
      checkbox2: '',
      file: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here, including the file attachment
      console.log('VVValues', values);
      console.log('checkbox from checkbox state', checkboxGroup.checkbox1);
      return;
      // Append the file to the FormData object
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('file', values.file);
      axios
        .post('https://server-for-crud.onrender.com/users/add_user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        })
        .then((response) => {
          console.log('Data sent successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    },
  });

  return (
    <div className="create-form-cont">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="filled"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Check Boxes</FormLabel>
              <FormGroup
                onChange={(e) => console.log('FROM Form Group', e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id="checkbox1"
                      name="checkbox1"
                      label="Checkbox1"
                      // onChange={formik.handleChange}
                      value={formik.values.checkbox1}
                      // error={
                      //   formik.touched.checkbox1 &&
                      //   Boolean(formik.errors.checkbox1)
                      // }
                      // helperText={
                      //   formik.touched.checkbox1 && formik.errors.checkbox1
                      // }
                      variant="filled"
                      size="small"
                    />
                  }
                  label="Checkbox1"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="checkbox2"
                      name="checkbox2"
                      label="Checkbox2"
                      // onChange={formik.handleChange}
                      value={formik.values.checkbox2}
                      error={
                        formik.touched.checkbox2 &&
                        Boolean(formik.errors.checkbox2)
                      }
                      helperText={
                        formik.touched.checkbox2 && formik.errors.checkbox2
                      }
                      variant="filled"
                      size="small"
                    />
                  }
                  label="Checkbox2"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <input
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                formik.setFieldValue('file', event.currentTarget.files[0]);
              }}
            />
            <label htmlFor="file">
              <Button variant="outlined" component="span">
                Attach File
              </Button>
            </label>
            {formik.errors.file && (
              <div style={{ color: 'red' }}>{formik.errors.file}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              // disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateForm;
