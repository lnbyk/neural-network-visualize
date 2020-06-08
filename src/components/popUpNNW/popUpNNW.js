import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";

export default function FormDialog(props) {

  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [LayerSizes, setLayerSizes] = React.useState('');

  const changeLayerSizes = (e) => {
    setLayerSizes(e.target.value);
   // alert(LayerSizes);
  }
  const handleClickOpen = () => {
    setOpen(true);
   
  };

  const handleClose = (e) => {
    setOpen(false);
    props.LayerSizes(LayerSizes);
   // history.push("/");
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.modalName}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter layerSize in order and seperated by comma
            e.g: 2,3,3,2
            Will create a NNW with 2 hiden layer and 2 input and 2 output
          </DialogContentText>
          <textarea rows="10" cols="60"
            autoFocus
            margin="dense"
            id="name"
            label="LayerSize"
            type="email"
            onChange={changeLayerSizes}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}