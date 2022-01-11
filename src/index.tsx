import { NativeModules } from 'react-native';
import type { Video } from './video-type';

export enum Environment {
  Sandbox = 'https://sandbox.api.video',
  Production = 'https://ws.api.video',
}

const { ApiVideoUploader } = NativeModules;
export default {
  setEnvironment: (environment: Environment): void => {
    ApiVideoUploader.setEnvironment(environment);
  },
  setApiKey: (apiKey: string): void => {
    ApiVideoUploader.setApiKey(apiKey);
  },
  setChunkSize: (size: number): Promise<Number> => {
    return ApiVideoUploader.setChunkSize(size);
  },
  uploadWithUploadToken: (token: string, filepath: string): Promise<Video> => {
    return ApiVideoUploader.uploadWithUploadToken(token, filepath).then(
      (value: string) => {
        const json = JSON.parse(value);

        return {
          ...json,
          _public: json['public'],
        } as Video;
      }
    );
  },
  upload: (videoId: string, filepath: string): Promise<Video> => {
    return ApiVideoUploader.upload(videoId, filepath).then((value: string) => {
      const json = JSON.parse(value);

      return {
        ...json,
        _public: json['public'],
      } as Video;
    });
  },
};
