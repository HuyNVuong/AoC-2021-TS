import { INPUT } from "./day03.input";

const binaries = INPUT.split('\n');

const part01 = (binaries: string[]): number => {
  const n = binaries[0].length;
  let gamma = '';
  let epsilon = '';
  for (let i = 0; i < n; i++) {
    let zeroes = 0;
    let ones = 0;
    for (const bin of binaries) {
      if (bin[i] === '1') ones++;
      if (bin[i] === '0') zeroes++;
    }
    gamma += zeroes > ones ? '0' : '1';
    epsilon += zeroes > ones ? '1': '0';
  } 

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

interface Count {
  zeroes: number,
  ones: number,
}

const countOneAndZero = (binaries: string[]): Count[] => {
  const counts: Count[] = [];
  const n = binaries[0].length;
  for (let i = 0; i < n; i++) {
    let zeroes = 0;
    let ones = 0;
    for (const bin of binaries) {
      if (bin[i] === '1') ones++;
      if (bin[i] === '0') zeroes++;
    }
    counts.push({zeroes, ones});
  }

  return counts;
}

const part02 = (binaries: string[]): number => {
  const n = binaries[0].length;
  let counts: Count[] = [];

  let oxys = [...binaries];
  counts = countOneAndZero(oxys);
  for (let i = 0; i < n; i++) {
    if (oxys.length <= 1) break;
    const {zeroes, ones} = counts[i];
    const mostCommon = zeroes > ones ? '0' : '1';
    oxys = oxys.filter((oxy) => oxy[i] === mostCommon);
    counts = countOneAndZero(oxys);
  }

  let co2s = [...binaries];
  counts = countOneAndZero(co2s);
  for (let i = 0; i < n; i++) {
    if (co2s.length <= 1) break;
    const {zeroes, ones} = counts[i];
    const leastCommon = zeroes <= ones ? '0' : '1';
    co2s = co2s.filter((co2) => co2[i] === leastCommon);
    counts = countOneAndZero(co2s);

  }

  return parseInt(oxys[0], 2) * parseInt(co2s[0], 2);
}

console.log(part01(binaries));
console.log(part02(binaries));