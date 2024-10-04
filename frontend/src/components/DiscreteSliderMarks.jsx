import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks({ value, onChange, min = 0, max = 100, step = 10, marks = [] }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        value={value}
        getAriaValueText={valuetext}
        step={step}
        min={min} 
        max={max} 
        valueLabelDisplay="auto"
        marks={marks} 
        onChange={(e, newValue) => onChange(newValue)} 
      />
    </Box>
  );
}
