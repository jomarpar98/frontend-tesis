import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const RadioGrouoTesis = ( props ) => {

  return (
    <FormControl>
      <RadioGroup
        row
        value={props.value}
        onChange={props.onChange}
      >
        {props.values && props.values.map(val => (
          <FormControlLabel value={val} control={<Radio />} label={val.charAt(0).toUpperCase() + val.slice(1)} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default RadioGrouoTesis;