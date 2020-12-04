# use-record-mp3

> Record MP3s in React using hooks

[![NPM](https://img.shields.io/npm/v/use-record-mp3.svg)](https://www.npmjs.com/package/use-record-mp3) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-record-mp3
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
