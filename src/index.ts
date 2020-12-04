import { flattenArray } from "./utils";
import useConvert from "./convert";
import { useState, useEffect, useRef } from "react";

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

const bufferSize = 2048;
const numberOfInputChannels = 1;
const numberOfOutputChannels = 1;

const useRecordMp3 = (stream: any) => {
  const [isRecording, setIsRecording] = useState(false);

  const [
    mediaStream,
    setMediaStream,
  ] = useState<MediaStreamAudioSourceNode | null>(null);
  const [recorder, setRecorder] = useState<ScriptProcessorNode | null>(null);
  const recordingLength = useRef(0);
  const leftChannel = useRef<Array<Float32Array>>([]);

  const [channelData, setChannelData] = useState<Float32Array | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const [blobUrl, blob]: any = useConvert(channelData);

  useEffect(() => {
    if (isRecording && stream) {
      setChannelData(null);

      audioContext.current = new AudioContext();
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
        const leftChannelData = new Float32Array(
          e.inputBuffer.getChannelData(0)
        );
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
    } else if (isRecording === false) {
      if (recorder && mediaStream && audioContext.current) {
        recorder && recorder.disconnect(audioContext.current.destination);
        mediaStream && mediaStream.disconnect(recorder);
        const data = flattenArray(leftChannel.current, recordingLength.current);
        setChannelData(data);
      }
    }
  }, [isRecording]);

  return { isRecording, setIsRecording, blobUrl, blob, channelData };
};

export default useRecordMp3;
