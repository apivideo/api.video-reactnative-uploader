import { NativeModules } from 'react-native';
import type { Video } from './video-type';

const { ApiVideoUploader } = NativeModules;
export default {
  uploadWithUploadToken: (token: string, filepath: string): Promise<Video> => {
    return ApiVideoUploader.uploadWithUploadToken(token, filepath).then(
      (value: string) => {
        console.log(`return value`, value);
        const json = JSON.parse(value);

        return {
          ...json,
          _public: json['public'],
        } as Video;
      }
    );
  },
};
