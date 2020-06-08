import NetworkTool from "./NetworkTool";

export default class TrainSet {
    constructor(inputSize, outputSize) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.data = [];
    }

    addData(input, expected) {
        if (input.length !== this.inputSize || expected.length !== this.outputSize)
            return;
        var tmp = [];
        tmp.push(input);
        tmp.push(expected);
        this.data.push(tmp);
    }

    extractBatch(size) {
        //alert(this.data.length);
       // alert(this.data.length);
        if (size > 0 && size <= this.data.length) {
            var set = new TrainSet(this.inputSize, this.outputSize);
            var ids = NetworkTool.randomValues(0, this.data.length - 1, size);
            //alert('ids' + ids.length);
            ids.forEach(i => {
                set.addData(this.getInput(i), this.getOutput(i));
            });
            return set;
        }
        return null;
    }

    getInput(index) {
        if (index >=0 && index < this.data.length)
            return this.data[index][0];
        return null;
    }

    getOutput(index) {
        if (index >=0 && index < this.data.length)
            return this.data[index][1];
        return null;
    }
}