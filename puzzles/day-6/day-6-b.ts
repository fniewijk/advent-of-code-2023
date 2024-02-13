import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);

  const times = data[0].split(' ').filter((value) => isNumeric(value));
  const distances = data[1].split(' ').filter((value) => isNumeric(value));

  const time = parseInt(times.join(''));
  const distance = parseInt(distances.join(''));

  const occurences = calculateOccurrencesBelowLimit(time, distance);
  return occurences;
}

const calculateOccurrencesBelowLimit = (time: number, limit: number): number => {
  let occurences = 0;
  let speed = Math.floor(time / 2);
  let chargeTime = Math.ceil(time / 2);

  while (speed * chargeTime > limit) {
    occurences++;
    chargeTime++;
    speed--;
  }
  occurences *= 2;
  if (time % 2 === 0) {
    occurences--;
  };
  return occurences;
}

const now = performance.now();
const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
console.log(chalk.bgGrey(`Time spent calculating:`), chalk.grey(`${Math.floor(performance.now() - now)}ms`));