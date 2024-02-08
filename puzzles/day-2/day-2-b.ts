import { readData } from '../../shared.ts';
import chalk from 'chalk';

const colorMaximums = {
  red: 12,
  green: 13,
  blue: 14,
}

export async function day2b(dataPath?: string): Promise<number> {
  const data = await readData(dataPath);
  const gameResults = data.map((line) => {
    const [game, gameResult] = line.split(': ');
    const results = gameResult.split('; ');
    const colorSum = results.reduce((prev, cur) => {
      const roundResults = cur.split(', ');
      const colorSums = roundResults.reduce((prev, roundResult) => {
        const [score, color] = roundResult.split(' ');
        return {
          ...prev,
          [color]: Math.max(prev[color], parseInt(score)),
        }
      }, { red: 0, green: 0, blue: 0 });

      return {
        red: Math.max(prev.red, colorSums.red),
        green: Math.max(prev.green, colorSums.green),
        blue: Math.max(prev.blue, colorSums.blue),
      }
    }, { red: 0, green: 0, blue: 0 });

    console.log(colorSum, colorSum.red * colorSum.green * colorSum.blue);
    return colorSum.red * colorSum.green * colorSum.blue;
  });
  return gameResults.reduce((acc, curr) => acc + curr, 0);
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
