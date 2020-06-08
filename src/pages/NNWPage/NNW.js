import React, { Component } from 'react';
import './NNW.css';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Perceptron from '../../components/popUpNNW/perceptron/Perceptron';
import FormDialog from '../../components/popUpNNW/popUpNNW';
import Button from '@material-ui/core/Button';
import model from './model';
import TrainSet from './TrainSet';

var myNNW = null;
var ts = null;
export default class NNW extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layerSizes: [],
            inputdata:[],
            outputData:[],
        }
    }


    inputLayerSizes = (v) => {
        this.setState({layerSizes :v.split(",")});
        myNNW = new model(this.state.layerSizes);
        ts = new TrainSet(this.state.layerSizes[0], this.state.layerSizes[this.state.layerSizes.length - 1]);
        //alert(myNNW.NETWORK_LAYER_SIZES);
    }
    
    // splitTrainingData will take input data and add them to out input and output dataset
    splitTrainingData = (v) => {
        if (ts === null || myNNW === null) {
            alert('You need to create the neural network first');
            return;
        }
        var inputData = v.split('.');
        inputData.map(val => {
            if (val !=='') {
            var inOutput = val.split(':');
            var inin = inOutput[0].split(',');
            var ouou = inOutput[1].split(',');
            this.state.inputdata.push(inin);
            this.state.outputData.push(ouou);
            alert(inin.length);
            if (inin.length !== ts.inputSize) {
                alert(ts.inputSize);    
                alert("Input size is not correct");
                return;
            }
            else
            ts.addData(inin, ouou);
        }
        })
    }
    componentDidMount() {
        $('.aaaa').css({ 'width': 100 / 2 + 'vw' });
    }
    makeLayers(val, index){
        var tmp = [];
        for (var i = 0; i < val; i++)
            tmp.push(index + '' + i);
        return tmp;
    }
    // use to train the neural net work
    train() {
        alert('not implemented yet');
    }

    render() {
        return <React.Fragment>
            <div id='createNNW'>
                <FormDialog modalName='Create A Neural Network'LayerSizes={this.inputLayerSizes}></FormDialog>
            </div>
            <div id='nnwTraining'>
                <Button variant="outlined" color="primary" onClick={this.train}>Train</Button>
                <br></br>
                <FormDialog modalName='Input Data' LayerSizes={this.splitTrainingData}></FormDialog>
            </div>
            <div className="container">
                {this.state.layerSizes.map((val, index) => {
                    return <div className='aaaa' > 
                        {this.makeLayers(val,index).map(val => {
                            return <Perceptron id={val}>
                            </Perceptron>
                        })}
                    </div>
                })}
            </div>
            
        </React.Fragment>
    }



    /*
        // here is the code for my neural network
        constructor(layerSizes) {
            this.layerSizes = layerSizes;
            this.inputSize = layerSizes[0];
            this.networkSize = layerSizes.length;
            this.outputSize = layerSizes[layerSizes.length - 1];
    
            this.output = [];
            this.weights = [];
            this.bias = [];
            this.error_signal = [];
            this.output_derivative = [];
            for (var i = 0; i < this.networkSize; i++) {
    
            }
    
    
        }
    */
}

ReactDOM.render(<NNW />, document.getElementById('root'))