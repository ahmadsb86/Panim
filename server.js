const express = require('express')
const cors = require('cors')  //use this
const path = require('path')
const fs = require('fs');
const videoshow = require('videoshow')
const chalk = require('chalk');
const { spawn } = require('child_process');


// const ffmpeg = require('fluent-ffmpeg');



const path_to_cache = 'image_cache'
const full_path_to_cache = path.join(__dirname, `/${path_to_cache}`);
const app = express()
const port = 5500

var img_index = 0

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(cors()) 
app.use('/static', express.static(path.join(__dirname, 'Frontend')))


/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */
app.get('/yee', (req,res)=>{
    res.send('yeezies')
}) 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})




app.post('/downloadImage', (req, res) => {
    img_index ++
    const imageDataURL = req.body.imageDataURL;
    const imageData = imageDataURL.split(';base64,').pop();
    const filename = `${img_index.toString().padStart(9,'0')}.png`;
    fs.writeFile(path.join(__dirname, 'image_cache', filename), imageData, { encoding: 'base64' }, (err) => {
      if (err) {
        console.error('Failed to download image:', err);
        res.status(500).send('Failed to download image');
      } else {
        console.log('Image downloaded successfully');
        res.sendStatus(200);
      }
    });
  });


app.get('/beginRender', (req,res)=>{
    emptyCache()
})
app.get('/merge', (req,res)=>{
    res.send(stitchImagesToVideo(full_path_to_cache, path.join(__dirname, '/render.mp4')))
})

/* -------------------------------------------------------------------------- */
/*                             Image Cache Render                             */
/* -------------------------------------------------------------------------- */


function emptyCache(){
    console.log('EMPTYING CACHEE')
    img_index = 0;
    fs.readdir(full_path_to_cache, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(full_path_to_cache, file), (err) => {
            if (err) throw err;
          });
        }
      });
}


function stitchImagesToVideo(directory, outputVideoPath) {
  return new Promise((resolve, reject) => {
    // Check if the directory exists
    if (!fs.existsSync(directory)) {
      reject(new Error(`Directory "${directory}" does not exist.`));
      return;
    }

    // Get all files in the directory
    const files = fs.readdirSync(directory);


    // Check if there are any image files
    if (files.length === 0) {
      reject(new Error(`No image files found in directory "${directory}".`));
      return;
    }

    const ffmpegArgs = [
      '-r', '30',
      '-start_number', '0',
      '-y', //automatically overwrite
      '-i', path.join(full_path_to_cache, '%09d.png'), // Assumes images are sequentially numbered starting from 1 and have .jpg extension
      '-c:v', 'libx264',
      '-vf', `fps=25`, // Set output frame rate
      // '-pix_fmt', 'yuv420p', // Set pixel format for compatibility
      outputVideoPath
    ];

    // Spawn ffmpeg process
    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);
    console.log(chalk.blue(`Running command: ffmpeg ${ffmpegArgs.join(' ')}`));

    // Listen for process error event
    ffmpegProcess.on('error', (err) => {
      reject(new Error(`Failed to create video. ffmpeg process encountered an error: ${err.message}`));
    });

    // Listen for process exit event
    ffmpegProcess.on('exit', (code) => {
      console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      if (code == 0) {
        resolve(chalk.blue.bold(outputVideoPath));
      } else {
        reject(new Error(`Exited: Failed to create video. ffmpeg process exited with code ${code}.`));
      }
    });
    
  });
}


// const videoOptions = {
//   fps: 60,
//   loop: 1/60, // seconds
//   transition: false,
//   disableFadeOut: true,
//   disableFadeIn: true, 
//   videoBitrate: 1024,
//   videoCodec: 'libx264',
//   size: '1920x?',
//   audioBitrate: '128k',
//   audioChannels: 2,
//   format: 'mp4',
//   pixelFormat: 'yuv420p'
// }

// function stitchImagesToVideo(directory, output){

//     fs.readdir(full_path_to_cache, (err, files) => {
//         if (err) throw err;

//         images = []
//         files.forEach(file =>{
//           images.push(path.join(full_path_to_cache,file))
//         })

//         videoshow(images, videoOptions)
//                 .save('video.mp4')
//                 .on('start', function (command) {
//                   console.log('ffmpeg process started:')
//                 })
//                 .on('error', function (err, stdout, stderr) {
//                   console.error('Error:', err)
//                   console.error('ffmpeg stderr:', stderr)
//                 })
//                 .on('end', function (output) {
//                   console.error('Video created in:', output)
//                 })
        
//     });
    
// }

