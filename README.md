# use-record-mp3

Record MP3s in React using hooks

## Install

```bash
npm i use-record-mp3
```

## Usage

```tsx
import useUserMedia from 'react-use-user-media'
import useRecordMp3 from 'use-record-mp3'

const Example = () => {
  const { stream } = useUserMedia(constraints)
  const { isRecording, setIsRecording, blobUrl, channelData } = useRecordMp3(
    stream
  )
  // ...
}
```

## License

MIT © [aaronshaf](https://github.com/aaronshaf)
