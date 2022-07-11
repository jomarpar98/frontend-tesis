import React from 'react';
import MuiAlert from '@mui/material/Alert';

const AlterTesis = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default AlterTesis;