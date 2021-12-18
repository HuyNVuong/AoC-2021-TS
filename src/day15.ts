import { INPUT } from "./inputs/day15.input";
import { PriorityQueue } from "./data_structures/priority_queue";

const map = INPUT.split('\n').map(line => line.split('').map(Number));

interface Node {
  key: string,
  distance: number,
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

  dijkstra(B, '(0,0)');
 
};

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

  const dist = [...graph.keys()].reduce((d, key) => {
    d[key] = Infinity;

    return d;
  }, {} as {[key: string]: number});

  dist[start] = 0;
  const pq = new PriorityQueue<Node>((a: Node, b: Node) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  });

  pq.push({key: start, distance: 0});
  while(pq.any()) {
    const {key, distance} = pq.pop()!;
    if (distance === dist[key]) {
      for (const neighbor of graph.get(key)!) {
        if (distance + neighbor.distance < dist[neighbor.key]) {
          dist[neighbor.key] = distance + neighbor.distance;
          pq.push({
            key: neighbor.key, 
            distance: dist[neighbor.key],
          });
        }
      }
    }
  }

  console.log(dist[`(${m-1},${m-1})`]);
};

const part01 = (map: number[][]) => {
  dijkstra(map, '(0,0)');
}

// part01(map);
part02(map);


