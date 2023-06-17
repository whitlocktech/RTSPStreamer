const { spawn } = require('child_process');
const pathToFfmpeg = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();

const frameRate = 30;

async function startRTSPStreamer(options) {
  const {
    rtspStreamUrl,
    streamTitle = 'RTSP Stream',
    streamKey,
    streamUrl,
    backupUrl,
  } = options;

  try {
    await new Promise((resolve, reject) => {
      // Set the FFmpeg path
      ffmpeg.setFfmpegPath(pathToFfmpeg);

      const args = [
        '-rtsp_transport', 'tcp',
        '-i', rtspStreamUrl,
        '-filter:v', `fps=${frameRate}`,
        '-c:v', 'libx264',
        '-c:a', 'copy',
        '-f', 'flv',
        `${streamUrl}/${streamKey}`,
      ];

      const proc = spawn(pathToFfmpeg, args);

      proc.stdout.on('data', function (data) {
        console.log(data);
      });

      proc.stderr.setEncoding("utf8");
      proc.stderr.on('data', function (data) {
        console.log(data);
      });

      proc.on('close', function () {
        console.log('finished');
      });

      proc.on('error', function (err) {
        console.log('FFmpeg error:', err.message); // Log any FFmpeg errors
        reject(err);
      });

      proc.on('exit', function (code, signal) {
        if (code === 0) {
          console.log('Stream started successfully.');
          resolve();
        } else {
          console.log('FFmpeg exited with code:', code);
          reject(new Error('Stream failed to start.'));
        }
      });
    });
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

module.exports = startRTSPStreamer;
