export enum Environment {
  Sandbox = 'https://sandbox.api.video',
  Production = 'https://ws.api.video',
}

export interface Video {
  /**
   * The unique identifier of the video object.
   */
  videoId: string;
  /**
   * When an webhook was created, presented in ISO-8601 format.
   */
  createdAt: Date;
  /**
   * The title of the video content.
   */
  title: string;
  /**
   * A description for the video content.
   */
  description: string;
  /**
   * The date and time the API created the video. Date and time are provided using ISO-8601 UTC format.
   */
  publishedAt: Date;
  /**
   * The date and time the video was updated. Date and time are provided using ISO-8601 UTC format.
   */
  updatedAt: Date;
  /**
   * The date and time the video was discarded. Date and time are provided using ISO-8601 UTC format.
   */
  discardedAt?: Date;
  /**
   * The date and time the video will be permanently deleted. Date and time are provided using ISO-8601 UTC format.
   */
  deletesAt?: Date;
  /**
   * Returns `true` for videos you discarded.
   */
  discarded: boolean;
  /**
   *  Returns the language of a video in [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
   */
  language?: Intl.Locale;
  /**
   *  Returns the origin of the last update on the video's `language` attribute.
   */
  languageOrigin?: LanguageOrigin;
  /**
   * One array of tags (each tag is a string) in order to categorize a video. Tags may include spaces.
   */
  tags: Array<string>;
  /**
   * Metadata you can use to categorise and filter videos. Metadata is a list of dictionaries, where each dictionary represents a key value pair for categorising a video.
   */
  metadata: Array<Metadata>;
  source: VideoSource;
  assets: VideoAssets;
  /**
   * The id of the player that will be applied on the video.
   */
  playerId?: string;
  /**
   * Defines if the content is publicly reachable or if a unique token is needed for each play session.
   */
  _public: boolean;
  /**
   * Defines if video is panoramic.
   */
  panoramic: boolean;
  /**
   * This lets you know whether mp4 is supported. If enabled, an mp4 URL will be provided in the response for the video.
   */
  mp4Support: boolean;
}
interface Metadata {
  /**
   * The constant that defines the data set.
   */
  key?: string;
  /**
   * A variable which belongs to the data set.
   */
  value?: string;
}
interface VideoSource {
  /**
   * The URL where the video is stored.
   */
  uri?: string;
  type?: string;
  liveStream?: VideoSourceLiveStream;
}
interface VideoSourceLiveStream {
  /**
   * The unique identifier for the live stream.
   */
  liveStreamId?: string;
  links?: Array<VideoSourceLiveStreamLink>;
}
interface VideoSourceLiveStreamLink {
  rel?: string;
  uri?: string;
}
interface VideoAssets {
  /**
   * This is the manifest URL. For HTTP Live Streaming (HLS), when a HLS video stream is initiated, the first file to download is the manifest. This file has the extension M3U8, and provides the video player with information about the various bitrates available for streaming.
   */
  hls?: string;
  /**
   * Code to use video from a third party website
   */
  iframe?: string;
  /**
   * Raw url of the player.
   */
  player?: string;
  /**
   * Poster of the video.
   */
  thumbnail?: string;
  /**
   * Available only if mp4Support is enabled. Raw mp4 url.
   */
  mp4?: string;
}

enum LanguageOrigin {
  api = 'api',
  auto = 'auto',
}
