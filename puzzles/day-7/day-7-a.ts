import { match } from 'assert';
import { readData } from '../../shared.ts';
import chalk from 'chalk';

const baseValue = 100;

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);

  const hands = data.map((line) => {
    const [hand, bet] = line.split(' ');
    //console.log(hand, bet);
    const handValue = calculateHandValue(hand.split('').sort().join(''));
    const cardValue = calculateCardHandValues(hand);
    //console.log(handValue, cardValue);
    return { value: handValue * Math.pow(baseValue, hand.length + 1) + cardValue, bet: parseInt(bet), hand };
  });


  const rankedHands = hands.sort((a, b) => {
    return a.value - b.value;
  });

  console.log(rankedHands);

  const winnings = rankedHands.map((hand, index) => {
    const winning = hand.bet * (index + 1);
    console.log(hand, winning, index + 1);
    return winning;
  });

  //console.log(winnings);
  return winnings.reduce((prev, next) => prev + next, 0);
}

const calculateHandValue = (hand: string): number => {
  const matched = hand.match(/([AKQJT2-9])\1{1,}/g);
   console.log(hand, matched);

  if (!matched) {
    return 0;
  }
  if(matched.length === 1) {
    switch (matched[0].length) {
      case 2:
        return 1; // one pair
      case 3:
        return 3; // three of a kind
      case 4:
        return 5; // four of a kind
      case 5:
        return 6; // five of a kind
      default:
        return 0; // never happens
    }
  } else if(matched.length === 2) {
    if(matched[0].length + matched[1].length === 5) {
      return 4; // full house
    }
    return 2; // 2 pairs
  }
}

const calculateCardHandValues = (hand: string): number => {

  const cards = hand.split('');
  let cardValue = 0;
  cards.map((card, index) => {
    cardValue += calculateCardValue(card) * (Math.pow(baseValue, cards.length - index - 1));
  });

  return cardValue;
}

const calculateCardValue = (card: string): number => {
  if (isNumeric(card)) {
    return parseInt(card);
  }

  switch (card) {
    case 'T':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
  }
};


const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
