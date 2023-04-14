function drawStuff(c){
    c.fillStyle = "green";
    c.fillRect(10, 10, 150, 100);
}

$(document).ready(function () {


    var c = $("#canvas")[0].getContext('2d');
    // code to resize the canvas to fill browser window dynamically
    // window.addEventListener('resize', resizeCanvas, false);
    // function resizeCanvas() {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight; 
    //     /**
    //      * Your drawings need to be inside this function otherwise they will be reset when 
    //      * you resize the browser window and the canvas goes will be cleared.
    //      */
    //     drawStuff(c); 
    // }
  
    // resizeCanvas();
    drawStuff(c)
    

    $( "#canvas" ).click(function() {
        // Get the base64-encoded image data from canvas
        var imageDataURL = $("#canvas")[0].toDataURL();

        // Send the image data as JSON in the request body to the server
        callAPI(
            '/downloadImage',                   //route
            'POST',                             //method
            JSON.stringify({imageDataURL}),     //body
            'Image downloaded succesfully',     //success
            'Failed to download image: '        //fail
        )

        // window.open($("#canvas")[0].toDataURL(), "_blank")
    });

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
        c.fillStyle = 'red'
        c.fillRect(10, 10, 150, 100);
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