import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);

  const cardResults: number[][]  = data.map((line) => {
    const [game, gameResult] = line.split(': ');
    const gameInformation = game.split(' ');
    const gameNumber = parseInt(gameInformation[gameInformation.length - 1]);

    const numbers = gameResult.split(' | ');

    const winningNumbers = numbers[0].split(' ').filter((number) => number !== '');
    const myNumbers = numbers[1].split(' ').filter((number) => number !== '');

    const myWinningNumbers = myNumbers.filter((number) => winningNumbers.includes(number));

    const wonCardsIndices = []
    for (let i = 0; i < myWinningNumbers.length; i++) {
      wonCardsIndices.push(gameNumber + i)
    }
    return wonCardsIndices;
  });
  
  let totalLength = 0;
  for(let i = 0; i < data.length; i++) {
    totalLength += memoizeRollupWinningCards(cardResults, i);
  }

  // count the cards won within each card, but also count the starting cards.
  return totalLength + data.length;
}

const cache = {};

const memoizeRollupWinningCards = (cardResults, cardIndex) => {

  if(cache[cardIndex]) {
    return cache[cardIndex];
  }
  const result = rollupWinningCards(cardResults, cardIndex);
  cache[cardIndex] = result;
  return result;
  
}

const rollupWinningCards = (cardResults: number[][], index: number): number => {
  const winningCardsByIndex = cardResults[index];
  let result = 0;
  winningCardsByIndex.map((cardIndex) => {
    //console.log('rollupWinningCards trying', index, cardIndex);

    result += memoizeRollupWinningCards(cardResults, cardIndex);
    //console.log('rollupWinningCards', index, cardIndex, result);

  });
  //console.log('winningCardsByIndex', winningCardsByIndex.length);
  result += winningCardsByIndex.length;

  //console.log('result', index, result);
  return result;
};

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
