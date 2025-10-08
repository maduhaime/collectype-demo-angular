import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    'class': 'is-flex'
  },
  template: `
    <a
      (click)="handleClick()"
      class="navbar-item"
      [class.is-active]="piping() === filter()">
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    .navbar-item {
      font-weight: bold;
    }

    .is-active {
      background-color: rgba(255, 255, 255, 0.25);
    }
  `]
})
export class NavbarItemComponent {
  filter = input.required<string>();
  piping = input.required<string>();
  change = output<string>();

  protected handleClick(): void {
    this.change.emit(this.filter());
  }
}
