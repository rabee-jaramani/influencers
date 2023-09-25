import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { countries_list } from './countries_list';
export default function Nationality(props) {
  const top100Films = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  useEffect(() => {
    // console.log('props', props.formik.values);
  });

  return (
    <div>
      <Autocomplete
        margin="none"
        size="small"
        id="nationality"
        name="nationality"
        options={countries_list}
        getOptionLabel={(option) => option.name}
        value={props.formik.values.nationality}
        onChange={(event, newValue) => {
          props.formik.setFieldValue('nationality', newValue);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            label="Nationality"
            variant="outlined"
            fullWidth
            error={
              props.formik.touched.nationality &&
              Boolean(props.formik.errors.nationality)
            }
            helperText={
              props.formik.touched.nationality &&
              props.formik.errors.nationality
            }
          />
        )}
      />

      {/* <Autocomplete
        disablePortal
        id="nationality"
        options={countries}
        renderInput={(params) => <TextField {...params} label="Nationality" />}
        name="nationality"
        value={props.formik.values.nationality}
        onChange={props.formik.handleChange}
        // label="Nationality"
        error={
          props.formik.touched.nationality &&
          Boolean(props.formik.errors.nationality)
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
      /> */}
      {/* <FormControl variant="outlined" fullWidth margin="none" size="small">
        <Autocomplete
          id="nationality"
          label="nationality"
          value={props.formik.values.nationality}
          onChange={props.formik.handleChange}
          error={
            props.formik.touched.nationality &&
            Boolean(props.formik.errors.nationality)
          }
          options={countries}
          //   freeSolo={true}
          renderInput={(params) => (
            <TextField
              {...params}
              label="nationality"
              variant="outlined"
              fullWidth
              value={null}
            />
          )}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </FormControl> */}
    </div>
  );
}
