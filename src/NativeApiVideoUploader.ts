import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  setApplicationName: (name: string, version: string) => void;
  setEnvironment: (environment: string) => void;
  setApiKey: (apiKey: string) => void;
  setChunkSize: (size: number) => Promise<number>;
  setTimeout: (timeout: number) => void;

  uploadWithUploadToken: (
    token: string,
    filepath: string,
    videoId?: string
  ) => Promise<String>;
  upload: (videoId: string, filepath: string) => Promise<String>;

  // Progressive upload
  /**
   * Create a new session for progressive upload.
   * @param sessionId - The session id. Must be unique.
   */
  createProgressiveUploadSession: (sessionId: string, videoId: string) => void;
  /**
   * Create a new session for progressive upload with upload token.
   * @param sessionId - The session id. Must be unique.
   */
  createProgressiveUploadWithUploadTokenSession: (
    sessionId: string,
    token: string,
    videoId?: string
  ) => void;

  uploadPart: (sessionId: string, filepath: string) => Promise<String>;
  uploadLastPart: (sessionId: string, filepath: string) => Promise<String>;

  disposeProgressiveUploadSession: (sessionId: string) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ApiVideoUploader');
