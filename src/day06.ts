import { INPUT } from "./day06.input";

const fishes = INPUT.split(',').map(Number);

// 3,4,3,1,2
// [0,1,1,2,1,0,0,0,0]
// [1,1,2,1,0,0,0,0,0]
// [1,2,1,0,0,0,1,0,1]
// .....
const stimulateFish = (fishes: number[], days: number): number => {
  const spawns = Array(9).fill(0);
  for (const fish of fishes) {
    spawns[fish]++;
  }
  for (let i = 0; i < days; i++) {
    const spawners = spawns.shift();
    spawns.push(0);
    spawns[8] += spawners;
    spawns[6] += spawners;
  }

  return spawns.reduce((sum, el) => sum + el, 0);
};

console.log(stimulateFish(fishes, 80));
console.log(stimulateFish(fishes, 256));
