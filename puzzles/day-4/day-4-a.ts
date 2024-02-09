import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);

  const cardResults = data.reduce((prev, line) => {
    const [game, gameResult] = line.split(': ');
    const gameNumber = game.split(' ')[1];

    const numbers = gameResult.split(' | ');

    const winningNumbers = numbers[0].split(' ').filter((number) => number !== '');
    const myNumbers = numbers[1].split(' ').filter((number) => number !== '');

    const myWinningNumbers = myNumbers.filter((number) => winningNumbers.includes(number));

    console.log(prev);
    console.log(gameNumber, myWinningNumbers);
    return prev + (myWinningNumbers.length > 0 ? Math.pow(2, myWinningNumbers.length - 1) : 0);
  },0);
    
  return cardResults;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
