import { Component } from '@angular/core';
import { GameChoice } from '../shared/game-choice.model';
import { GameOption } from '../enum/game-options.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameOptions: GameChoice[] = [
    { name: GameOption.ROCK, imageUrl: "", winsAgainst: [GameOption.SCISSORS, GameOption.LIZARD], losesTo: [GameOption.PAPER, GameOption.SPOCK] },
    { name: GameOption.PAPER, imageUrl: "", winsAgainst: [GameOption.ROCK, GameOption.SPOCK], losesTo: [GameOption.SCISSORS, GameOption.LIZARD] },
    { name: GameOption.SCISSORS, imageUrl: "", winsAgainst: [GameOption.PAPER, GameOption.LIZARD], losesTo: [GameOption.ROCK, GameOption.SPOCK] },
    { name: GameOption.LIZARD, imageUrl: "", winsAgainst: [GameOption.PAPER, GameOption.SPOCK], losesTo: [GameOption.SCISSORS, GameOption.ROCK] },
    { name: GameOption.SPOCK, imageUrl: "", winsAgainst: [GameOption.SCISSORS, GameOption.ROCK], losesTo: [GameOption.LIZARD, GameOption.PAPER] }
  ];

  verbLookup: { [key: string]: { [key: string]: string } } = {
    [GameOption.ROCK]: {
      [GameOption.SCISSORS]: "smashes",
      [GameOption.LIZARD]: "crushes",
    },
    [GameOption.PAPER]: {
      [GameOption.ROCK]: "covers",
      [GameOption.SPOCK]: "disproves",
    },
    [GameOption.SCISSORS]: {
      [GameOption.PAPER]: "cut",
      [GameOption.LIZARD]: "decapitate",
    },
    [GameOption.LIZARD]: {
      [GameOption.PAPER]: "eats",
      [GameOption.SPOCK]: "poisons",
    },
    [GameOption.SPOCK]: {
      [GameOption.ROCK]: "vaporizes",
      [GameOption.SCISSORS]: "smashes",
    }
  }

  playerChoice!: GameChoice;
  opponentChoice!: GameChoice;
  winner: string | null = null;
  loser: string | null = null;
  gameResult!: string;
  verb!: string;
  outputExpression!: string;

  onSetSelection(selection: GameChoice) {
    this.playerChoice = selection;
    this.getOpponentChoice();
    this.getResult();
    this.getOutputExpression();

    console.log("You chose:", this.playerChoice.name);
    console.log("Opponent chose:", this.opponentChoice.name);
    console.log(this.outputExpression);
  }

  getOpponentChoice() {
    this.opponentChoice = this.gameOptions[Math.floor(Math.random() * this.gameOptions.length)];
  }

  getResult() {
    if (this.playerChoice.winsAgainst.includes(this.opponentChoice.name)) {
      this.winner = this.playerChoice.name;
      this.loser = this.opponentChoice.name;
      this.gameResult = "WIN";
    } else if (this.playerChoice.losesTo.includes(this.opponentChoice.name)) {
      this.winner = this.opponentChoice.name;
      this.loser = this.playerChoice.name;
      this.gameResult = "LOSE";
    } else {
      this.gameResult = "DRAW";
    }
  }

  getOutputExpression() {
    this.outputExpression = this.gameResult === "WIN" ? "You win! " :
      this.gameResult === "LOSE" ? "You lose! " : "Draw! ";
    if (this.winner !== null && this.loser !== null) {
      this.verb = this.verbLookup[this.winner][this.loser];
      this.outputExpression += this.capitalize(this.winner) + " " + this.verb + " " + this.loser + "!";
    }
  }

  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
