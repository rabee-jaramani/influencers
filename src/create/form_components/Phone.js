import { TextField } from '@mui/material';
import React from 'react';

export default function Phone(props) {
  return (
    <div>
      <TextField
        fullWidth
        id="phone"
        name="phone"
        label="Phone"
        variant="outlined"
        value={props.formik.values.phone}
        onChange={props.formik.handleChange}
        error={props.formik.touched.phone && Boolean(props.formik.errors.phone)}
        helperText={props.formik.touched.phone && props.formik.errors.phone}
        margin="none"
        size="small"
      />
    </div>
  );
}
