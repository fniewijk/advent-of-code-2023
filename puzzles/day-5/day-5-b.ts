import chalk from 'chalk';
import { readData } from '../../shared.ts';

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);
  // console.log(data)
  const seedRange = data.shift().split(': ')[1].split(' ').map((seed) => parseInt(seed));
  // console.log(seedRange);

  const rawMaps = data;
  // console.log(rawMaps);

  const maps: number[][][] = [];
  rawMaps.map((rawMap) => {
    if (rawMap === '') {
      maps.push([]);
    }
    if (rawMap.split(' ').length === 3) {
      maps[maps.length - 1].push(rawMap.split(' ').map((stringValue) => parseInt(stringValue)))
    }
  });

  // console.log(maps);
  let lowestLocation = Infinity;

  let lowestIndex = Infinity;
  for (let i = 0; i < seedRange.length / 2; i += 2) {
    const seedStart = seedRange[i];
    const seedEnd = seedRange[i] + seedRange[i + 1];
    for (let seedIndex = seedStart; seedIndex < seedEnd; seedIndex++) {
      const calculatedLocation = calculateLocation(seedIndex, maps);
      lowestIndex = lowestLocation > calculatedLocation ? seedIndex : lowestIndex;

      // console.log(calculatedLocation, counter, 'seedstart, index and end', seedIndex, seedStart, seedEnd);
      lowestLocation = lowestLocation > calculatedLocation ? calculatedLocation : lowestLocation;
      // console.log('walk', calculatedLocation)
    }
  }
  console.log('lowestIndex', lowestIndex);
  return lowestLocation;
}

const calculateLocation = (seed: number, maps: number[][][]): number => {
  return maps.reduce((prev: number, mapRanges: number[][]) => {
    let wasFound = false;
    const mappedSeed = mapRanges.reduce((prevRange, range, index) => {
      if (!wasFound && prevRange >= range[1] && prevRange < range[1] + range[2]) {
        wasFound = true;
        // console.log('rangemappin', prevRange, range[0], range[1], 'new pos', range[0] + (prevRange - range[1]), 'index', index)
        return range[0] + (prevRange - range[1]);
      }
      return prevRange;
    }, prev);
    // console.log('mappedSeed', seed, mappedSeed);
    return mappedSeed;
  }, seed)
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
