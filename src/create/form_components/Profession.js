import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

export default function Profession(props) {
  return (
    <div>
      <FormControl fullWidth margin="none" size="small">
        <InputLabel id="demo-simple-select-helper-label">Profession</InputLabel>
        <Select
          id="profession"
          name="profession"
          value={props.formik.values.profession}
          onChange={props.formik.handleChange}
          label="Profession"
          error={
            props.formik.touched.profession &&
            Boolean(props.formik.errors.profession)
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Model"> Model </MenuItem>
          <MenuItem value="Influencer"> Influencer </MenuItem>
          <MenuItem value="Presenter">Presenter</MenuItem>
          <MenuItem value="Host / Promoter">Host / Promoter</MenuItem>
          <MenuItem value="Extreme">Extreme</MenuItem>
          <MenuItem value="Performer">Performer</MenuItem>
          <MenuItem value="Actor">Actor</MenuItem>
          <MenuItem value="Voice Over">Voice Over</MenuItem>
        </Select>
        <FormHelperText className="Mui-error">
          {props.formik.errors.profession}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
