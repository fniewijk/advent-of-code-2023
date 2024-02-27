import { readData } from '../../shared.ts';
import chalk from 'chalk';

const pipeMapping = {
  '|': [1,1,0,0],
  '-': [0,0,1,1],
  'L': [1,0,0,1],
  'J': [1,0,1,0],
  '7': [0,1,1,0],
  'F': [0,1,0,1],
  '.': [0,0,0,0],
  'S': [1,1,1,1]
}

const getPipeFromData = (x: number, y: number, data: string[]) => {
  if (y < 0 || y >= data.length) return '.';
  if (x < 0 || x >= data[y].length) return '.';
  return data[y][x];
}

const getPipeMapFromData = (x: number, y: number, data: string[]): { pipeMap: number[], pipe: string} => {
  const pipe = getPipeFromData(x, y, data);
  return { pipeMap: pipeMapping[pipe], pipe };
};

const findAnimalCoordinates = (data: string[]) => {
  let x = -1;
  const y = data.findIndex((dataLine: string, index: number) => {
    const foundIndex = dataLine.indexOf('S')
    if (foundIndex > -1) {
      x = foundIndex;
      return true;
    }
    return false;
  });
  return { x, y };
};

const getNextCoordinates = (x: number, y: number, direction: number) => {
  switch (direction) {
    case 0: return { x, y: y - 1 };
    case 1: return { x, y: y + 1 };
    case 2: return { x: x - 1, y };
    case 3: return { x: x + 1, y };
  }
}

const recursiveFinder = (x: number, y: number, prevDirection: number, data: string[], stepCount: number = 0) => {
  console.log('x', x, 'y', y, 'prevDirection', prevDirection, 'stepCount', stepCount);

  const { pipeMap, pipe } = getPipeMapFromData(x, y, data);

  // we looped around
  if (pipe === 'S' && stepCount > 0) {
    return stepCount;
  }

  // if you are not allowed to come from where you come then return -1.
  if (pipeMap[prevDirection] === 0) {
    return -1;
  }

  const nextDirections = [];
  pipeMap.forEach((allowed, index) => {
    if (allowed === 1 && prevDirection !== index) {
      nextDirections.push(index);
    }
  });

  console.log('nextDirections', nextDirections);

  return nextDirections.reduce((prev, nextDirection) => {
    const nextCoordinates = getNextCoordinates(x, y, nextDirection);
    const newPrevDirection = nextDirection === 0 ? 1 : nextDirection === 1 ? 0 : nextDirection === 2 ? 3 : 2;
    return Math.max(prev, recursiveFinder(nextCoordinates.x, nextCoordinates.y, newPrevDirection, data, stepCount + 1));
  }, -1);
}

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);
  const { x, y } = findAnimalCoordinates(data);

  const stepCount = recursiveFinder(x, y, -1, data);

  console.log('animalX', x, 'animalY', y);

  return stepCount / 2;
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
