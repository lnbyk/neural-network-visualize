export default class NetworkTool {

    static createRandomArray(size, lower_bound, upper_bound) {
        if (size < 1)
            return null;
        var tmp = [];
        for (var i = 0; i < size; i++)
            tmp.push(this.randomValue(lower_bound, upper_bound));
        return tmp;
    }


    static createRandomArray1(sizeX, sizeY, lower_bound, upper_bound) {
        if(sizeX < 1 || sizeY < 1){
            return null;
        }
        var ar = []
        for(var i = 0; i < sizeX; i++){
            ar[i] = this.createRandomArray(sizeY, lower_bound, upper_bound);
        }
        return ar;
    }

    static randomValue(lower_bound, upper_bound){
        return Math.random()*(upper_bound-lower_bound) + lower_bound;
    }

    static randomValues(lowerBound, upperBound, amount) {
        lowerBound --;
        if(amount > (upperBound-lowerBound)){
            return null;
        }
        var values = [];
        for(var i = 0; i< amount; i++){
            var n = parseInt((Math.random() * (upperBound-lowerBound+1) + lowerBound));
            while(this.containsValue(values, n)){
                n = parseInt((Math.random() * (upperBound-lowerBound+1) + lowerBound));
            }
            values[i] = n;
        }
        return values;
    }

    static containsValue(ar, value){
        for(var i = 0; i < ar.length; i++){
            if(ar[i] !== null){
                if(value === (ar[i])){
                    return true;
                }
            }
        }
        return false;
    }
}