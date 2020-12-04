type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
type Mp3CbrValues =
  | 8
  | 16
  | 24
  | 32
  | 40
  | 48
  | 64
  | 80
  | 96
  | 112
  | 128
  | 160
  | 192
  | 224
  | 256
  | 320;
type Mp3Params = XOR<
  {
    bitrate?: Mp3CbrValues;
  },
  {
    vbrQuality?: number;
  }
>;
export type EncoderOptions = {
  sampleRate?: number;
  channels?: 1 | 2;
  vbrQuality?: number;
} & Mp3Params;
