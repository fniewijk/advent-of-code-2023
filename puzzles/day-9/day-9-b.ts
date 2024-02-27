import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day9b(dataPath?: string) {
  const data = await readData(dataPath);

  const numberLists = data.map(d => d.split(' ').map(n => parseInt(n)));

  const diffs = numberLists.map(n => differentialRecursive(n));

  console.log('diffs', diffs)

  // sum all diffs
  return diffs.reduce((prev, curr) => prev + curr, 0);
}


const differentialRecursive = (numberList: number[]) => {

  const allZeros = numberList.every(n => n === 0);
  if (allZeros) return 0;

  const nextList = [];

  for (let i = 0; i < numberList.length - 1; i++) {
    const current = numberList[i];
    const next = numberList[i + 1];
    nextList.push(next - current);
  }

  const firstNumber = numberList[0];
  console.log('numberList', numberList, 'nextList', nextList, 'diff', firstNumber);

  return firstNumber - differentialRecursive(nextList);
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
