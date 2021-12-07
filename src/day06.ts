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
// const stimulateFish = (fish: number, daysLeft: number) => {
//   const queue: Fish[] = [{daysToSpawn: fish + 1, daysLeft}];
//   let fishCount = 1;
//   while (queue.length > 0) {
//     const {daysToSpawn, daysLeft} = queue.shift()!;
//     const daysLeftAfterSpawn = daysLeft - daysToSpawn;
//     if (daysLeftAfterSpawn >= 0) {
//       queue.push({daysToSpawn: 7, daysLeft: daysLeftAfterSpawn});
//       queue.push({daysToSpawn: 9, daysLeft: daysLeftAfterSpawn});
//       fishCount++;
//     }
//   }

//   return fishCount;
// };

// const part01 = (fishes: number[], daysLeft: number) => {
//   const uniqueFish = new Map<number, number>();
//   for (const fish of fishes) {
//     if (!uniqueFish.has(fish)) uniqueFish.set(fish, 0);
//     uniqueFish.set(fish, uniqueFish.get(fish)! + 1);
//   }

//   let fishCount = 0;
//   for (const fish of uniqueFish.keys()) {
//     fishCount += stimulateFish(fish, daysLeft) * uniqueFish.get(fish)!;
//   }

//   return fishCount;
// };

// console.log(part01(fishes, 80));
// console.log(part01(fishes, 256));