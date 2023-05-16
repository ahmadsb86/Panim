// class Rectangle {
//     constructor(a, b){
//         this.current = new State(100,100)       //current state
//         this.birth = 0
//         this.death = 100000000
//         this.anims = [
//             new Anim(this.current, ['x'], [800], 60, 100, 'linear'),
//         ]
//         this.anims.push(new Anim(this.getState(100), ['y'], [800], 100, 60, 'linear'))
//         this.anims.push(new Anim(this.getState(120), ['x'], [1200], 150, 60, 'linear'))
//     }
//     getState(frame){
        
//         //get array of anims currently playing
//         var currentAnims = []
//         for(var i = 0; i < this.anims.length; i++){
//             if(frame >= this.anims[i].start && frame <= this.anims[i].start+this.anims[i].duration){
//                 currentAnims.push(this.anims[i])
//             }
//         }

//         //if no anims playing, return initial ! THIS DOESNT WORK
//         if(currentAnims.length == 0){
//             currentAnims.push(this.current)
//             return currentAnims[0]
//         }

//         this.current = animsToState(currentAnims, frame)
//         return this.current
        
//     }
//     display(frame){
//         push()
//         rectMode(CENTER)
//         console.log(this.current.data)
//         let d = this.getState(frame).data    //state data
//         rect(d.x, d.y, d.w, d.h)
//         console.log(d)
//         pop()
//     }
// }

class Rectangle {
    constructor(a, b){
        this.birth = 0
        this.death = 100000000
        this.initial = new State(1)
        this.anims = {
            x: [],
            y: [],
            new Anim(this.current, ['x'], [800], 60, 100, 'linear'),
        }
        this.anims.push(new Anim(this.getState(100), ['y'], [800], 100, 60, 'linear'))
        this.anims.push(new Anim(this.getState(120), ['x'], [1200], 150, 60, 'linear'))
    }
    getState(frame){
        
        //get array of anims currently playing
        var currentAnims = []
        for(var i = 0; i < this.anims.length; i++){
            if(frame >= this.anims[i].start && frame <= this.anims[i].start+this.anims[i].duration){
                currentAnims.push(this.anims[i])
            }
        }

        //if no anims playing, return initial ! THIS DOESNT WORK
        if(currentAnims.length == 0){
            currentAnims.push(this.current)
            return currentAnims[0]
        }

        this.current = animsToState(currentAnims, frame)
        return this.current
        
    }
    display(frame){
        push()
        rectMode(CENTER)
        console.log(this.current.data)
        let d = this.getState(frame).data    //state data
        rect(d.x, d.y, d.w, d.h)
        console.log(d)
        pop()
    }
}