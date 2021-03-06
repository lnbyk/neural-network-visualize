import React, { Component } from "react";
import "./NNW.css";
import $ from "jquery";
import ReactDOM from "react-dom";
import Perceptron from "../../components/popUpNNW/perceptron/Perceptron";
import FormDialog from "../../components/popUpNNW/popUpNNW";
import Button from "@material-ui/core/Button";
import model from "./model";
import TrainSet from "./TrainSet";
import LineTo from "react-lineto";
import Modal from "react-bootstrap/Modal";
import {Container} from 'react-bootstrap'
var myNNW = null;
var ts = null;
export default class NNW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nnwLength: 0,
      layerSizes: [],
      inputdata: [],
      outputData: [],
      layers: [],
      linePos: [],
      weights: [],
      bias: [],
      biasLinePos: [],
      showWeights: true,
      graph: "",
      data: "none",
      trainModel: false,
      epochs: 0,
    };
  }

  setEpochs = (v) => {
    this.setState({epochs: v});
  }

  inputLayerSizes = (v) => {
    const layerSize = v.split(",");
    this.setState({ layerSizes: layerSize, nnwLength: layerSize.length });
    myNNW = new model(layerSize);
    ts = new TrainSet(layerSize[0], layerSize[layerSize.length - 1]);
    //alert(myNNW.NETWORK_LAYER_SIZES);
  };

  // splitTrainingData will take input data and add them to out input and output dataset
  splitTrainingData = (v) => {
    if (ts === null || myNNW === null) {
      alert("You need to create the neural network first");
      return;
    }
    var inputData = v.split("\n");
    inputData.map((val) => {
      // alert(val + "val is is ");
      if (val !== "") {
        var inOutput = val.split(":");
        var inin = inOutput[0].split(",");
        var ouou = inOutput[1].split(",");
        this.state.inputdata.push(inin);
        this.state.outputData.push(ouou);
        ts.addData(inin, ouou);
        // alert(ts.data);
        if (parseInt(inin.length) !== parseInt(ts.inputSize)) {
          alert(ts.inputSize);
          alert("Input size is not correct");
        } else ts.addData(inin, ouou);
        // alert(ts.data);
      }
    });
  };
  componentDidMount() {
    $(".aaaa").css({ width: 100 / 2 + "vw" });
    // get all the x y components by id
    console.log(this.state.linePos.length);

    //  alert(this.state.linePos);
  }

  makeLayers(val, index) {
    var tmp = [];
    for (var i = 0; i < val; i++) tmp.push(index + "" + i);

    this.state.layers.push(tmp);
    return tmp;
  }

  hideWeights() {
    this.setState({ showWeights: !this.state.showWeights });
  }
  // use to train the neural net work
  train() {
    this.state.linePos = [];
    for (var i = 0; i < this.state.layers.length - 1; i++) {
      //alert('a');
      for (var k = 0; k < this.state.layers[i].length; k++) {
        for (var j = 0; j < this.state.layers[i + 1].length; j++) {
          var tmp = this.state.layers;
          var tmpA = [],
            tmpB = [];
          var widdddd = $("#" + tmp[i][k]).width() / 2,
            hiehhhh = $("#" + tmp[i][k]).height() / 2;
          tmpA.push($("#" + tmp[i][k]).offset().left + widdddd);
          tmpA.push($("#" + tmp[i][k]).offset().top + hiehhhh);
          tmpA.push($("#" + tmp[i + 1][j]).offset().left + widdddd);
          tmpA.push($("#" + tmp[i + 1][j]).offset().top + hiehhhh);
          this.state.linePos.push(tmpA);

          // here adds the bias line
          if ($(`#bias${i}`).length === 0)
            continue;
          tmpB.push($(`#bias${i}`).offset().left + widdddd);
          tmpB.push($(`#bias${i}`).offset().top + hiehhhh);
          tmpB.push($("#" + tmp[i + 1][j]).offset().left + widdddd);
          tmpB.push($("#" + tmp[i + 1][j]).offset().top + hiehhhh);
          this.state.biasLinePos.push(tmpB);
        }
      }
    }

    this.forceUpdate();
    if (ts === null || ts.data.length === 0) {
      alert("you need to input data first");
      return;
    }
    //alert(ts.data);
    console.log(this.state.epochs); 
    myNNW.train1(ts, this.state.epochs, 1);
    //alert(myNNW.weights);
    myNNW.weights.forEach((val, i) => {
      if (i !== 0)
        val.forEach((cc) => {
          cc.forEach((ccc) => {
            this.state.weights.push(ccc);
          });
        });
    });

    myNNW.bias.forEach((val, i) => {
      if (i !== 0)
        val.forEach((cc) => {
          this.state.bias.push(cc);
        });
    });

    console.log(" --------------------");
    console.log(myNNW.bias);
    console.log(" --------------------");
    console.log(myNNW.weights);
  }

  render() {
    return (
      <React.Fragment>
        <div id="nnwTraining">
          <FormDialog
            className="dialog"
            modalName="Create A Neural Network"
            LayerSizes={this.inputLayerSizes}
            ccccccccc={this.setEpochs}
          ></FormDialog>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.train.bind(this)}
          >
            Train
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.hideWeights.bind(this)}
          >
            Hide Weights
          </Button>
          <FormDialog
            className="dialog"
            modalName="Input Data"
            LayerSizes={this.splitTrainingData}
            ccccccccc={this.setEpochs}
          ></FormDialog>
          <Button
            className="change-display"
            onClick={() => {
              if (this.state.graph === "")
                this.setState({ graph: "none", data: "" });
              else this.setState({ graph: "", data: "none" });
            }}
          >
            {this.state.graph === "none" ? (
              <text>Change To Graph</text>
            ) : (
              <text>Change To Data</text>
            )}
          </Button>
        </div>
        <div className="container" style={{ display: this.state.graph }}>
          {this.state.layerSizes.map((val, index) => {
            return (
              <div key={index + "layer"} className="aaaa">
                {this.makeLayers(val, index).map((val) => {
                  if (index != this.state.layerSizes.length)
                    return (
                      <Perceptron
                        className="top"
                        key={val}
                        id={val}
                      ></Perceptron>
                    );
                })}

                {index != this.state.layerSizes.length - 1 ? (
                  <div
                    className="aaaaa"
                    id={`bias${index}`}
                    style={{ backgroundColor: "yellow" }}
                  >
                    {" "}
                  </div>
                ) : null}
              </div>
            );
          })}
          {this.state.layers.map((val, index) => {
            if (index + 1 < this.state.layers.length) {
              for (var i = 0; i < val.length; i++) {
                //alert(index);
                this.state.layers[index + 1].forEach((element) => {
                  //alert(val[i]);
                  return <LineTo from="00" to="10" />;
                });
              }
            }
          })}
        </div>
        <div
          className="container"
          style={{
            display: this.state.data,
            color: "white",
            justifyContent: "left",
            paddingLeft: "30px",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <div style={{ textAlign: "left", alignItems: "left", width: "50%" }}>
            <h1>Neural Network Format:</h1>
            {this.state.layerSizes.map((val, index) => {
              return (
                <pre>
                  <text>
                    {`          layer ${index + 1} size : ${val}`} <br />
                  </text>
                </pre>
              );
            })}
            <h1>Input Data</h1>
            {this.state.inputdata.length === 0 ? (
              <text>You did not enter any data yet</text>
            ) : (
              this.state.inputdata.map((val, index) => {
                return (
                  <pre>
                    <text>
                      {`          ${
                        index + 1
                      }. Input: ${val.toString()}  Output: ${this.state.outputData[
                        index
                      ].toString()}`}
                      <br />
                    </text>
                  </pre>
                );
              })
            )}
          </div>

          <div
            style={{
              textAlign: "top-left",
              alignItems: "top-left",
              verticalAlign: "top",
            }}
          >
            <h1>Weights: </h1>
            {this.state.weights.toString()}
            <h1>Bias:</h1>
          </div>
        </div>
        <div className="lineDiv">
          <svg id="aaaaaaa" position="absolute" height="100%" width="100%">
            {this.state.linePos.map((val) => {
              //alert('aaaaaa');
              return (
                <line
                  position="absolute"
                  x1={parseInt(val[0])}
                  y1={val[1]}
                  x2={val[2]}
                  y2={val[3]}
                  stroke="#bb86fc"
                  strokeWidth="2"
                  style={{ transform: "transLateY(2%)", position: "absolute" }}
                />
              );
            })}

            {this.state.biasLinePos.map((val) => {
              //alert('aaaaaa');
              return (
                <line
                  position="absolute"
                  x1={parseInt(val[0])}
                  y1={val[1]}
                  x2={val[2]}
                  y2={val[3]}
                  stroke="yellow"
                  strokeWidth="2"
                  style={{ transform: "transLateY(2%)", position: "absolute" }}
                />
              );
            })}
          </svg>

          {this.state.showWeights ? (
            <div id="aaaaaaa" position="absolute" height="100%" width="100%">
              {this.state.weights.map((cc, index) => {
                var val = this.state.linePos[index];

                //alert('aaaaaa');
                var curX = (parseInt(val[2]) - val[0]) / 3 + val[0];

                var k = (val[3] - val[1]) / (val[2] - val[0]);
                var b = val[1] - k * val[0];
                var curY = curX * k + b;

                // alert(curY);
                return (
                  <div
                    style={{
                      position: "absolute",
                      color: "red",
                      left: curX,
                      top: curY,
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>{cc.toFixed(4)}</b>
                  </div>
                );
              })}
            </div>
          ) : null}

          {this.state.showWeights ? (
            <div id="aaaaaaa" position="absolute" height="100%" width="100%">
              {this.state.bias.map((cc, index) => {
                var val = this.state.biasLinePos[index];

                //alert('aaaaaa');
                var curX = (parseInt(val[2]) - val[0]) / 3 + val[0];

                var k = (val[3] - val[1]) / (val[2] - val[0]);
                var b = val[1] - k * val[0];
                var curY = curX * k + b;

                // alert(curY);
                return (
                  <div
                    style={{
                      position: "absolute",
                      color: "orange",
                      left: curX,
                      top: curY,
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>{cc.toFixed(4)}</b>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
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

ReactDOM.render(<NNW />, document.getElementById("root"));
