import './NetworkTool';
import NetworkTool from './NetworkTool';
import './TrainSet';
import TrainSet from './TrainSet';
export default class model {
    constructor(NETWORK_LAYER_SIZES) {
        this.NETWORK_LAYER_SIZES = NETWORK_LAYER_SIZES;
        this.INPUT_SIZE = NETWORK_LAYER_SIZES[0];
        this.NETWORK_SIZE = NETWORK_LAYER_SIZES.length;
        this.OUTPUT_SIZE = NETWORK_LAYER_SIZES[this.NETWORK_SIZE - 1];

        this.output = [];
        this.weights = [[[0]]];
        this.bias = [];

        this.error_signal = [];
        this.output_derivative = [];

        for (var i = 0; i < this.NETWORK_SIZE; i++) {
            var cur = [];
            for (var j = 0; j < NETWORK_LAYER_SIZES[i]; j++)
                cur.push([]);
            this.output.push(cur);
            this.error_signal.push(cur);
            this.output_derivative.push(cur);

            this.bias.push(NetworkTool.createRandomArray(NETWORK_LAYER_SIZES[i], 0.3, 0.7));
            if (i > 0)
                this.weights.push(NetworkTool.createRandomArray1(NETWORK_LAYER_SIZES[i], NETWORK_LAYER_SIZES[i - 1], -0.3, 0.5));
        }
    }

    calculate(input) {

        if (input.length !== this.INPUT_SIZE)
            return null;
            //alert(1);
        this.output[0] = input;
        for (var layer = 1; layer < this.NETWORK_SIZE; layer++) {
            for (var neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++) {
                var sum = this.bias[layer][neuron];
                for (var preNeuron = 0; preNeuron < this.NETWORK_LAYER_SIZES[layer - 1]; preNeuron++) {
                    sum += this.output[layer - 1][preNeuron] * this.weights[layer][neuron][preNeuron];
                }
                //alert(sum);
                this.output[layer][neuron] = this.sigmoid(sum);
                //console.log(this.sigmoid(sum));
            }
            
        }

        return this.output[this.NETWORK_SIZE - 1];
     
    }

    train1(ts, loops, batch_size) {
        
        for (var i = 0; i < loops; i++) {
            var batch = new TrainSet()
            var batch = ts.extractBatch(batch_size);
            for (var j = 0; j < batch_size; j++) {
                this.train(batch.getInput(j), batch.getOutput(j), 0.4);
            }
            
        }
    }


    // training method 
    train(input, target, eta) {
        if (input.length !== this.INPUT_SIZE || target.length !== this.OUTPUT_SIZE)
            return;
        this.calculate(input);
        this.backpropError(target);
        this.updateWeights(eta);
    }
    sigmoid(x) {
        return 1.0 / (1 + Math.exp(-x));
    }

    backpropError(target) {
		for(var neuron = 0; neuron < this.NETWORK_LAYER_SIZES[this.NETWORK_SIZE - 1]; neuron++) {
           // alert(this.error_signal[this.NETWORK_SIZE - 1][neuron]);
			this.error_signal[this.NETWORK_SIZE - 1][neuron] = (this.output[this.NETWORK_SIZE - 1][neuron] - target[neuron])* this.output_derivative[this.NETWORK_SIZE - 1][neuron];
		}
		for(var layer = this.NETWORK_SIZE - 2; layer > 0; layer--) {
			for(var neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++) {
				var sum = 0;
				for(var nextNeuron = 0; nextNeuron < this.NETWORK_LAYER_SIZES[layer + 1]; nextNeuron++) {
					sum += this.weights[layer + 1][nextNeuron][neuron] * this.error_signal[layer + 1][nextNeuron];
				}
				this.error_signal[layer][neuron] = sum * this.output_derivative[layer][neuron];
			}
		}
    }
    
    	// method used to update weights
    updateWeights(eta) {
		for(var layer = 1; layer < this.NETWORK_SIZE; layer++) {
			for(var neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++) {
				for(var prevNeuron = 0; prevNeuron < this.NETWORK_LAYER_SIZES[layer - 1]; prevNeuron++) {
					// weight[layer][neuron][prevNeuron]
                    var delta = -eta * this.output[layer - 1][prevNeuron] * this.error_signal[layer][neuron];
                    //alert('delta' + delta);
					this.weights[layer][neuron][prevNeuron] += delta;
				}
				var delta = -eta * this.error_signal[layer][neuron];
				this.bias[layer][neuron] += delta;
			}
		}
	}

}


// test
var net = new model([2,2]);
var input2 = [1.0, 1.0];
var output2 = [1,0, 0.0];
var input1 = [1.0, 0.0];
var output1 = [0.0, 1.0];
var input3 = [1.0, 1.0];
var output3 = [1.0, 0.0];

var set = new TrainSet(2, 2);
set.addData(input1, output1);
set.addData(input3, output3);

for(var i = 0; i < 100000; i++) {
    net.train(input1, output1, 0.3);
    net.train(input3, output3, 0.3);
    //alert(net.weights);
}





