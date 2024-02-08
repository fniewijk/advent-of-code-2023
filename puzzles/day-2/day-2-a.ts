import { readData } from '../../shared.ts';
import chalk from 'chalk';

const colorMaximums = {
  red: 12,
  green: 13,
  blue: 14,
}

export async function day2a(dataPath?: string): Promise<number> {
  const data = await readData(dataPath);
  const gameResults = data.map((line) => {
    const [game, gameResult] = line.split(': ');
    const gameNumber = game.split(' ')[1];

    const results = gameResult.split('; ');
    const incorrectGame = results.some((result) => {
      const roundResults = result.split(', ');
      const colorSums = roundResults.reduce((prev, cur) => {
        const [score, color] = cur.split(' ');
        return {
          ...prev,
          [color]: prev[color] + parseInt(score),
        }
      }, { red: 0, green: 0, blue: 0});


      const incorrectRound = Object.entries(colorSums).some((colorSum) => {
        const [color, score] = colorSum;
        if (score > colorMaximums[color]) {
          console.log(`Game ${gameNumber} is disqualified, because of ${color} ${score} is higher than ${colorMaximums[color]}!`);
          return true;
        }
        return false;
      });
      
      return incorrectRound;
    });

    if(!incorrectGame) {
      return parseInt(gameNumber);
    }
    return 0;
  });
  return gameResults.reduce((acc, curr) => acc + curr, 0);
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
