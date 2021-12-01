import {INPUT} from './day01.input';

const depths = INPUT.split('\n').map(Number);

const part01 = (depths: number[]): number => {
  let measurementCount = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      measurementCount++;
    }
  }

  return measurementCount;
}

const part02 = (depths: number[]): number => {
  let sum = depths[0] + depths[1] + depths[2];
  const threeSums = [sum];
  for (let i = 3; i < depths.length; i++) {
    sum = sum + depths[i] - depths[i - 3];
    threeSums.push(sum);
  }

  return part01(threeSums);
}

console.log(part01(depths));
console.log(part02(depths));