const { google } = require('googleapis');
const ffmpeg = require('fluent-ffmpeg');

class RTSPStreamer {
  constructor(options) {
    this.rtspStreamUrl = options.rtspStreamUrl;
    this.youtubeStreamKey = options.youtubeStreamKey;
    this.youtubeClientId = options.youtubeClientId;
    this.youtubeClientSecret = options.youtubeClientSecret;
    this.youtubeRefreshToken = options.youtubeRefreshToken;
    this.title = options.title || 'RTSP Stream';
    this.privacyStatus = options.privacyStatus || 'public';
  }

  async start() {
    const oAuth2Client = new google.auth.OAuth2(
      this.youtubeClientId,
      this.youtubeClientSecret
    );
    oAuth2Client.setCredentials({ refresh_token: this.youtubeRefreshToken });

    const youtube = google.youtube({
      version: 'v3',
      auth: oAuth2Client,
    });

    const broadcast = await youtube.liveBroadcasts.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: this.title,
          scheduledStartTime: new Date(),
        },
        status: {
          privacyStatus: this.privacyStatus,
        },
      },
    });

    const broadcastId = broadcast.data.id;
    const streamKey = await youtube.liveStreams.insert({
      part: ['snippet', 'cdn'],
      requestBody: {
        snippet: {
          title: this.title,
        },
        cdn: {
          format: '720p',
          ingestionType: 'rtmp',
        },
      },
    }).then((stream) => stream.data.cdn.ingestionInfo.streamName);

    ffmpeg(this.rtspStreamUrl)
      .inputOptions('-rtsp_transport tcp')
      .inputFormat('rtsp')
      .output(`rtmp://a.rtmp.youtube.com/live2/${streamKey}`)
      .outputOptions('-c:v copy', '-c:a copy')
      .on('start', () => console.log('Start streaming'))
      .on('error', (err) => console.log('Error:', err.message))
      .run();
  }
}

module.exports = RTSPStreamer;
