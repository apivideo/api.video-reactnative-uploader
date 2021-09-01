import { NativeModules } from 'react-native';

type ApiVideoUploaderType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ApiVideoUploader } = NativeModules;

export default ApiVideoUploader as ApiVideoUploaderType;
