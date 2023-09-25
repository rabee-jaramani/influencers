import { TextField } from '@mui/material';
import React from 'react';

export default function Email(props) {
  return (
    <div>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        value={props.formik.values.email}
        onChange={props.formik.handleChange}
        error={props.formik.touched.email && Boolean(props.formik.errors.email)}
        helperText={props.formik.touched.email && props.formik.errors.email}
        margin="none"
        size="small"
      />
    </div>
  );
}
