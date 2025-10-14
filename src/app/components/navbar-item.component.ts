import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    '(click)': 'setExpression($event)',
    'class': 'navbar-item',
    '[class.is-active]': 'piping() === filter()'
  },
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      font-weight: bold;

      &:hover {
        cursor: pointer;
      }

      &.is-active {
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
  `]
})
export class NavbarItemComponent {
  filter = input.required<string>();
  piping = input.required<string>();
  change = output<string>();

  protected setExpression(event: Event): void {
    event.preventDefault();
    this.change.emit(this.filter());
  }
}
