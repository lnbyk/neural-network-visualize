import React, { Component } from 'react';
import './NNW.css';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Perceptron from '../../components/popUpNNW/perceptron/Perceptron';
import FormDialog from '../../components/popUpNNW/popUpNNW';
import Button from '@material-ui/core/Button';
import model from './model';
import TrainSet from './TrainSet';
import LineTo from 'react-lineto'

var myNNW = null;
var ts = null;
export default class NNW extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layerSizes: [],
            inputdata: [],
            outputData: [],
            layers: [],
            linePos: [],
        }
    }


    inputLayerSizes = (v) => {
        this.setState({ layerSizes: v.split(",") });
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
            if (val !== '') {
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
        // get all the x y components by id
        console.log(this.state.linePos.length);

        
      //  alert(this.state.linePos);
    }
    
    makeLayers(val, index) {
        var tmp = [];
        for (var i = 0; i < val; i++)
            tmp.push(index + '' + i);

        this.state.layers.push(tmp);
        return tmp;
    }
    // use to train the neural net work
    train() {

        this.state.linePos = [];
        for (var i = 0; i < this.state.layers.length - 1; i++) {
            alert('a');
            for (var k = 0; k < this.state.layers[i].length; k++) {
                for (var j = 0; j < this.state.layers[i + 1].length; j++) {
                    var tmp = this.state.layers;
                    var tmpA = [];
                    var widdddd = $('#' + tmp[i][k]).width() / 2, hiehhhh = $('#' + tmp[i][k]).height() / 2;
                    tmpA.push($('#' + tmp[i][k]).position().left + widdddd);
                    tmpA.push($('#' + tmp[i][k]).position().top + hiehhhh);
                    tmpA.push($('#' + tmp[i + 1][j]).position().left + widdddd);
                    tmpA.push($('#' + tmp[i + 1][j]).position().top + hiehhhh);
                    this.state.linePos.push(tmpA);
                    $('<line />').attr({x1:tmpA[0], y1:tmpA[1], x2:tmpA[2], y2:tmpA[3], id:'2222'}).css({
                        strokeWidth : 2,
                        stroke: 'rgb(255,0,0)',
                    }).appendTo('#aaaaaaa');
                    
 
                }
                
            }
        }

        this.forceUpdate();
        alert('not implemented yet');
    }


    render() {
        return <React.Fragment>
            <div id='createNNW'>
                <FormDialog modalName='Create A Neural Network' LayerSizes={this.inputLayerSizes}></FormDialog>
            </div>
            <div id='nnwTraining'>
                <Button variant="outlined" color="primary" onClick={this.train.bind(this)}>Train</Button>
                <br></br>
                <FormDialog modalName='Input Data' LayerSizes={this.splitTrainingData}></FormDialog>
            </div>
            <div className="container">
                {this.state.layerSizes.map((val, index) => {
                    return <div key={index + 'layer'} className='aaaa' >
                        {this.makeLayers(val, index).map(val => {
                            return <Perceptron className='top' key={val} id={val}> 
                            </Perceptron>
                        })}
                    </div>
                })
                }
                {this.state.layers.map((val, index) => {
                    if (index + 1 < this.state.layers.length) {
                        for (var i = 0; i < val.length; i++) {
                            //alert(index);
                            this.state.layers[index + 1].forEach(element => {
                                //alert(val[i]);
                                return <LineTo from='00' to='10' />
                            });
                        }
                    }
                })
                }

            </div>
            <div className='lineDiv'>
                <svg id='aaaaaaa' position='absolute' height='100%' width='100%' >
                    {
                        this.state.linePos.map(val => {
                            alert('aaaaaa');
                           return <line x1={parseInt(val[0])} y1={val[1]} x2={val[2]} y2={val[3]} stroke='rgb(255,0,0)' strokeWidth="2" />
                        })
                    }
                    
                </svg>
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