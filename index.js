const startRTSPStreamer = require('./streamer');
require('dotenv').config();

async function main() {
  const options = {
    rtspStreamUrl: process.env.RTSP_STREAM_URL,
    streamKey: process.env.STREAM_KEY,
    streamTitle: process.env.STREAM_TITLE,
    streamUrl: process.env.STREAM_URL,
    backupUrl: process.env.BACKUP_URL,
  };

  await startRTSPStreamer(options);
}

main().catch((err) => {
  console.error('An error occurred:', err);
});
