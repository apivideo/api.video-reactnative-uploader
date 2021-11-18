[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-reactnative-uploader?style=social)](https://github.com/apivideo/api.video-reactnative-uploader) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)
![npm](https://img.shields.io/npm/v/@api.video/react-native-api-video-uploader) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
<h1 align="center">api.video React Native video uploader module</h1>

[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.


# Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Code sample](#code-sample)
- [Plugins](#plugins)
- [FAQ](#faq)
- [Example App](#example-app)

# Project description


This module is an easy way to upload video with delegated token to Api.Video

# Getting started

## Installation

```sh
npm install @api.video/react-native-api-video-uploader
```
or
```sh
yarn add @api.video/react-native-api-video-uploader
```
_Note: if you are on iOS, you will need two extra steps:_
1) Don't forget to install the native dependencies with Cocoapods
```sh
cd ios && pod install
```
2) This project contains swift code, and if it's your first dependency with swift code, you need to create an empty swift file in your project (with the bridging header) from XCode. [Find how to do that](docs/install_swift_dependency.md)

## Code sample

```js
import ApiVideoUploader from "@api.video/react-native-api-video-uploader";

// ...

ApiVideoUploader.upload("YOUR_TOKEN", "VIDEO_NAME", "FILE_PATH").then((value: Video) =>{
    console.log(`video : `, value)
});
```

# Plugins

API.Video LiveStream module is using external native library for broadcasting

| Plugin | README |
| ------ | ------ |
| VideoUploaderIos | [VideoUploaderIos] |
| android-video-uploader | [android-video-uploader] |

# FAQ
If you have any questions, ask us here:  https://community.api.video .
Or use [Issues].

# Example App
You can try our [example app](https://github.com/apivideo/api.video-reactnative-uploader/tree/master/example), feel free to test it. 


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [VideoUploaderIos]: <https://github.com/apivideo/VideoUploaderIos>
   [android-video-uploader]: <https://github.com/apivideo/android-video-uploader>
   [Issues]: <https://github.com/apivideo/api.video-reactnative-uploader/issues>

