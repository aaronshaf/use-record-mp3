import React from "react";
import useUserMedia from "react-use-user-media";
import useRecordMp3 from "use-record-mp3";
import ow from "oceanwind";

const constraints = {
  audio: true,
  // audio: {
  //   //   // sampleRate: 48000,
  //   //   // sampleSize: 16,
  //   // channelCount: 2,
  // },
};

// https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
const filterData = (rawData: any) => {
  // const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 1000; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  return filteredData;
};

// const normalizeData = (filteredData: any) => {
//   const multiplier = Math.pow(Math.max(...filteredData), -1)
//   return filteredData.map((n: any) => n * multiplier)
// }

const App = () => {
  const { stream } = useUserMedia(constraints);
  const { isRecording, setIsRecording, blobUrl, channelData } = useRecordMp3(
    stream,
    {
      sampleRate: 48000,
      channels: 1,
      vbrQuality: 2,
    }
  );

  const chart = channelData ? filterData(channelData) : [];
  const chartComponents = chart.map((number: number, index: number) => {
    return (
      <div
        key={index}
        style={{
          width: "0.1%",
          height: `${number * 100}%`,
          backgroundColor: "red",
        }}
      ></div>
    );
  });
  return (
    <div className={ow`p-6`}>
      <button
        className={ow`px-4 py-2 border border-black rounded text-lg`}
        onClick={() => setIsRecording(!isRecording)}
      >
        {isRecording ? "Stop" : "Record"}
      </button>
      {blobUrl && (
        <div className={ow`pt-4`}>
          <audio controls src={blobUrl}></audio>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "300px",
              height: "100px",
            }}
          >
            {chartComponents}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
