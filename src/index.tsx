import { NativeModules, Platform } from 'react-native';
import type { Environment, Video } from './ApiVideoUploaderTypes';

const LINKING_ERROR =
  `The package '@api.video/react-native-video-uploader' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ApiVideoUploaderModule = isTurboModuleEnabled
  ? require('./NativeApiVideoUploader').default
  : NativeModules.ApiVideoUploader;

const ApiVideoUploader = ApiVideoUploaderModule
  ? ApiVideoUploaderModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default {
  setApplicationName: (name: string, version: string): void => {
    ApiVideoUploader.setApplicationName(name, version);
  },
  setEnvironment: (environment: Environment): void => {
    ApiVideoUploader.setEnvironment(environment);
  },
  setApiKey: (apiKey: string): void => {
    ApiVideoUploader.setApiKey(apiKey);
  },
  setChunkSize: (size: number): Promise<Number> => {
    return ApiVideoUploader.setChunkSize(size);
  },
  /**
   * Set the timeout for the upload, connection and read in seconds.
   * @param timeout The timeout in seconds
   */
  setTimeout: (timeout: number): void => {
    return ApiVideoUploader.setTimeout(timeout);
  },
  uploadWithUploadToken: (token: string, filepath: string): Promise<Video> => {
    return ApiVideoUploader.uploadWithUploadToken(token, filepath).then(
      (value: string) => {
        const json = JSON.parse(value);

        return {
          ...json,
          _public: json.public,
        } as Video;
      }
    );
  },
  upload: (videoId: string, filepath: string): Promise<Video> => {
    return ApiVideoUploader.upload(videoId, filepath).then((value: string) => {
      const json = JSON.parse(value);

      return {
        ...json,
        _public: json.public,
      } as Video;
    });
  },
};
