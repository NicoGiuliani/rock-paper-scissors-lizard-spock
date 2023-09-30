import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameChoice } from 'src/app/shared/game-choice.model';
import { GameOption } from 'src/app/enum/game-options.enum';
import { GameResult } from 'src/app/enum/game-result.enum';

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
  GameOption = GameOption;
  GameResult = GameResult;

  onMadeChoice(choice: GameChoice) {
    this.playerChoice.emit(choice);
  }
}
