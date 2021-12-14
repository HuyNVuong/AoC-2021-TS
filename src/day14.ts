import { INPUT } from "./inputs/day14.input";

const [p, r] = INPUT.split(/\n\s*\n/);

const counter = new Map<string, number>([[p.at(0)!, 1]]);
const polymer = new Map<string, number>();
for (let i = 1; i < p.length; i++) {
  const key = p[i-1] + p[i];
  if (!counter.has(p[i])) counter.set(p[i], 0);
  counter.set(p[i], counter.get(p[i])! + 1);
  if (!polymer.has(key)) {
    polymer.set(key, 0);
  }
  polymer.set(key, polymer.get(key)! + 1);
}


const rules = r.split('\n').reduce((map, line) => {
  const [a, b] = line.split(' -> ');
  map.set(a, b);

  return map;
}, new Map<string, string>());

const extendPolymerization = (
  polymer: Map<string, number>, 
  rules: Map<string, string>, 
  steps: number,
  counter: Map<string, number>,
): number => {

  for (let i = 0; i < steps; i++) {
    const keys =  Array.from(polymer.keys());
    const copy = new Map(polymer);
    for (const key of keys) {
      if (rules.has(key)) {
        const count = polymer.get(key)!;
        const newEl = rules.get(key)!;
        const [a, b] = key.split('');
        if (!copy.has(a + newEl)) {
          copy.set(a + newEl, 0);
        }
        copy.set(a + newEl, copy.get(a + newEl)! + count);
        if (!copy.has(newEl + b)) {
          copy.set(newEl + b, 0);
        }
        copy.set(newEl + b, copy.get(newEl + b)! + count);
        if (!counter.has(newEl)) counter.set(newEl, 0);
        counter.set(newEl, counter.get(newEl)! + count);
      }
    }

    for (const [key, value] of Array.from(polymer.entries())) {
      copy.set(key, copy.get(key)! - value >= 0 ? copy.get(key)! - value : 0);
    }

    for (const [key, value] of Array.from(copy.entries())) {
      polymer.set(key, value);
    }
  }
  
  const vals = Array.from(counter.values());
  vals.sort((a, b) => a - b);
  
  return vals[vals.length - 1] - vals[0];
};

console.log(extendPolymerization(polymer, rules, 10, counter));
// we are referencing objects so just add additional 30 steps
console.log(extendPolymerization(polymer, rules, 30, counter));

