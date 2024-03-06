import { readData } from '../../shared.ts';
import chalk from 'chalk';

const pipeMapping: { [key: string]: number[] } = {
  '|': [1, 1, 0, 0],
  '-': [0, 0, 1, 1],
  'L': [1, 0, 0, 1],
  'J': [1, 0, 1, 0],
  '7': [0, 1, 1, 0],
  'F': [0, 1, 0, 1],
  '.': [0, 0, 0, 0],
  'S': [1, 1, 1, 1]
}

const getPipeFromData = (x: number, y: number, data: string[]) => {
  if (y < 0 || y >= data.length) return '.';
  if (x < 0 || x >= data[y].length) return '.';
  return data[y][x];
}

const getPipeMapFromData = (x: number, y: number, data: string[]): { pipeMap: number[], pipe: string } => {
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
    default: throw new Error('Invalid direction');
  }
}

const getPreviousDirection = (direction: number) => {
  return direction === 0 ? 1 : direction === 1 ? 0 : direction === 2 ? 3 : 2;
}

export async function day10b(dataPath?: string) {
  const data = await readData(dataPath);
  const { x, y } = findAnimalCoordinates(data);

  // get coordinates around animal position
  const getAllNextCoordinates = pipeMapping['S'].map((allowed, index) => {
    return getNextCoordinates(x, y, index);
  });

  // get the first step to take.
  let nextDirection: number = -1;
  let nextCoordinates = getAllNextCoordinates.find(({ x, y }, index) => {
    const { pipeMap, pipe } = getPipeMapFromData(x, y, data);
    if (pipeMap[getPreviousDirection(index)] === 0) {
      return false;
    }
    nextDirection = index;
    return true;
  });


  let points = [nextCoordinates];
  let pipe = getPipeMapFromData(nextCoordinates.x, nextCoordinates.y, data).pipe;
  while (pipe !== 'S') {

    // next direction is the direction in the pipe that is not the same as the previous direction
    nextDirection = pipeMapping[pipe].findIndex((allowed, index) => allowed === 1 && index !== getPreviousDirection(nextDirection));
    console.log('nextDirection', nextDirection);

    nextCoordinates = getNextCoordinates(nextCoordinates.x, nextCoordinates.y, nextDirection);
    console.log('nextCoordinates', nextCoordinates);

    pipe = getPipeMapFromData(nextCoordinates.x, nextCoordinates.y, data).pipe;
    points.push(nextCoordinates);

    console.log('pipe', pipe, 'nextDirection', nextDirection);
  }

  const outerPoints = points.length;

  console.log(points)

  // shoelace algorithm
  let totalArea = 0;
  for (let i = 0; i < points.length; i++) {
    // tie the last point to the first point
    if(i === points.length - 1) {
      totalArea += points[i].x * points[0].y - points[0].x * points[i].y;
    } else {
      totalArea += points[i].x * points[i + 1].y - points[i + 1].x * points[i].y;
    }
    console.log('totalArea', totalArea);
  }
  totalArea = Math.abs(totalArea) * 0.5;


  console.log('totalArea', Math.floor(totalArea), 'outerPoints', outerPoints);

  // const area = Math.abs(innerPoints) + (outerPoints / 2) - 1;

  const innerPoints = Math.floor(totalArea) - (outerPoints / 2) + 1;


  return innerPoints;
}

const answer = await day10b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
