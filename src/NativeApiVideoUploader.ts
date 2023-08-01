import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    readonly getConstants: () => {};

    setApplicationName: (name: string, version: string) => void;
    setEnvironment: (environment: string) => void;
    setApiKey: (apiKey: string) => void;
    setChunkSize: (size: number) => Promise<number>;
    uploadWithUploadToken: (token: string, filepath: string) => Promise<String>;
    upload: (videoId: string, filepath: string) => Promise<String>;
}
  
export default TurboModuleRegistry.getEnforcing<Spec>('ApiVideoUploader');
