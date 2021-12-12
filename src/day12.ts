import { INPUT } from "./inputs/day12.input";

const graphs = INPUT.split('\n').reduce((edgeList, line) => {
  const [src, dest] = line.split('-');
  if (!edgeList.has(src)) edgeList.set(src, []);
  if (!edgeList.has(dest)) edgeList.set(dest, []);
  edgeList.get(src)!.push(dest);
  edgeList.get(dest)!.push(src);

  return edgeList;
}, new Map<string, string[]>());

const isLowerCase = (str: string) => str.toLowerCase() === str;

const part01 = (graphs: Map<string, string[]>) => {
  const queue = [{node: 'start', seen: new Set(['start'])}];
  let pathsCount = 0;
  while(queue.length > 0) {
    const {node, seen} = queue.shift()!;
    if (node === 'end') {
      pathsCount++;
      continue;
    }
    for (const neighbor of graphs.get(node)!) {
      if (!seen.has(neighbor)) {
        queue.push({
          node: neighbor, 
          seen: isLowerCase(neighbor) 
            ? new Set([...seen, neighbor])
            : new Set([...seen]),
        });
      }    
    }  
  }

  return pathsCount;
};

const part02 = (graphs: Map<string, string[]>) => {
  const queue = [{
    node: 'start', 
    seen: new Set(['start']), 
    hasSpecialSmallCave: false,
  }];
  let pathsCount = 0;
  while(queue.length > 0) {
    const {node, seen, hasSpecialSmallCave} = queue.shift()!;
    if (node === 'end') {
      pathsCount++;
      continue;
    }
    for (const neighbor of graphs.get(node)!) {
      if (!seen.has(neighbor)) {
        queue.push({
          node: neighbor, 
          seen: isLowerCase(neighbor) 
            ? new Set([...seen, neighbor])
            : new Set([...seen]), 
          hasSpecialSmallCave
        });
      } else {
        if (!hasSpecialSmallCave && isLowerCase(neighbor) && neighbor !== 'start') {
          queue.push({
            node: neighbor, 
            seen: new Set([...seen, neighbor]), 
            hasSpecialSmallCave: true
          });
        }
      }
    }  
  }

  return pathsCount;
};

console.log(part01(graphs));
console.log(part02(graphs));