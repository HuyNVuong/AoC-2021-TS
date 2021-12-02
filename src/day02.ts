import { INPUT } from "./day02.input";

interface Command {
  command: string,
  steps: number,
}

const commands: Command[] = INPUT.split('\n').map((raw) => {
  const splits = raw.split(' ');
  return {command: splits[0], steps: Number(splits[1])};
});

const part01 = (commands: Command[]): number => {
  let depth = 0;
  let length = 0;
  for (const {command, steps} of commands) {
    switch(command) {
      case 'forward':
        length += steps;
        break;
      case 'down':
        depth += steps;
        break;
      case 'up':
        depth -= steps;
        break;
    }
  }

  return depth * length;
}

const part02 = (commands: Command[]): number => {
  let x = 0;
  let depth = 0;
  let length = 0;
  for (const {command, steps} of commands) {
    switch(command) {
      case 'forward':
        length += steps;
        depth += (steps * x);
        break;
      case 'down':
        x += steps;
        break;
      case 'up':
        x -= steps;
        break;
    }
  }

  return depth * length;
}

console.log(part01(commands));
console.log(part02(commands));