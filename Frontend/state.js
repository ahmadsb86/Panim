class State{
    
    constructor(xx=100,yy=100,ww=100,hh=100,cc='red',tt=''){
        this.data = {
            'x': xx,
            'y': yy,
            'w': ww,
            'h': hh,
            'c': cc,
            't': tt
        } 
    }

    passOptions(options){
        // iterate over JSON Object named options

        Object.entries(options).forEach(([key, value]) => {
            this.data[key] = value
        });
    }

}