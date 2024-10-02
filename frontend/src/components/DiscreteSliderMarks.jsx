import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '',
  },
  {
    value: 20,
    label: '25',
  },
  {
    value: 37,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks({ value, onChange }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        value={value} // Use the value from props
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, newValue) => onChange(newValue)} // Call the onChange prop with the new value
      />
    </Box>
  );
}
