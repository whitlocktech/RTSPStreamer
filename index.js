const ffmpeg = require('fluent-ffmpeg');

class RTSPStreamer {
  constructor(options) {
    this.rtspStreamUrl = options.rtspStreamUrl;
    this.youtubeStreamKey = options.streamKey;
    this.youtubeStreamUrl = options.streamUrl;
    this.title = options.title || 'RTSP Stream';
  }

  async start() {
    ffmpeg(this.rtspStreamUrl)
      .inputOptions('-rtsp_transport tcp')
      .inputFormat('rtsp')
      .output(`${this.streamUrl}/${this.streamKey}`)
      .outputOptions('-c:v copy', '-c:a copy')
      .on('start', () => console.log('Start streaming'))
      .on('error', (err) => console.log('Error:', err.message))
      .run();
  }
}

module.exports = RTSPStreamer;
