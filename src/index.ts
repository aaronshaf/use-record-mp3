import { flattenArray } from "./utils";
import useConvert from "./convert";
import { useState, useEffect, useRef } from "react";
import { EncoderOptions } from "./typings";

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

const bufferSize = 2048;
const numberOfInputChannels = 1;
const numberOfOutputChannels = 1;

const useRecordMp3 = (stream: any, encoderOptions: EncoderOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setisRecordingPaused] = useState(false);
  const [
    mediaStream,
    setMediaStream,
  ] = useState<MediaStreamAudioSourceNode | null>(null);
  const [recorder, setRecorder] = useState<ScriptProcessorNode | null>(null);
  const recordingLength = useRef(0);
  const leftChannel = useRef<Array<Float32Array>>([]);

  const [channelData, setChannelData] = useState<Float32Array | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  // TODO: stop mutating object?
  if (stream && !encoderOptions.sampleRate) {
    encoderOptions.sampleRate = stream
      .getAudioTracks()[0]
      .getCapabilities().sampleRate.max;
  }

  const [blobUrl, blob]: any = useConvert(channelData, encoderOptions);

  const startRecording = () => {
    if (!stream) return;

    setIsRecording(true);
    if (!isRecordingPaused) {
      recordingLength.current = 0;
      leftChannel.current = [];
    }
    setisRecordingPaused(false);

    audioContext.current = new AudioContext({
      sampleRate: encoderOptions.sampleRate,
    });
    const context = audioContext.current;

    // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
    // bufferSize: the onaudioprocess event is called when the buffer is full
    let recorder: ScriptProcessorNode;
    if (context.createScriptProcessor) {
      recorder = context.createScriptProcessor(
        bufferSize,
        numberOfInputChannels,
        numberOfOutputChannels
      );
    } else {
      recorder = (context as any).createJavaScriptNode(
        bufferSize,
        numberOfInputChannels,
        numberOfOutputChannels
      );
    }

    recorder.onaudioprocess = function (e: any) {
      const leftChannelData = new Float32Array(e.inputBuffer.getChannelData(0));
      leftChannel.current.push(leftChannelData);
      // rightchannel.push(
      //   new Float32Array(e.inputBuffer.getChannelData(1))
      // );
      recordingLength.current = recordingLength.current + bufferSize;
    };

    setRecorder(recorder);
    const mediaStream2 = context.createMediaStreamSource(stream);
    setMediaStream(mediaStream2);
    mediaStream2.connect(recorder);
    recorder.connect(context.destination);
  };

  const pauseRecording = () => {
    setIsRecording(false);
    setisRecordingPaused(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setisRecordingPaused(false);
  };

  const sum = (array: Array<number>) =>
    array.reduce((total, value) => total + value, 0);
  const average = (array: Array<number>) => sum(array) / array.length;

  const TRIM_SIZE = 5000;
  const ROLLING_AVERAGE_SIZE = 50;

  // fruits.shift() take from front
  // fruits.push()

  const trimBeginningSilence = (data: Float32Array) => {
    const TRIM_THRESHOLD = 0.02;
    const rollingAverageArray = [];
    for (let index = 0; index < data.length; index++) {
      rollingAverageArray.push(Math.abs(data[index]));
      if (rollingAverageArray.length > ROLLING_AVERAGE_SIZE) {
        rollingAverageArray.shift();
      }
      if (average(rollingAverageArray) > TRIM_THRESHOLD) {
        return data.slice(index > TRIM_SIZE ? index - TRIM_SIZE : 0);
      }
    }
    return data;
  };

  const trimEndingSilence = (data: Float32Array) => {
    const TRIM_THRESHOLD = 0.0075;
    const rollingAverageArray = [];
    for (let index = data.length; index > 0; index--) {
      rollingAverageArray.push(Math.abs(data[index]));
      if (rollingAverageArray.length > ROLLING_AVERAGE_SIZE) {
        rollingAverageArray.shift();
      }

      if (average(rollingAverageArray) > TRIM_THRESHOLD) {
        return data.slice(
          0,
          index < data.length - TRIM_SIZE ? index + TRIM_SIZE : data.length
        );
      }
    }
    return data;
  };

  useEffect(() => {
    if (isRecording === false) {
      if (recorder && mediaStream && audioContext.current) {
        recorder && recorder.disconnect(audioContext.current.destination);
        mediaStream && mediaStream.disconnect(recorder);
        const data = flattenArray(leftChannel.current, recordingLength.current);
        const trimmedData = trimEndingSilence(trimBeginningSilence(data));
        setChannelData(trimmedData);
      }
    }
  }, [isRecording]);

  return {
    isRecording,
    isRecordingPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    blobUrl,
    blob,
    channelData,
  };
};

export default useRecordMp3;
