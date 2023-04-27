class State{
    constructor(options){
        this.data = {
            'x': 100,
            'y': 100,
            'w': 100,
            'h': 100,
            'c': 'red',
            't': ''
        } 

        // iterate over JSON Object named options

        Object.entries(options).forEach(([key, value]) => {
            this.data[key] = value
        });
    }

}