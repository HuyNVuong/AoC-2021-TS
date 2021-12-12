import { INPUT } from "./inputs/day10.input";

const lines = INPUT.split('\n').map(line => line.split(''));

const openingBrackets = new Set(['[','(','{','<']);
const pair = new Map<string, string>([
  ['(', ')'], 
  ['[', ']'], 
  ['{', '}'],
  ['<', '>'],
]);

const closingBrackets = new Map<string, number>([
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137],
]);

const completeOpeningBrackets = new Map<string, number>([
  ['(', 1], 
  ['[', 2], 
  ['{', 3],
  ['<', 4],
]);

interface CorruptedLine {
  line: string[],
  c: string,
}

const findCorruptedLines = (lines: string[][]): CorruptedLine[] => lines
  .map(line => {
    const stack = [];
    for (const c of line) {
      if (openingBrackets.has(c)) {
        stack.push(c);
      } else if (closingBrackets.has(c)) {
        const openingBracket = stack.pop()!;
        if (c !== pair.get(openingBracket)!) {
          return {line, c};
        }
      }
    }

    return {line, c: ''};
  });

const part01 = (lines: string[][]): number => 
  findCorruptedLines(lines).reduce((sum, {c}) => 
    sum + (closingBrackets.get(c) ?? 0), 0);

const part02 = (lines: string[][]) => 
  findCorruptedLines(lines).reduce((sums, {line, c}) => {
    if (c === '') {
      const stack = [];
      for (const c of line) {
        if (openingBrackets.has(c)) {
          stack.push(c);
        } else if (closingBrackets.has(c)) {
          stack.pop()!;
        }
      }
      let linePoints = 0;

      for (const s of stack.reverse()) {
        linePoints *= 5;
        linePoints += completeOpeningBrackets.get(s)!;
      }
      sums.push(linePoints);
    }
    
    return sums;
  }, [] as number[]);

console.log(part01(lines));
const sums = part02(lines);
sums.sort((a, b) => a - b);
console.log(sums[Math.floor(sums.length / 2)]);