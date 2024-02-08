import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);

  const numbersWithCoords: { value: number, x: number, y: number, length: number }[] = [];
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
      if(endOfArray && numericRange > 0) {
        numbersWithCoords.push({
          value: parseFloat(line.slice(index - numericRange + 1, index + 1)),
          x: index - numericRange + 1,
          y: lineIndex,
          length: numericRange,
        });
      }
    
    });
  });

  console.log(numbersWithCoords);
  let sum = 0;

  numbersWithCoords.map((numberWithCoords) => {
    const { x, y, length, value } = numberWithCoords;
    let found = false;

    mainLoop:
    for (let i = x - 1; i < x + length + 1; i++) {
      for (let j = y - 1; j < y + 2; j++) {
          const insideX = i >= 0 && i < data[0].length;
          const insideY = j >= 0 && j < data.length;
          console.log(`looking for ${value}: x${x}, y${y}, xi${i}, yi${j}`);

          if (insideX && insideY && data[j][i] !== '.' && !isNumeric(data[j][i])) {
            found = true;
            break mainLoop;
          }
      }
    }

    if(found) {
      console.log(`found for ${value}: ${x}, ${y}`);
      sum += value;
      console.log(`sum: ${sum}, ${value}`);
    } else {
      console.log(`not found for ${value}: ${x}, ${y}`);
    }
  });

  return sum;    
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
