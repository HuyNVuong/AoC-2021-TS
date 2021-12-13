import { INPUT } from "./inputs/day13.input";

const [coordinates, foldsRaw] = INPUT.split(/\n\s*\n/);

interface Point {
  key: string,
  x: number,
  y: number,
}

interface Fold {
  direction: string,
  position: number,
}

const points = coordinates.split('\n').reduce((map, line) => {
  const [x, y] = line.split(',');
  const key = `(${x},${y})`;
  map.set(key, {key, x: Number(x), y: Number(y)});

  return map;
}, new Map<string, Point>());

const folds = foldsRaw.split('\n').map(line => {
  const [,, raw] = line.split(' ');
  const [direction, position] = raw.split('=');

  return {direction, position: Number(position)};
});

const foldMap = (points: Map<string, Point>, fold: Fold) => {
  const {direction, position} = fold;
  if (direction === 'x') {
    for (const {key, x, y} of Array.from(points.values())) {
      if (x < position) {
        continue;
      } else {
        points.delete(key);
        const newPosX = position - (x - position);
        const newKey = `(${newPosX},${y})`;
        if (points.has(newKey)) continue;
        points.set(newKey, {key: newKey, x: newPosX, y});
      }
    }
  } else {
    for (const {key, x, y} of Array.from(points.values())) {
      if (y < position) {
        continue;
      } else {
        points.delete(key);
        const newPosY = position - (y - position);
        const newKey = `(${x},${newPosY})`;
        if (points.has(newKey)) continue;
        points.set(newKey, {key: newKey, x, y: newPosY});
      }
    }
  }
};

const part01 = (points: Map<string, Point>, fold: Fold) => {
  const folded = new Map<string, Point>();
  for (const p of Array.from(points.keys())) {
    const {key, x, y} = points.get(p)!;
    folded.set(p, {key, x, y});
  }
  foldMap(folded, fold);
  
  return folded.size;
};

const part02 = (points: Map<string, Point>, folds: Fold[]) => {
  const folded = new Map<string, Point>();
  for (const p of Array.from(points.keys())) {
    const {key, x, y} = points.get(p)!;
    folded.set(p, {key, x, y});
  }
  for (const fold of folds) {
    foldMap(folded, fold);
  }
  const minX = Math.min(...Array.from(folded.values()).map(({x}) => x));
  const maxX = Math.max(...Array.from(folded.values()).map(({x}) => x));
  const minY = Math.min(...Array.from(folded.values()).map(({y}) => y));
  const maxY = Math.max(...Array.from(folded.values()).map(({y}) => y));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      process.stdout.write(folded.has(`(${x},${y})`) ? '#' : ' ');
    }
    console.log('');
  }
};

console.log(part01(points, folds[0]));
part02(points, folds);

