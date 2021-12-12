import { INPUT, TEST_DATA } from "./inputs/day08.input";

interface Entry {
  patterns: string[],
  output: string[]
}

const entries = INPUT.split('\n').map((raw) => {
  const entry = raw.split(' | ').map(parts => parts.split(' '));

  return {patterns: entry[0], output: entry[1]};
});

const part01 = (entries: Entry[]): number => {
  const total = entries.reduce((count, {output}) => 
      output.filter(output => new Set([2,3,4,7]).has(output.length)).length + count, 0);

  return total;
};

const containsPartial = (str: string, subStr: string): boolean => {
  const strLookup = new Set(str.split(''));
  return subStr.split('').every(c => strLookup.has(c));
};

const sameCharCount = (a: string, b: string): number => {
  const aLookup = new Set(a.split(''));
  return b.split('').filter(c => aLookup.has(c)).length;
}

const sortString = (str: string) => str.split('').sort().join('');

// Let's do some deduction
// 0 and 9 has length of 6 contains all character in 7
// 6 has length of 6 and only have 2 matching character with 7
// 9 has length of 6 and has all character in 7 and all character in 4
// all characters of 5 is in 6
// 2 and 5 share only 3 same character
// 3 is the remaining
// All number must be found in order
const part02 = (entries: Entry[]): number => {
  const total = entries.reduce((sum, {patterns, output}) => {
    const one = sortString(patterns.filter(pattern => pattern.length === 2)[0]);
    const four = sortString(patterns.filter(pattern => pattern.length === 4)[0]);
    const seven = sortString(patterns.filter(pattern => pattern.length === 3)[0]);
    const eight = sortString(patterns.filter(pattern => pattern.length === 7)[0]);
    const six = sortString(patterns.filter(pattern => 
      !containsPartial(pattern, seven) && pattern.length === 6)[0]);
    const nine = sortString(patterns.filter(pattern => containsPartial(pattern, seven) &&
      containsPartial(pattern, four) && pattern.length === 6)[0]);
    const zero = sortString(patterns.filter(pattern => sortString(pattern) !== six &&
      sortString(pattern) !== nine && pattern.length === 6)[0]);
    const five = sortString(patterns.filter(pattern => 
      containsPartial(six, pattern) && pattern.length === 5)[0]);
    const two = sortString(patterns.filter(pattern => 
      sameCharCount(pattern, five) === 3 && pattern.length === 5)[0]);
    const three = sortString(patterns.filter(pattern => {
      const sorted = sortString(pattern);
      return sorted !== one && sorted !== two && sorted !== four &&
        sorted !== five && sorted !== six && sorted !== seven &&
        sorted !== eight && sorted !== nine && sorted !== zero;
    })[0]);
    
    let outputValue = 0;
    let shift = 1000;
    for (const code of output) {
      let value = 0;
      switch(sortString(code)) {
        case zero: 
          value = 0;
          break;
        case one:
          value = 1;
          break;
        case two:
          value = 2;
          break;
        case three:
          value = 3;
          break;
        case four: 
          value = 4;
          break;
        case five:
          value = 5;
          break;
        case six:
          value = 6;
          break;
        case seven:
          value = 7;
          break;
        case eight:
          value = 8;
          break;
        case nine:
          value = 9;
          break;
        default:
          break;
      }
      outputValue += (value * shift);
      shift /= 10;
    }

    return sum + outputValue;
  }, 0);

  return total;
};

console.log(part01(entries));
console.log(part02(entries));