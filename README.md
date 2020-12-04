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
  const { isRecording, setIsRecording, blobUrl, channelData } = useRecordMp3(
    stream,
    {
      sampleRate: 48000,
      channels: 1,
      vbrQuality: 2, // 1 (highest) to 9 (lowest)
    }
  );
  // ...
};
```

## License

MIT © [aaronshaf](https://github.com/aaronshaf)
