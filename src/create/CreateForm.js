import React, { useState } from 'react';
import { useFormik } from 'formik';
import ag_logo from './ag_logo.svg';

import * as Yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
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
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [form_error_label, setForm_error_label] = useState('');
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
      setSubmitting(true);
      console.log(
        'typeof(values.checkboxes)',
        JSON.stringify(values.checkboxes)
      );
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('checkboxes', JSON.stringify(values.checkboxes));
      formData.append('dropdown', values.dropdown);
      formData.append('radio', values.radio);
      formData.append('file1', values.attachment1);
      formData.append('file2', values.attachment2);
      axios
        .post('http://localhost:5000/users/add_user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        })
        .then((response) => {
          console.log('Data sent successfully:', response.data);
          // console.log('Data sent successfully:',JSON.parse(response.data.checkboxes).option1);
          setSubmitting(false);
          setSent(true);
          setForm_error_label('Your data has been sent successfuly, Thanks 😊');
        })
        .catch((error) => {
          console.error('Error sending data:', error);
          setSubmitting(false);
          setSent(false);
          setForm_error_label(
            'Something went wrong 😞, please refresh the page and try again'
          );
        });
    },
  });

  return (
    <div className="create-form-cont">
      <div className="form-header-1">
        <img src={ag_logo} alt="appaerl group" />
      </div>
      <div className="form-header-2">
        <p>
          Thank you for your interest in Apparel Group
          <br />
          By providing this information, you'll help us offer you a more
          personalized experience.
        </p>
      </div>
      <div className="form-div">
        <Container>
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

            <FormGroup
              onChange={formik.handleChange}
              value={formik.values.checkboxes}
              error={
                formik.touched.checkboxes && Boolean(formik.errors.checkboxes)
              }
              helperText={formik.touched.checkboxes && formik.errors.checkboxes}
            >
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

            <FormControl
              variant="outlined"
              fullWidth
              margin="none"
              size="small"
            >
              <FormLabel>Select an option:</FormLabel>
              <Select
                id="dropdown"
                name="dropdown"
                value={formik.values.dropdown}
                onChange={formik.handleChange}
                label="Dropdown"
                error={
                  formik.touched.dropdown && Boolean(formik.errors.dropdown)
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="option1"> Option 1 </MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
            <Space />

            <FormControl
              component="fieldset"
              fullWidth
              margin="none"
              size="small"
            >
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
                <label className="label-att-btn" htmlFor="attachment1">
                  <Button
                    variant="contained"
                    component="span"
                    // color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
                <Typography marginLeft="8px" fontSize="12px">
                  {formik.values.attachment1?.name}
                </Typography>
              </Box>
              {formik.touched.attachment1 && formik.errors.attachment1 && (
                <Typography variant="body2">
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
                <label className="label-att-btn" htmlFor="attachment2">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
                <Typography variant="body2" marginLeft="8px" fontSize="12px">
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
              startIcon={sent ? <MarkEmailReadIcon /> : <SendIcon />}
              fullWidth
              className="submit-btn"
              disabled={submitting ? true : sent ? true : false}
            >
              {submitting ? 'Submitting...' : sent ? 'Sent' : 'Submit'}
            </Button>
            <p
              className={`form-status-label ${
                sent ? ' sent-label' : ' not-sent-label'
              }`}
            >
              {form_error_label}
            </p>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default CreateForm;
