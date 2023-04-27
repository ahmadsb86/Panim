class Rectangle {
    constructor(a, b){
        this.init = new State(a,b)
        this.birth = 0
        this.death = 100000000
        this.anims = [
            new Anim(new State(100,100), ['x'], [800], 60, 60, 'linear'),
            new Anim(new State(100,100), ['y'], [800], 110, 60, 'linear')
        ]
    }
    getState(frame){

        var currentAnims = []
        for(var i = 0; i < this.anims.length; i++){
            if(frame >= this.anims[i].start && frame <= this.anims[i].start+this.anims[i].duration){
                currentAnims.push(this.anims[i])
            }
        }

        if(currentAnims.length == 0){
            currentAnims.push(this.init)
            return currentAnims
        }
        return animToState(currentAnims, frame)[0]
        
    }
    display(frame){
        try{
            console.log(this.getState(frame)[0].data)
        }
        catch{
            console.log(this.getState(frame))
        }
        // d = this.getState(frame)[0].data    //state data
        // rect(d.x, d.y, d.w, d.h)
    }
}