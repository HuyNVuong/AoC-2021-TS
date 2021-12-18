import { INPUT } from "./inputs/day15.input";
import { PriorityQueue } from "./utils/data_structures";

const map = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.split('\n').map(line => line.split('').map(Number));

interface Node {
  key: string,
  distance: number,
}

const adjacent = (x: number, y: number) => [
  [x + 1, y],
  [x - 1, y],
  [x, y - 1],
  [x, y + 1],
];

const dijkstra = (map: number[][], start: string) => {
  const graph = new Map<string, Node[]>();
  const m = map.length;
  const n = map[0].length;
  
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const key = `(${x},${y})`;
      graph.set(key, []);
      for (const [ax, ay] of adjacent(x, y)) {
        if (ax >= 0 && ax < n && ay >= 0 && ay < m) {
          graph.get(key)!.push({
            key: `(${ax},${ay})`, 
            distance: map[ay][ax]
          });
        }
      }
    }
  }

  const pq = new PriorityQueue<Node>((a, b) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  });

  const seen = new Set([start]);
  pq.push({key: start, distance: 0});
  while(pq.any()) {
    const {key, distance} = pq.pop()!;
    if (key === `(${n-1},${m-1})`) {
      return distance;
    }

    for (const neighbor of graph.get(key)!) {
     
      if (!seen.has(neighbor.key)) {
        pq.push({
          key: neighbor.key, 
          distance: distance + neighbor.distance,
        });
        seen.add(neighbor.key);
      }    
    }
  }

  return -1;
};

const part01 = (map: number[][]) => {
  return dijkstra(map, '(0,0)');
}

const part02 = (map: number[][]) => {
  const m = map.length;
  const n = map[0].length;
  
  const B = [] as number[][];
  for (let i = 0; i < m * 5; i++) {
    B.push(new Array(n*5).fill(0));
  }
  
  for (let ir = 0; ir < 5; ir++) {
    for (let jr = 0; jr < 5; jr++) {
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          const value = map[i][j] + ir + jr
          B[i+ir*m][j+jr*n] = (value) > 9
            ? value % 10 + 1
            : value;
        }
      }
    }
  }

  return dijkstra(B, '(0,0)');
};

console.log(part01(map));
console.log(part02(map));


