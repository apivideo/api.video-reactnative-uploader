import { NativeModules } from 'react-native';
import type { Video } from './video-type';

const { ApiVideoUploader } = NativeModules;
export default {
  upload: (
    token: string,
    filename: string,
    filepath: string
  ): Promise<Video> => {
    return ApiVideoUploader.upload(token, filename, filepath).then(
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
