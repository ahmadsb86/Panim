var canvasDimentions 
var ctx;
var myRect;
var debugMode = true;
var frame = 0;

function setup() {
    bg = color(30)
    canvasDimentions = createVector(1920, 1080)
    createCanvas(canvasDimentions.x, canvasDimentions.y);
    ctx = $("#defaultCanvas0")[0].getContext('2d');
    myRect = new Rectangle(100,100)
    
}

var fps = 60
function drawDebug(){
    const tSize = 20
    if(frameCount%Math.floor(fps/6) == 0) fps = frameRate()
    push()
    fill(0,255,0)
    textSize(tSize)
    text('FPS: ' + nfs(fps.toString(), 2,0).slice(0,-1),tSize, canvasDimentions.y - tSize)
    pop()
}

function draw() {
    background(bg);
    drawDebug()
    frame += 1
    myRect.display(frame)
}


$(document).ready(function () {

    // $( "#canvas" ).click(function() {
    //     var imageDataURL = $("#canvas")[0].toDataURL();
    //     callAPI(
    //         '/downloadImage',                   //route
    //         'POST',                             //method
    //         JSON.stringify({imageDataURL}),     //body
    //         'Image downloaded succesfully',     //success
    //         'Failed to download image: '        //fail
    //     )
    // });

    $('#start').click(function (){
        alert('yeah')
        callAPI(
            '/beginRender',                     //route
            'GET',                              //method
            '',                                 //body
            'Render Begins Successfully',       //success
            'Render Failed to Begin: '          //fail
        )
    })
    $('#render').click(function(){
        callAPI(
            '/merge',                            //route
            'GET',                               //method
            '',                                  //body
            'Render Merge Successful',           //success
            'Render Failed to Merge: '           //fail
        )
    })
    $('#change_color').click(function(){
        frame = 0
    })

});


function callAPI(route, method, body, success, fail){
    var config = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    };
    if(method == 'POST'){
        config = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }
    }

    fetch(route, config)
    .then(response => {
        if (response.ok) console.log(success)   //if status 200
        else console.error(fail, response.statusText);
    })
    .catch(error => {
        console.error(fail, error);
    });
}