// BlackJack command line application

var readline = require("readline");

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  cardValue() {
    if (this.value > 1 || this.value < 11) {
      return this.value;
    }
    if (this.value === "J" || this.value === "Q" || this.value === "K") {
      return 10;
    }
    return 11; // default for Ace
  }
}

class Deck {
  // create 52 cards
  constructor(aceValue) {
    let cards = [];
    const suits = ["♥️", "♦️", "♣️", "♠️"];
    for (let value = 2; value < 11; value++) {
      for (const suit of suits) {
        const card = new Card(value, suit);
        cards.push(card);
      }
    }
    const highCards = ["J", "Q", "K", "A"];
    for (const highCard of highCards) {
      for (const suit of suits) {
        const card = new Card(highCard, suit);
        cards.push(card);
      }
    }
    console.log(cards);
    return cards;
  }
}

class BlackJack {
  constructor() {
    this.cards = new Deck();
    this.score = 0;
    console.log("Welcome to BlackJack.");
    console.log(`The deck has ${this.cards.length} cards.`);
  }

  hasCards() {
    return this.cards.length === 0;
  }

  hit() {
    const card = this.cards[Math.floor(Math.random() * this.cards.length)]; // TODO:
    const index = this.cards.indexOf(card); // TODO:
    this.cards.splice(index, 1); // TODO:
    console.log(
      `${this.cards.length} cards left, ${card.value}${
        card.suit
      } was removed with value ${card.cardValue()}.`
    );
    const gamePlayStatus = this.checkScore(card);
    return { card: card, gamePlayStatus: gamePlayStatus, score: this.score };
  }

  checkScore(card) {
    this.score += card.cardValue();
    console.log(this.score);
    if (this.score === 21) {
      return "blackJack";
    } else if (this.score > 21) {
      return "bust";
    } else {
      return "continue";
    }
  }

  getScore() {
    return this.score;
  }

  computerScore() {
    const score = Math.floor(Math.random() * (21 - 18) + 18);
    return score;
  }
}

//---->Game start

const blackJack = new BlackJack();

const r1 = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
}); 

r1.question('Do you want to hit or pass ?', (answer) => {
    console.log(`You entered ${answer}`); 

    r1.close(); 
}); 

//   let answer = 'hit';
//   do {
//     answer = window.prompt('Do you want to `hit` or `pass` ?');
//     if (answer === 'hit') {
//       const result = blackJack.hit();
//       if (result.gamePlayStatus === 'blackJack') {
//         console.log(`Woohoo BlackJack!!!!`);
//         answer = 'done';
//       }
//       if (result.gamePlayStatus === 'bust') {
//         console.log(`Better luck next time.`);
//         answer = 'lost'
//       }
//     }
//     if (answer === 'pass') {
//       const computerScore = blackJack.computerScore();
//       //if (result.score < computerScore) {
//         console.log(`Your score is ${blackJack.getScore()} and the computer is ${computerScore}`);
//       //}
//     }
//     console.log();
//   } while ((answer === 'hit') && !(blackJack.hasCards()));
