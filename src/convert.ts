import { useEffect, useState, useMemo } from "react";
import { createMp3Encoder } from "wasm-media-encoders";
import { EncoderOptions } from "./typings";

let outBuffer = new Uint8Array(1024 * 1024);

const useConvert = (pcm_l: any, options: EncoderOptions) => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const encoderPromise = useMemo(() => createMp3Encoder(), []);

  useEffect(() => {
    if (!pcm_l) return;
    encoderPromise.then((encoder) => {
      encoder.configure(
        options.bitrate
          ? {
              sampleRate: options.sampleRate || 48000,
              channels: options.channels || 1,
              bitrate: options.bitrate,
            }
          : {
              sampleRate: options.sampleRate || 48000,
              channels: options.channels || 1,
              vbrQuality: options.vbrQuality || 2,
            }
      );

      let offset = 0;
      let moreData = true;

      while (true) {
        const mp3Data = moreData
          ? encoder.encode([
              pcm_l /* Float32Array of left channel PCM data */,
              // pcm_r /* Float32Array of right channel PCM data */,
            ])
          : /* finalize() returns the last few frames */
            encoder.finalize();

        /* mp3Data is a Uint8Array that is still owned by the encoder and MUST be copied */
        if (mp3Data.length + offset > outBuffer.length) {
          const newBuffer = new Uint8Array(mp3Data.length + offset);
          newBuffer.set(outBuffer);
          outBuffer = newBuffer;
        }

        outBuffer.set(mp3Data, offset);
        offset += mp3Data.length;

        if (!moreData) {
          break;
        }

        moreData = false;
      }

      const result = new Uint8Array(outBuffer.buffer, 0, offset);

      const mp3Blob = new Blob([new Uint8Array(result).buffer], {
        type: "audio/mpeg",
      });
      const mp3BlobUrl = URL.createObjectURL(mp3Blob);

      setBlob(mp3Blob);
      setBlobUrl(mp3BlobUrl);
    });
  }, [pcm_l]);

  return [blobUrl, blob];
};

export default useConvert;
