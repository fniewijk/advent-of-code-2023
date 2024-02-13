import { match } from 'assert';
import { readData } from '../../shared.ts';
import chalk from 'chalk';

const baseValue = 100;

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export async function day7b(dataPath?: string) {
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

  // console.log(rankedHands);

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
  // console.log(hand, matched);

  const foundJokers = hand.match(/[J]{1,}/g);
  let amountOfJokers = 0;
  if (foundJokers && foundJokers.length === 1) {
    amountOfJokers = foundJokers[0].length;
  }

  if (!matched) {
    return amountOfJokers;
  }
  if (matched.length === 1) {
    const handValueUpgrade = amountOfJokers > 1 ? Math.min(amountOfJokers + 1, 5) : matched[0].length + amountOfJokers; // if jokers found and no other multiples then jokers + 1 other card is the max.
    switch (handValueUpgrade) {
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
  } else if (matched.length === 2) {
    if(amountOfJokers <= 1) {
      if (matched[0].length + matched[1].length === 5) {
        return 4 + amountOfJokers; // full house or four of a kind
      }
      return amountOfJokers ? 4 : 2; // full house or 2 pairs
    } else { amountOfJokers >= 2} {
      if (matched[0].length + matched[1].length === 5) {
        return 6; // five of a kind
      }
      return 5; // four of a kind
    }
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
      return 1;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
  }
};


const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
