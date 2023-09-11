import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
const formData = new FormData();
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  file: Yup.mixed().required('File attachment is required'),
});

const CreateForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      file: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here, including the file attachment
      console.log(values.file);
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
