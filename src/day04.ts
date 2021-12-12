import { INPUT } from "./inputs/day04.input";

interface Point {
  x: number,
  y: number,
  played: boolean,
}

interface Winner {
  id: number,
  lastNumberCalled: number,
}

const groups = INPUT.split(/\n\s*\n/);
const moves = groups.splice(0, 1)[0].split(',').map(Number);
const boards = groups.map(raw => {
  const board = raw.split('\n').map(line => 
    line.split(' ').filter(el => el !== '').map(Number));
  const numberToPoint = new Map<number, Point>();
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      numberToPoint.set(board[y][x], {x, y, played: false});
    }
  }

  return numberToPoint;
});

const playBingo = (
  moves: number[], 
  boards: Map<number, Point>[],
  wantToWin: boolean = true
): Winner => {
  const marks: Map<string, number>[] = [];
  for (let i = 0; i < boards.length; i++) marks.push(new Map<string, number>());
  const winners = new Set<number>();
  for (const move of moves) {
    for (let i = 0; i < boards.length; i++) {
      if (winners.has(i)) continue;
      if (!boards[i].has(move)) continue;
      const {x, y} = boards[i].get(move)!;
      const rowKey = `r${y}`;
      const columnKey = `c${x}`;
      if (!marks[i].has(rowKey)) marks[i].set(rowKey, 0);
      if (!marks[i].has(columnKey)) marks[i].set(columnKey, 0);
      marks[i].set(rowKey, marks[i].get(rowKey)! + 1);
      marks[i].set(columnKey, marks[i].get(columnKey)! + 1);
      boards[i].set(move, {...boards[i].get(move)!, played: true});
      if (marks[i].get(rowKey) === 5 || marks[i].get(columnKey) === 5) {
        if (wantToWin) {
          return {id: i, lastNumberCalled: move};
        }
        winners.add(i);
        if (winners.size === boards.length) {
          return {id: i, lastNumberCalled: move};
        }
      }        
    }
  }
  
  return {id: -1, lastNumberCalled: -1};
}

const computeUnplayedSum = (winnerBoard: Map<number, Point>): number => {
  let unPlayedSum = 0;
  for (const entry of Array.from(winnerBoard.entries())) {
    const {played} = entry[1];
    if (!played) {
      unPlayedSum += entry[0];
    }
  }

  return unPlayedSum
}

const part01 = (moves: number[], boards: Map<number, Point>[]): number => {
  const {id, lastNumberCalled} = playBingo(moves, boards);
  const unPlayedSum = computeUnplayedSum(boards[id]);

  return unPlayedSum * lastNumberCalled;
};

const part02 = (moves: number[], boards: Map<number, Point>[]): number => {
  const {id, lastNumberCalled} = playBingo(moves, boards, false);
  const unPlayedSum = computeUnplayedSum(boards[id]);

  return unPlayedSum * lastNumberCalled;
};


console.log(part01(moves, [...boards]));
console.log(part02(moves, [...boards]));