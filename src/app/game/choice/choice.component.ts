import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameResult } from 'src/app/enum/game-result.enum';
import { GameChoice } from 'src/app/shared/game-choice.model';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent {
  @Input() gameOption!: GameChoice;
  @Input() playerSelected!: GameChoice;
  @Input() opponentSelected!: GameChoice;
  @Input() gameResult!: GameResult;
  @Output() playerChoice = new EventEmitter<GameChoice>();
  GameResult = GameResult;

  onMadeChoice(choice: GameChoice) {
    this.playerChoice.emit(choice);
  }
}
