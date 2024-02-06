import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  return data.map((line) => {
    const digits = takeFirstAndLastDigits(line);
    console.log(digits);
    return digits;
  }).reduce((acc, curr) => acc + curr, 0);
}

const numbersWrittenOut = [{ name: 'one', value: '1' },
{ name: 'two', value: '2' },
{ name: 'three', value: '3' },
{ name: 'four', value: '4' },
{ name: 'five', value: '5' },
{ name: 'six', value: '6' },
{ name: 'seven', value: '7' },
{ name: 'eight', value: '8' },
{ name: 'nine', value: '9' },
];

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const takeFirstAndLastDigits = (someString: string): number => {
  let firstNumber: string;
  let lastNumber: string;
  someString.split('').map((char, index) => {

    const newString = someString.slice(index, index + 5);

    numbersWrittenOut.map((number, index) => {
      if (newString.startsWith(number.name)) {
        if (!firstNumber) {
          firstNumber = number.value;
        }
        lastNumber = number.value;
      }
    });
    if (isNumeric(char)) {
      if (!firstNumber) {
        firstNumber = char;
      }
      lastNumber = char;
    }
  });

  return Number.parseInt(firstNumber + lastNumber);
};

  console.log(chalk.bgGreen('Your Answer:'), chalk.green(await day1b()));
