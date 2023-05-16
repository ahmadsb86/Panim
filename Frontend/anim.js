class Anim{
    constructor(a, b, c, d, e, f){
        this.initial = a;    //State
        this.toChange = b;    //array of all values to be changed
        this.changeTo = c;    //array of values to change to
        this.start = d;       //frame at which anim starts
        this.duration = e;    //time (in frames) to change
        this.easing = f;      //easing function
    }
}

function animsToState(inp, frame){
    //inp is anims to be squashed
    
    let data = inp[0]       //!TEMP SOLUTION
    for(let i of inp){
        switch (i.easing) {
            case 'linear':
                for(let [index, c] of i.toChange.entries())
                    if(c!='t') data[c] = Math.floor(map(frame, i.start, i.start + i.duration, i.initial.data[c], i.changeTo[index]))
                break;
                
            default:
                break;
        }
    }
    let res = new State()
    res.passOptions(data)
    return res
}