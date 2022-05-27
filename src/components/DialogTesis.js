import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

const DialogTesis = (props) => {
  const {onHide, visible} = props;
  const width = props.width ? props.width : '80%'

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: width, maxHeight: '80%' }}}
      open={visible}
      onClose={onHide}
    >
      <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white'}}>{props.title !== undefined ? props.title : ""}</DialogTitle>
      <DialogContent dividers >
        {props.children}
      </DialogContent>
    </Dialog>
  );
}

export default DialogTesis;