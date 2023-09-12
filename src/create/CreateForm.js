import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
  Button,
  FormGroup,
  Box,
  Input,
} from '@mui/material';
import axios from 'axios';
import Space from './Space';
const formData = new FormData();

const CreateForm = () => {
  //     // Append the file to the FormData object

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    checkboxes: {
      option1: false,
      option2: false,
      option3: false,
    },
    dropdown: '',
    radio: '',
    attachment1: null,
    attachment2: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    dropdown: Yup.string().required('Please select an option'),
    radio: Yup.string().required('Please select a radio option'),
    attachment1: Yup.mixed()
      .test('fileSize', 'File size is too large', (value) => {
        if (!value) return true; // No file selected, so no error
        return value.size <= 5242880; // 5 MB maximum file size
      })
      .nullable(),
    attachment2: Yup.mixed()
      .test('fileSize', 'File size is too large', (value) => {
        if (!value) return true; // No file selected, so no error
        return value.size <= 5242880; // 5 MB maximum file size
      })
      .nullable(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.email);
      formData.append('checkboxes', values.checkboxes);
      formData.append('dropdown', values.dropdown);
      formData.append('radio', values.radio);
      formData.append('file1', values.attachment1);
      formData.append('file2', values.attachment2);
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
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Formik Form with Yup Validation
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="none"
            size="small"
          />
          <Space />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="none"
            size="small"
          />
          <Space />

          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            variant="outlined"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="none"
            size="small"
          />
          <Space />

          <FormGroup>
            <FormLabel>Checkboxes</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  id="option1"
                  name="checkboxes.option1"
                  checked={formik.values.checkboxes.option1}
                  onChange={formik.handleChange}
                  color="primary"
                  size="small"
                />
              }
              label="Option 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="option2"
                  name="checkboxes.option2"
                  checked={formik.values.checkboxes.option2}
                  onChange={formik.handleChange}
                  color="primary"
                  size="small"
                />
              }
              label="Option 2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="option3"
                  name="checkboxes.option3"
                  checked={formik.values.checkboxes.option3}
                  onChange={formik.handleChange}
                  color="primary"
                  size="small"
                />
              }
              label="Option 3"
            />
          </FormGroup>
          <Space />

          <FormControl variant="outlined" fullWidth margin="none">
            <FormLabel>Select an option:</FormLabel>
            <Select
              id="dropdown"
              name="dropdown"
              value={formik.values.dropdown}
              onChange={formik.handleChange}
              label="Dropdown"
              error={formik.touched.dropdown && Boolean(formik.errors.dropdown)}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>
          <Space />

          <FormControl component="fieldset" fullWidth margin="none">
            <FormLabel>Select a radio option:</FormLabel>
            <RadioGroup
              id="radio"
              name="radio"
              value={formik.values.radio}
              onChange={formik.handleChange}
              error={formik.touched.radio && Boolean(formik.errors.radio)}
            >
              <FormControlLabel
                value="radioOption1"
                control={<Radio size="small" />}
                label="Radio Option 1"
              />
              <FormControlLabel
                value="radioOption2"
                control={<Radio size="small" />}
                label="Radio Option 2"
              />
              <FormControlLabel
                value="radioOption3"
                control={<Radio size="small" />}
                label="Radio Option 3"
              />
            </RadioGroup>
          </FormControl>
          <Space />

          <FormControl component="fieldset" fullWidth margin="none">
            <FormLabel>Attachment 1:</FormLabel>
            <Box display="flex" alignItems="center">
              <Input
                type="file"
                id="attachment1"
                name="attachment1"
                onChange={(event) =>
                  formik.setFieldValue(
                    'attachment1',
                    event.currentTarget.files[0]
                  )
                }
                style={{ display: 'none' }}
              />
              <label htmlFor="attachment1">
                <Button
                  variant="contained"
                  component="span"
                  // color="default"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
              <Typography
                variant="body2"
                // color="textSecondary"
                marginLeft="8px"
              >
                {formik.values.attachment1?.name}
              </Typography>
            </Box>
            {formik.touched.attachment1 && formik.errors.attachment1 && (
              <Typography
                variant="body2"
                // color="error"
              >
                {formik.errors.attachment1}
              </Typography>
            )}
          </FormControl>
          <Space />

          <FormControl component="fieldset" fullWidth margin="none">
            <FormLabel>Attachment 2:</FormLabel>
            <Box display="flex" alignItems="center">
              <Input
                type="file"
                id="attachment2"
                name="attachment2"
                onChange={(event) =>
                  formik.setFieldValue(
                    'attachment2',
                    event.currentTarget.files[0]
                  )
                }
                style={{ display: 'none' }}
              />
              <label htmlFor="attachment2">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
              <Typography
                variant="body2"
                color="textSecondary"
                marginLeft="8px"
              >
                {formik.values.attachment2?.name}
              </Typography>
            </Box>
            {formik.touched.attachment2 && formik.errors.attachment2 && (
              <Typography variant="body2" color="error">
                {formik.errors.attachment2}
              </Typography>
            )}
          </FormControl>
          <Space />
          <Space />
          <Space />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SendIcon />}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CreateForm;
