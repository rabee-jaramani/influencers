import { TextField } from '@mui/material';
import React from 'react';

export default function Name(props) {
  return (
    <div>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        value={props.formik.values.name}
        onChange={props.formik.handleChange}
        error={props.formik.touched.name && Boolean(props.formik.errors.name)}
        helperText={props.formik.touched.name && props.formik.errors.name}
        margin="none"
        size="small"
      />
    </div>
  );
}
