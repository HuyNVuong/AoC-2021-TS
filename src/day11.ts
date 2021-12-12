import { INPUT } from "./inputs/day11.input";

const octopuses = INPUT.split('\n').map(line =>
  line.split('').map(Number));

const neighbors = (x: number, y: number): number[][] => {
  return ([
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y + 1],
  ]).filter(([x, y]) => x >= 0 && y >= 0 && x < 10 && y < 10);
};

const incrementEnergy = (octopuses: number[][]) => {
  for (let y = 0; y < octopuses.length; y++) {
    for (let x = 0; x < octopuses[y].length; x++) {
      octopuses[y][x]++;
    }
  }
};

const getFlashes = (octopuses: number[][]) =>
  octopuses.reduce((indexes, row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] > 9) indexes.push([x, y]);
    }

    return indexes;
  }, [] as number[][]);

const spreadEnergy = (flashes: number[][], octopuses: number[][]) => {
  for (const [x, y] of flashes) {
    for (const [nx, ny] of neighbors(x, y)) {
      if (octopuses[ny][nx] <= 9 && octopuses[ny][nx] > 0) {
        octopuses[ny][nx]++;
      }
    }
    octopuses[y][x] = 0;
  } 
};

const part01 = (octopuses: number[][]) => {
  let flashesCount = 0;
  for (let steps = 0; steps < 100; steps++) {
    let hasFlashes = false;
    incrementEnergy(octopuses);
    do {
      const flashes = getFlashes(octopuses);
      flashesCount += flashes.length;
      hasFlashes = flashes.length > 0;
      spreadEnergy(flashes, octopuses);
    } while(hasFlashes);
  }

  return flashesCount;
};

const part02 = (octopuses: number[][]) => {
  let steps = 0;
  while(true) {
    if (octopuses.every(line => line.every(o => o === 0))) {
      return steps;
    }
    let hasFlashes = false;
    incrementEnergy(octopuses);
    do {
      const flashes = getFlashes(octopuses);
      hasFlashes = flashes.length > 0;
      spreadEnergy(flashes, octopuses);
    } while(hasFlashes);
    steps++;
  }
};

console.log(part01([...octopuses.map(line => [...line])]));
console.log(part02([...octopuses.map(line => [...line])]));