import { INPUT } from "./day06.input";

interface Fish {
  daysToSpawn: number,
  daysLeft: number,
}

const fishes = INPUT.split(',').map(Number);

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
