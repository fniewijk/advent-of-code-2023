import { readData } from '../../shared.ts';
import chalk from 'chalk';

interface MapObject {
  [key: string]: Map;
}

interface Map {
  L: string;
  R: string;
}

const looper = (currentMap: Map, maps: MapObject, instructions: string[]) => {
  let instructionIndex = 0;
  while (true) {
    const instruction = instructions[instructionIndex % instructions.length];
    instructionIndex++;

    const { L, R } = currentMap;

    const key = instruction === 'R' ? R : L;

    currentMap = maps[key];

    if(key.endsWith('Z')) break;
  }
  return instructionIndex;
};

const getCommonDivider = (a: number, b: number) => {
  return !b ? a : getCommonDivider(b, a % b);
}

const getLeastCommonMultiple = (a: number, b: number) => {
  return (a * b) / getCommonDivider(a, b);
}


export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data[0].split('');

  let activeMaps: MapObject = {};

  const maps: MapObject = data.slice(2).reduce((prev, map) => {

    // console.log('map', map);
    const [key, rest] = map.split(' = ');
    // console.log('key', key, 'rest', rest);
    // turn '(BBB, CCC)' into { left: BBB, right: CCC }
    const [L, R] = rest.slice(1, rest.length - 1).split(', ');

    if(key.endsWith('A')) {
      activeMaps = { ...activeMaps, [key]: { L, R } };
    }

    return { ...prev, [key]: { L, R } };
  }, {});
  let instructionIndex = 0;
  // console.log('lastKey', currentMap, maps['lastKey']);

  console.log('activeMaps', activeMaps);

  const instructionCounts = Object.keys(activeMaps).map((key) => {
    return looper(activeMaps[key], maps, instructions);
  });

  // find lowest common multiple in instructionCounts
  console.log(instructionCounts);

  const lcmValue = instructionCounts.reduce((prev, count) => {
    return getLeastCommonMultiple(prev, count);
  });

  return lcmValue;
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));