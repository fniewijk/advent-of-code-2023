import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isNumeric(value) {
  return /^\d+$/.test(value);
}

interface NumbersWithCoords {
   value: number, x: number, y: number, length: number }

interface NumbersWithCoordsAndCog extends NumbersWithCoords {
  cog: boolean;
  partX: number;
  partY: number;
}

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);

  const numbersWithCoords: NumbersWithCoords[] = [];
  data.map((line, lineIndex) => {
    let numericRange = 0;

    line.split('').map((char, index, array) => {
      // console.log(char, isNumeric(char), numericRange);

      if (isNumeric(char)) {
        numericRange++;
      }

      if ((!isNumeric(char)) && numericRange > 0) {
        /// console.log(`pushing ${line.slice(index - numericRange, index)}`);
        numbersWithCoords.push({
          value: parseFloat(line.slice(index - numericRange, index)),
          x: index - numericRange,
          y: lineIndex,
          length: numericRange,
        });
        numericRange = 0;
      }

      const endOfArray = index === array.length - 1;
      if (endOfArray && numericRange > 0) {
        numbersWithCoords.push({
          value: parseFloat(line.slice(index - numericRange + 1, index + 1)),
          x: index - numericRange + 1,
          y: lineIndex,
          length: numericRange,
        });
      }

    });
  });

  const result: NumbersWithCoordsAndCog[] = numbersWithCoords.reduce((previousValue: NumbersWithCoordsAndCog[], currentValue: NumbersWithCoords) => {
    const { x, y, length, value } = currentValue;

    for (let i = x - 1; i < x + length + 1; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        const insideX = i >= 0 && i < data[0].length;
        const insideY = j >= 0 && j < data.length;
        console.log(`looking for ${value}: x${x}, y${y}, xi${i}, yi${j}`);

        if (insideX && insideY && data[j][i] !== '.' && !isNumeric(data[j][i])) {
          console.log(`found for ${value}: ${x}, ${y}`);

          const result: NumbersWithCoordsAndCog[] = [...previousValue, { ...currentValue, cog: data[j][i] === '*', partX: i, partY: j }];
          return result;
        }
      }
    }
    return previousValue;
  }, [] as NumbersWithCoordsAndCog[]);

  // find all numberswithcoordsandcog with the same partX and partY which is a cog, and multiply them together
  // then sum all those values

  const cogs = result.filter((r) => r.cog);
  console.log(cogs);
  const cogsGrouped: { [key: string]: NumbersWithCoordsAndCog[] } = cogs.reduce((prev, curr) => {
    const key = `${curr.partX}-${curr.partY}`;
    if (!prev[key]) {
      prev[key] = [];
    }
    prev[key].push(curr);
    return prev;
  }, {});

  console.log(cogsGrouped);

  let sum = 0;
  Object.entries(cogsGrouped).map(([key, numberWithCoordsAndCog]) => {
    if (numberWithCoordsAndCog.length === 2) {
      sum += numberWithCoordsAndCog.reduce((prev, curr) => prev * curr.value, 1);
    }
  });


    return sum;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
