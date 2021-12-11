import { INPUT } from "./day09.input";

interface Location {
  x: number,
  y: number,
  key: string,
  value: number,
  adjacents: string[],
}

const keyOf = (x: number, y: number) => `(${x},${y})`;

const locations = INPUT.split('\n')
  .map((line, y) => line.split('').map((value, x) => {
    const adjacents = [
      keyOf(x + 1, y), 
      keyOf(x - 1, y),
      keyOf(x, y - 1),
      keyOf(x, y + 1),
    ];
    return {x, y, key: keyOf(x, y), value: Number(value), adjacents};
  }))
  .flatMap(el => el)
  .reduce((map, location) => map.set(location.key, location)
    , new Map<string, Location>());

const findLowPoint = (locations: Map<string, Location>): Location[] => 
  Array.from(locations.values()).filter(({value, adjacents}) =>
    adjacents.filter(loc => locations.has(loc))
      .every(loc => locations.get(loc)!.value > value));

const part01 = (locations: Map<string, Location>) => 
  findLowPoint(locations).reduce((sum, loc) => sum + loc.value + 1, 0);

const findBasin = (location: Location, locations: Map<string, Location>): number => {
  const seen = new Set<string>([location.key]);
  const queue = [location];
  while (queue.length > 0) {
    const {adjacents} = queue.shift()!;
    for (const neighbor of adjacents.filter(adj => 
      locations.has(adj) && !seen.has(adj) && locations.get(adj)!.value !== 9)
    ) {
      seen.add(neighbor);
      queue.push(locations.get(neighbor)!);
    }
  }

  return seen.size;
};

const part02 = (locations: Map<string, Location>): number => {
  const basinValues = findLowPoint(locations)
    .map(location => {
      const lowPointBasinValue = findBasin(location, locations);
      return lowPointBasinValue; 
    });
  basinValues.sort((a, b) => b - a);

  return basinValues[0] * basinValues[1] * basinValues[2];
};

console.log(part01(locations));
console.log(part02(locations));