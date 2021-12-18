// Adapt and extent from algoexpert.io 
export class PriorityQueue<T> {
  heap: T[];
  compare: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.compare = comparator;
    this.heap = [];
  }

  push(element: T) {
    this.heap.push(element);
    this.siftUp(this.heap.length - 1);
  }

  peek = () => this.heap[0];

  any = () => this.heap.length > 0;

  size = () => this.heap.length;

  pop() {
    const element = this.heap.shift();
    this.siftDown(0, this.heap.length - 1);

    return element;
  }

  private siftUp(i: number) {
    let p = Math.floor((i - 1) / 2);
    while (i > 0 
      && this.compare(this.heap[i], this.heap[p]) === -1) {
      this.swap(i, p);
      i = p;
      p = Math.floor((i - 1) / 2);
    }
  }

  private siftDown(i: number, e: number) {
    let left = i * 2 + 1;
    while (left <= e) {
      const right = i * 2 + 2 <= e ? i * 2 + 2 : -1;
      let swapIndex;
      if (right !== -1 && this.heap[right] < this.heap[left]) {
        swapIndex = right;
      } else {
        swapIndex = left;
      }
      // const swapIndex = right !== -1 && 
      //   this.compare(this.heap[right], this.heap[left]) === -1
      //     ? right : left;
      if (this.compare(this.heap[swapIndex], this.heap[i]) === -1) {
        this.swap(i, swapIndex);
        i = swapIndex;
        left = i * 2 + 1;
      } else {
        return;
      }
    }
  }

  private swap(i: number, j: number) {
    const temp = this.heap[j];
    this.heap[j] = this.heap[i];
    this.heap[i] = temp;
  }
}
