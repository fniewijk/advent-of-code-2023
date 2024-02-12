import chalk from 'chalk';
import { readData } from '../../shared.ts';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  console.log(data)
  const seeds = data.shift().split(': ')[1].split(' ').map((seed) => parseInt(seed));
  console.log(seeds);


  const rawMaps = data;
  console.log(rawMaps);

  const maps: number[][][] = [];
  rawMaps.map((rawMap) => {
    if(rawMap === ''){
      maps.push([]);
    }
    if (rawMap.split(' ').length === 3) {
      maps[maps.length - 1].push(rawMap.split(' ').map((stringValue) => parseInt(stringValue)))
    }
  });

  const locations = seeds.map((seed: number) => {
    console.log('new seed', seed)
    const mapResult: number = maps.reduce((prev: number, mapRanges: number[][]) => {
      let wasFound = false;
      const mappedSeed = mapRanges.reduce((prevRange, range) => {
        if (!wasFound && prevRange >= range[1] && prevRange <= range[1] + range[2]) {
          wasFound = true;
          console.log('rangemappin', prevRange, range[0], range[1], 'new pos', range[0] + (prevRange - range[1]) )
          return range[0] + (prevRange - range[1]);
        }
        return prevRange;
      }, prev);
      console.log('mappedSeed', seed, mappedSeed);
      return mappedSeed;
    }, seed)
    return mapResult;
  })

  return locations.reduce((previousLocation, nextLocation) => previousLocation > nextLocation ? nextLocation : previousLocation, locations[0]);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
