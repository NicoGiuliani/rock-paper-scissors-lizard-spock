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
  
  playerChoice!: GameChoice;
  opponentChoice!: GameChoice;

  onSetSelection(selection: GameChoice) {
    this.playerChoice = selection;
    console.log("player chose:", this.playerChoice);
  }
}
