import { Component } from '@angular/core';
import { GameChoice } from '../shared/game-choice.model';
import { GameOption } from '../enum/game-options.enum';
import { GameResult } from '../enum/game-result.enum';
import { faHandBackFist, faHand, faHandScissors, faHandLizard, faHandSpock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameOptions: GameChoice[] = [
    { name: GameOption.ROCK, imageUrl: "", winsAgainst: [GameOption.SCISSORS, GameOption.LIZARD], losesTo: [GameOption.PAPER, GameOption.SPOCK], icon: faHand },
    { name: GameOption.PAPER, imageUrl: "", winsAgainst: [GameOption.ROCK, GameOption.SPOCK], losesTo: [GameOption.SCISSORS, GameOption.LIZARD], icon: faHandBackFist },
    { name: GameOption.SCISSORS, imageUrl: "", winsAgainst: [GameOption.PAPER, GameOption.LIZARD], losesTo: [GameOption.ROCK, GameOption.SPOCK], icon: faHandScissors },
    { name: GameOption.LIZARD, imageUrl: "", winsAgainst: [GameOption.PAPER, GameOption.SPOCK], losesTo: [GameOption.SCISSORS, GameOption.ROCK], icon: faHandLizard },
    { name: GameOption.SPOCK, imageUrl: "", winsAgainst: [GameOption.SCISSORS, GameOption.ROCK], losesTo: [GameOption.LIZARD, GameOption.PAPER], icon: faHandSpock }
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
  gameResult!: GameResult;
  verb!: string;
  outputExpression!: string;

  onSetSelection(selection: GameChoice) {
    this.winner = null;
    this.loser = null;
    this.playerChoice = selection;
    this.getOpponentChoice();
    this.getResult();
    this.getOutputExpression();
  }

  getOpponentChoice() {
    this.opponentChoice = this.gameOptions[Math.floor(Math.random() * this.gameOptions.length)];
  }

  getResult() {
    if (this.playerChoice.winsAgainst.includes(this.opponentChoice.name)) {
      this.winner = this.playerChoice.name;
      this.loser = this.opponentChoice.name;
      this.gameResult = GameResult.WIN;
    } else if (this.playerChoice.losesTo.includes(this.opponentChoice.name)) {
      this.winner = this.opponentChoice.name;
      this.loser = this.playerChoice.name;
      this.gameResult = GameResult.LOSE;
    } else {
      this.gameResult = GameResult.DRAW;
    }
  }

  getOutputExpression() {
    this.outputExpression = 
      this.gameResult === GameResult.WIN ? "You win! " :
      this.gameResult === GameResult.LOSE ? "You lose! " : "Draw! ";
    if (this.winner !== null && this.loser !== null) {
      this.verb = this.verbLookup[this.winner][this.loser];
      this.outputExpression += this.capitalize(this.winner) + " " + this.verb + " " + this.loser + "!";
    }
  }

  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
