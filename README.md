# use-record-mp3

Record MP3s in React using hooks

## Install

```bash
npm i use-record-mp3
```

## Usage

```tsx
import useUserMedia from "react-use-user-media";
import useRecordMp3 from "use-record-mp3";

const Example = () => {
  const { stream } = useUserMedia({ audio: true });
  const {
    isRecording,
    startRecording,
    stopRecording,
    blobUrl,
    channelData,
  } = useRecordMp3(stream, {
    sampleRate: 48000,
    channels: 1,
    vbrQuality: 2, // 1 (highest) to 9 (lowest)
  });

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop" : "Record"}
      </button>
      {blobUrl && <audio controls src={blobUrl}></audio>}
    </div>
  );
};
```

Instead of `vbrQuality` you can specify `bitrate` (e.g. 96, 128).

## License

MIT © [aaronshaf](https://github.com/aaronshaf)
