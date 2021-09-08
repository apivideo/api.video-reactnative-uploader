![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)
# @api.video/react-native-api-video-uploader
![npm](https://img.shields.io/npm/v/@api.video/react-native-api-video-uploader ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

This module is an easy way to upload video with delegated token to Api.Video

## Installation

```sh
npm install @api.video/react-native-api-video-uploader
```
or
```sh
yarn add @api.video/react-native-api-video-uploader
```

## Usage

```js
import ApiVideoUploader from "react-native-api-video-uploader";

// ...

ApiVideoUploader.upload("YOUR_TOKEN", "VIDEO_NAME", "FILE_PATH").then((value: Video) =>{
    console.log(`video : `, value)
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Plugins

API.Video LiveStream module is using external native library for broadcasting

| Plugin | README |
| ------ | ------ |
| VideoUploaderIos | [VideoUploaderIos] |
| android-video-uploader | [android-video-uploader] |

### FAQ
If you have any questions, ask us here:  https://community.api.video .
Or use [Issues].

### Example App
You can try our [example app](https://github.com/apivideo/react-native-api-video-uploader/tree/main/example), feel free to test it. 

## License

MIT License
Copyright (c) 2021 api.video

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [VideoUploaderIos]: <https://github.com/apivideo/VideoUploaderIos>
   [android-video-uploader]: <https://github.com/apivideo/android-video-uploader>
   [Issues]: <https://github.com/apivideo/react-native-api-video-uploader/issues>

