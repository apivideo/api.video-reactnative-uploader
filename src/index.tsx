import { NativeModules, Platform } from 'react-native';
import type { Environment, Video } from './types';

const LINKING_ERROR =
  'The package \'@api.video/react-native-video-uploader\' doesn\'t seem to be linked. Make sure: \n\n' +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-ignore
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

type ProgressiveUploadParams = { videoId: string };
type ProgressiveUploadWithUploadTokenParams = {
  token: string;
  videoId?: string;
};

function isProgressiveUploadWithUploadTokenParams(
  params: ProgressiveUploadWithUploadTokenParams | ProgressiveUploadParams
): params is ProgressiveUploadWithUploadTokenParams {
  return (
    (params as ProgressiveUploadWithUploadTokenParams).token !== 'undefined'
  );
}

function sanitizeVideo(videoJson: string): Video {
  const video = JSON.parse(videoJson);
  return {
    ...video,
    _public: video.public,
  };
}

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
  uploadWithUploadToken: (
    token: string,
    filepath: string,
    videoId?: string
  ): Promise<Video> => {
    return ApiVideoUploader.uploadWithUploadToken(
      token,
      filepath,
      videoId
    ).then((value: string) => sanitizeVideo(value));
  },
  upload: (videoId: string, filepath: string): Promise<Video> => {
    return ApiVideoUploader.upload(videoId, filepath).then((value: string) =>
      sanitizeVideo(value)
    );
  },

  createProgressiveUploadSession: (
    params: ProgressiveUploadWithUploadTokenParams | ProgressiveUploadParams
  ) => {
    return new (class ProgressiveUploadSession {
      #sessionId: string;

      constructor() {
        this.#sessionId = this.#generateSessionId();
        if (isProgressiveUploadWithUploadTokenParams(params)) {
          ApiVideoUploader.createProgressiveUploadWithUploadTokenSession(
            this.#sessionId,
            params.token,
            params.videoId
          );
        } else {
          ApiVideoUploader.createProgressiveUploadSession(
            this.#sessionId,
            params.videoId
          );
        }
      }

      uploadPart(filepath: string): Promise<Video> {
        return ApiVideoUploader.uploadPart(this.#sessionId, filepath).then(
          (value: string) => sanitizeVideo(value)
        );
      }

      uploadLastPart(filepath: string): Promise<Video> {
        return ApiVideoUploader.uploadLastPart(this.#sessionId, filepath).then(
          (value: string) => sanitizeVideo(value)
        );
      }

      dispose() {
        ApiVideoUploader.disposeProgressiveUploadSession(this.#sessionId);
      }

      #generateSessionId() {
        return Math.random().toString(36).substring(2);
      }
    })();
  },
};
