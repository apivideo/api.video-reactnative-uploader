<!--<documentation_excluded>-->
[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-reactnative-uploader?style=social)](https://github.com/apivideo/api.video-reactnative-uploader) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/.github/blob/main/assets/apivideo_banner.png)
![npm](https://img.shields.io/npm/v/@api.video/react-native-video-uploader) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

<h1 align="center">api.video React Native video uploader module</h1>

[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

## Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Android permissions](#android-permissions)
  - [Code sample](#code-sample)
  - [Android notification](#android-notification)
- [Example](#example)
- [Plugins](#plugins)
- [FAQ](#faq)

<!--</documentation_excluded>-->
<!--<documentation_only>
---
title: api.video React Native video uploader
meta: 
  description: The official api.video React Native video uploader for api.video. [api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.
---

# api.video React Native video uploader

[api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

</documentation_only>-->
## Project description

This module is an easy way to upload video with delegated token to api.video

## Getting started

### Installation

```sh
npm install @api.video/react-native-video-uploader
```

or

```sh
yarn add @api.video/react-native-video-uploader
```

_Note: if you are on iOS, you will need two extra steps:_

1. Don't forget to install the native dependencies with Cocoapods

```sh
cd ios && pod install
```

2. This project contains Swift code, and if it's your first dependency with Swift code, you need to create an empty Swift file in your project (with the bridging header) from XCode. [Find how to do that](https://github.com/apivideo/api.video-reactnative-uploader/blob/main/docss/install_swift_dependency.md)

### Android permissions

You must request the following permissions at runtime:
  - `android.permission.READ_MEDIA_VIDEO` for API 33+
  - `android.permission.READ_EXTERNAL_STORAGE` for API < 33 
On Android 33+, the upload comes with a notification. So if your application targets Android 33+, you might request `android.permission.POST_NOTIFICATIONS` permission at runtime.

### Code sample

```js
import ApiVideoUploader from '@api.video/react-native-video-uploader';

ApiVideoUploader.uploadWithUploadToken('MY_VIDEO_TOKEN', 'my-video.mp4')
  .then((value: Video) => {
   // Manages success here
  })
  .catch((e: any) => {
    // Manages error here
  });
```

### Android notification

To customize the notification to your own brand, you have to change the icon, color,... by overwriting the following resources in your own application resources:
  - the icon: `R.drawable.ic_upload_notification`
  - the color: `R.color.upload_notification_color`
  - the channel name: `R.string.upload_notification_channel_name`


## Example

An example that demonstrates how to use the API is provided in folder [example/](https://github.com/apivideo/api.video-reactnative-uploader/tree/main/example).

## Plugins

api.video-reactnative-uploader is using external native library for upload

| Plugin                 | README                   |
| ---------------------- | ------------------------ |
| swift-video-uploader   | [swift-video-uploader]   |
| android-video-uploader | [android-video-uploader] |

## FAQ

If you have any questions, ask [our community](https://community.api.video) or use [Issues].

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[swift-video-uploader]: https://github.com/apivideo/api.video-swift-uploader
[android-video-uploader]: https://github.com/apivideo/api.video-android-uploader
[issues]: https://github.com/apivideo/api.video-reactnative-uploader/issues
