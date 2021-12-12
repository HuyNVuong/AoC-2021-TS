import { INPUT } from "./inputs/day07.input";

const crabs = INPUT.split(',').map(Number);

const min = Math.min(...crabs);
const max = Math.max(...crabs);
let bestFuels = Number.MAX_VALUE;
let bestCrabEngFuels = Number.MAX_VALUE;
for (let i = min; i < max; i++) {
  const fuels = crabs.reduce((sum, el) => sum + Math.abs(el - i), 0);
  const crabEngFuels = crabs.reduce((sum, el) => 
    sum + Math.abs(el - i) * (Math.abs(el - i) + 1) / 2, 0);
  bestFuels = Math.min(bestFuels, fuels);
  bestCrabEngFuels = Math.min(bestCrabEngFuels, crabEngFuels);
}

console.log(bestFuels);
console.log(bestCrabEngFuels);