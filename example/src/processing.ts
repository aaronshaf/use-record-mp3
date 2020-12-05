const sum = (array: Array<number>) =>
  array.reduce((total, value) => total + value, 0);
const average = (array: Array<number>) => sum(array) / array.length;

const TRIM_SIZE = 6000;
const ROLLING_AVERAGE_SIZE = 50;

// fruits.shift() take from front
// fruits.push()

export const trimBeginningSilence = (data: Float32Array) => {
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

export const trimEndingSilence = (data: Float32Array) => {
  const TRIM_THRESHOLD = 0.005;
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

export const trim = (data: Float32Array) => {
  const trimmedData = trimEndingSilence(trimBeginningSilence(data));
  return trimmedData;
};
