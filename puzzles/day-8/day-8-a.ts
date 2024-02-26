import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data[0].split('');
  const maps = data.slice(2).reduce((prev, map) => {

    // console.log('map', map);
    const [key, rest] = map.split(' = ');
    // console.log('key', key, 'rest', rest);
    // turn '(BBB, CCC)' into { left: BBB, right: CCC }
    const [left, right] = rest.slice(1, rest.length - 1).split(', ');
    return { ...prev, [key]: { left, right } };
  }, {});
  
  let currentMap = maps['AAA'];
  let instructionIndex = 0;
  // console.log('lastKey', currentMap, maps['lastKey'])
  while (true ) {

    const instruction = instructions[instructionIndex % instructions.length];
    instructionIndex++;
    // console.log(instructionIndex);

    const { left, right } = currentMap;
    console.log('instruction', instruction, 'left', left, 'right', right);
    if (instruction === 'R') {
      currentMap = maps[right];
      if (right == 'ZZZ') {
        break;
      }
      console.log('R', right);
    }
    if (instruction === 'L') {
      currentMap = maps[left];
      if (left == 'ZZZ') {
        break;
      }
      console.log('L', left);
    }

  }
  return instructionIndex;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));