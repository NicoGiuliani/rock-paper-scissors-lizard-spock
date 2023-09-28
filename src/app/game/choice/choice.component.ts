import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameChoice } from 'src/app/shared/game-choice.model';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent {
  @Input() gameOption!: GameChoice;
  @Output() playerChoice = new EventEmitter<GameChoice>();

  onMadeChoice(choice: GameChoice) {
    this.playerChoice.emit(choice);
  }
}
