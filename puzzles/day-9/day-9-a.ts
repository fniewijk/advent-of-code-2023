import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day9a(dataPath?: string) {
  const data = await readData(dataPath);

  const numberLists = data.map(d => d.split(' ').map(n => parseInt(n)));

  const diffs = numberLists.map(n => differentialRecursive(n));

  console.log('diffs', diffs)

  // sum all diffs
  return diffs.reduce((prev, curr) => prev + curr, 0);
}


const differentialRecursive = (numberList: number[]) => {

  const allZeros = numberList.every(n => n === 0);
  if(allZeros) return 0;

  const nextList = [];

  for(let i = 0; i < numberList.length - 1; i++) {
    const current = numberList[i];
    const next = numberList[i + 1];
    nextList.push(next - current);
  }

  const lastNumber = numberList[numberList.length - 1];
  console.log('numberList', numberList, 'nextList', nextList, 'diff', lastNumber);

  return differentialRecursive(nextList) + lastNumber;
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
