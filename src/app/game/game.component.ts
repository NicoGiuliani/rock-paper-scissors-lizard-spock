import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { GameChoice } from '../shared/game-choice.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameOptions: GameChoice[] = [
    { name: "rock", imageUrl: "", winsAgainst: ["scissors", "lizard"], losesTo: ["paper", "spock"] },
    { name: "paper", imageUrl: "", winsAgainst: ["rock", "spock"], losesTo: ["scissors", "lizard"] },
    { name: "scissors", imageUrl: "", winsAgainst: ["paper", "lizard"], losesTo: ["rock", "spock"] },
    { name: "lizard", imageUrl: "", winsAgainst: ["paper", "spock"], losesTo: ["scissors", "rock"] },
    { name: "spock", imageUrl: "", winsAgainst: ["scissors", "rock"], losesTo: ["lizard", "paper"] }
  ];

  verbChart: { [key: string]: { [key: string]: string }} = {
     "rock": {
      "scissors": "smashes",
      "lizard": "crushes",
     },
     "paper": {
      "rock": "covers",
      "spock": "disproves",
     },
     "scissors": {
      "paper": "cut",
      "lizard": "decapitate",
     },
     "lizard": {
      "paper": "eats",
      "spock": "poisons",
     },
     "spock": {
      "rock": "vaporizes",
      "scissors": "smashes",
     },
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
    this.opponentChoice = this.gameOptions[Math.floor(Math.random() * 5)];
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
      this.verb = this.verbChart[this.winner][this.loser];
      this.outputExpression += this.winner + " " + this.verb + " " + this.loser + "!";
    }
  }

}
