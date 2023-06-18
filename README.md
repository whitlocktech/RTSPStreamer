Sure! Here's a generated README.md file for your package:

```markdown
# RTSP Streamer

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

RTSP Streamer is a Node.js application that allows you to stream an RTSP video feed and publish it to a specified streaming service.

## Installation

1. Clone the repository:

   ```shell
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

3. Set up the environment variables. Create a `.env` file in the root directory and provide the following variables:

   ```
   RTSP_STREAM_URL=<RTSP_stream_url>
   STREAM_KEY=<stream_key>
   STREAM_TITLE=<stream_title>
   STREAM_URL=<stream_url>
   BACKUP_URL=<backup_url>
   ```

   Make sure to replace `<RTSP_stream_url>`, `<stream_key>`, `<stream_title>`, `<stream_url>`, and `<backup_url>` with your actual values.

## Usage

Start the RTSP streamer by running the following command:

```shell
npm start
```

The application will start streaming the RTSP video feed to the specified streaming service.

## Configuration

add a .env with the following Not streamTitle is not currently working

- `rtspStreamUrl`: The RTSP stream URL.
- `streamTitle`: The title of the stream (default: "RTSP Stream").
- `streamKey`: The stream key.
- `streamUrl`: The streaming service URL.
- `backupUrl`: The backup URL.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
```

Please note that this generated README assumes that you have a `LICENSE` file in your repository. If you don't, you can remove the license badge and section from the generated README.
