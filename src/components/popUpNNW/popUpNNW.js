import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

export default function FormDialog(props) {
  console.log(props);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [LayerSizes, setLayerSizes] = React.useState("");
  const [Epochs, setEpochs] = React.useState("");

  const changeLayerSizes = (e) => {
    setLayerSizes(e.target.value);
    // alert(LayerSizes);
  };

  const changeTrainingEpochs = (e) => {
    setEpochs(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    props.ccccccccc(Epochs);
    props.LayerSizes(LayerSizes);
    // history.push("/");
  };

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="outlined"
        color="primary"
        style={{
          backgroundColor: "#bb86fc",
          color: "black",
          borderRadius: "20px",
          width: "80%",
          left: "10%",
        }}
        onClick={handleClickOpen}
      >
        {props.modalName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.modalName === "Create A Neural Network" ? (
              <p>
                Please enter layerSize in order and seperated by comma e.g:
                2,3,3,2 Will create a NNW with 2 hiden layer and 2 input and 2
                output
              </p>
            ) : (
              <p>
                Enter each group input line by line
                for each line, sperate different layers' input by ':' and
                if they are in same layer, sperate them by ',' <br/>
                e.g, if the Neural Network has 2 input 2 output
                1,1:1,1
              </p>
            )}
          </DialogContentText>
          <textarea
            rows="10"
            cols="60"
            autoFocus
            margin="dense"
            id="name"
            label="LayerSize"
            type="email"
            onChange={changeLayerSizes}
          />
          {props.modalName !== "Create A Neural Network" ? (
            <input
              type="number"
              placeholder="training epochs"
              onChange={changeTrainingEpochs}
            />
          ) : null}
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
