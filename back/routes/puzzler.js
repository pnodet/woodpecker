import {Router} from 'express';
import {spawn} from 'child_process';
const router = Router();

router.get('/', (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  const pythonProcess = spawn('python3', ['./modules/puzzler/main.py']);
  // collect data from script
  pythonProcess.stdout.on('data', function (data) {
    console.log('Pipe data from python script...');
    dataToSend = data.toString();
  });

  pythonProcess.on('error', err => {
    console.log(`child process sent error ${err}`);
  });
  
  pythonProcess.on('message', msg => {
    console.log(`child process sent message ${msg}`);
  });
  
  // in close event we are sure that stream from child process is closed
  pythonProcess.on('close', (code, signal) => {
    console.log(`child process close all stdio with code ${code} and signal ${signal}`);
    // send data to browser
    res.send(dataToSend);
  });
});

export default router;
