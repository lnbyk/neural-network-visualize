import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import './Perceptron.css';

var open = false;
export default class Perceptron extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            inputValue: 0 || props.input,
        }
    }

    openDialogue = () => {
        this.setState({ isOpen: true });
    }
    closeDialogue = () => {
        this.setState({ isOpen: false });
        $('#' + this.props.id).text(this.state.inputValue);
    }
    inputValueChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }
    render() {
        return <div>
            <Button id={this.props.id} variant="outlined" color="primary" className='btn-circle' onClick={this.openDialogue}>
                0
         </Button>
            <Dialog open={this.state.isOpen} onClose={this.closeDialogue} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Input</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Input Value
             </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter input"
                        type="email"
                        onChange={this.inputValueChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeDialogue} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

ReactDOM.render(<Perceptron />, document.getElementById('root'));