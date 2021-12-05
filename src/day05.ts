import { INPUT } from "./day05.input"; 

interface Point {
  x: number, 
  y: number,
}

const vents = INPUT.split('\n').map(raw => {
  const ends = raw.split(' -> ').map(e => {
    const point = e.split(',');

    return {x: Number(point[0]), y: Number(point[1])} as Point;
  });
  return ends;
});

const addPointToSet = (x: number, y: number, lines: Map<string, number>) => {
  const key = `(${x},${y})`;
  if (!lines.has(key)) {
    lines.set(key, 0);
  }
  lines.set(key, lines.get(key)! + 1);
}

const buildLinesFromVents = (vents: Point[][], 
  useDiagonal: boolean = false,
): Map<string, number> => {
  const lines = new Map<string, number>();
  for (const vent of vents) {
    if (vent[0].x === vent[1].x) {
      const lineBegin = vent[0].y < vent[1].y ? vent[0].y : vent[1].y;
      const lineEnd = vent[0].y > vent[1].y ? vent[0].y : vent[1].y;
      for (let i = lineBegin; i <= lineEnd; i++) {
        addPointToSet(vent[0].x, i, lines);
      }
    }
    if (vent[0].y === vent[1].y) {
      const lineBegin = vent[0].x < vent[1].x ? vent[0].x : vent[1].x;
      const lineEnd = vent[0].x > vent[1].x ? vent[0].x : vent[1].x;
      for (let i = lineBegin; i <= lineEnd; i++) {
        addPointToSet(i, vent[0].y, lines);
      }
    }
    if (useDiagonal) {
      // 45 degree diagonal points
      if (Math.abs(vent[0].x - vent[1].x) / Math.abs(vent[0].y - vent[1].y) === 1) {
        // ax + by = c => y = (-ax + c) / b
        const a = vent[1].y - vent[0].y;
        const b = vent[0].x - vent[1].x;
        const c = a * vent[0].x + b * vent[0].y;
        const lineBegin = vent[0].x < vent[1].x ? vent[0].x : vent[1].x;
        const lineEnd = vent[0].x > vent[1].x ? vent[0].x : vent[1].x;
        for (let dx = lineBegin + 1; dx < lineEnd; dx++) {
          const dy = (-a * dx + c) / b;
          addPointToSet(dx, dy, lines);
        }
        addPointToSet(vent[0].x, vent[0].y, lines);
        addPointToSet(vent[1].x, vent[1].y, lines);
      }
    }  
  }

  return lines;
}

const part01 = (vents: Point[][]) => {
  const lines = buildLinesFromVents(vents);

  return Array.from(lines.values()).filter(x => x >= 2).length;
}

const part02 = (vents: Point[][]) => {
  const lines = buildLinesFromVents(vents, true);

  return Array.from(lines.values()).filter(x => x >= 2).length;
}

console.log(part01(vents));
console.log(part02(vents));