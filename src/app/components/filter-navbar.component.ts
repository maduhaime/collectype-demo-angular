import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarItemComponent } from './navbar-item.component';

@Component({
  selector: 'app-filter-navbar',
  standalone: true,
  imports: [CommonModule, NavbarItemComponent],
  host: {
    'class': 'is-block is-flex-desktop navbar is-success',
    'role': 'navigation',
    'aria-label': 'main navigation'
  },
  template: `
      <div class="navbar-brand">
        <a (click)="toggleMenu()" class="navbar-burger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" [class.is-active]="menuIsActive()">
        <div class="navbar-item">Filters:</div>
        <div class="navbar-start">
          <app-navbar-item filter="all()" [piping]="piping()" (change)="handleExpressionChange($event)">All</app-navbar-item>
          <app-navbar-item filter="experienced()" [piping]="piping()" (change)="handleExpressionChange($event)">Experienced</app-navbar-item>
          <app-navbar-item filter="flying()" [piping]="piping()" (change)="handleExpressionChange($event)">Flying</app-navbar-item>
          <app-navbar-item filter="intimidating()" [piping]="piping()" (change)="handleExpressionChange($event)">Intimidating</app-navbar-item>
          <app-navbar-item filter="legendary()" [piping]="piping()" (change)="handleExpressionChange($event)">Legendary</app-navbar-item>
          <app-navbar-item filter="rare()" [piping]="piping()" (change)="handleExpressionChange($event)">Rare</app-navbar-item>
          <app-navbar-item filter="tall()" [piping]="piping()" (change)="handleExpressionChange($event)">Tall</app-navbar-item>
          <app-navbar-item filter="flying() | rare()" [piping]="piping()" (change)="handleExpressionChange($event)">Flying + Rare</app-navbar-item>
        </div>
        <div class="navbar-end is-hidden-touch">
          <div class="navbar-item">
            Total:
            <span class="count">{{ count() }}</span>
          </div>
        </div>
      </div>
  `,
  styles: [`
    .count {
      font-weight: bold;
      text-align: right;
      font-size: 1.5rem;
      min-width: 4rem;
    }
  `]
})
export class FilterNavbarComponent {
  count = input.required<number>();
  piping = input.required<string>();
  change = output<string>();

  protected menuIsActive = signal(false);

  protected toggleMenu(): void {
    this.menuIsActive.update(active => !active);
  }

  protected handleExpressionChange(expression: string): void {
    this.change.emit(expression);
  }
}
