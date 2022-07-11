import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import AlertTesis from '../components/AlertTesis';
import {CircularProgress, useTheme} from "@mui/material";

const BCNotification = ( props ) => {

  const theme = useTheme()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      if (props.notify.type === 'success' || props.notify.type === 'error') {
        props.setNotify({
          ...props.notify,
          isOpen: false
        })
      }
      return;
    }

    props.setNotify({
      ...props.notify,
      isOpen: false
    })
  }

  return (
    <>
      <Snackbar
        open={props.notify.isOpen}
        onClose={handleClose}
        {...props}
      >
        <AlertTesis
          severity={props.notify.type}
          onClose={handleClose}
          sx={{ width: '100%' }}
          iconMapping={{
            info: <CircularProgress color='white' style={{width: '20px', height: '20px'}}/>,
          }}
        >
          {props.notify.message}
        </AlertTesis>
      </Snackbar>
    </>
  )
}
export default BCNotification;