import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  return data.map((line) => {
    return takeFirstAndLastDigits(line);
  }).reduce((acc, curr) => acc + curr, 0);
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const takeFirstAndLastDigits = (someString: string): number => {
  let firstNumber: string;
  let lastNumber: string;
  someString.split('').map((char, index) => {
    if (isNumeric(char)) {
      if (!firstNumber) {
        firstNumber = char;
        lastNumber = char;
      } else {
        lastNumber = char;
      }
    }
  });
  return Number.parseInt(firstNumber + lastNumber);
};

console.log(chalk.bgGreen('Your Answer:'), chalk.green(await day1a()));
