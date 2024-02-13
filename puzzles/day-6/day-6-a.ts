import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);

  const times = data[0].split(' ').filter((value) => isNumeric(value)).map((time) => parseInt(time));
  const distance = data[1].split(' ').filter((value) => isNumeric(value)).map((time) => parseInt(time));

  const occurences = times.map((time, index) => {
    return calculateOccurrencesBelowLimit(time, distance[index]);
  });

  console.log(occurences);

  return occurences.reduce((prev, next) => prev * next, 1);
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

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
