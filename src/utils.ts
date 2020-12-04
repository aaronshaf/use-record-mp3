export function flattenArray(channelBuffer: any, recordingLength: number) {
  var result = new Float32Array(recordingLength)
  var offset = 0
  for (var i = 0; i < channelBuffer.length; i++) {
    var buffer = channelBuffer[i]
    result.set(buffer, offset)
    offset += buffer.length
  }
  return result
}

export function convertToArrayBuffer(blob: Blob) {
  const url = URL.createObjectURL(blob)

  return fetch(url).then((response) => {
    return response.arrayBuffer()
  })
}

// function process(data) {
//   const blob = new Blob(data);

//   convertToArrayBuffer(blob)
//     .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
//     .then((audioBuffer) => {
//       const channelData = audioBuffer.getChannelData(0);
//       setChannelData(channelData);
//     });
// }
