import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  host: {
    'class': 'is-block'
  },
  template: `
    <nav class="breadcrumb is-small mt-0">
      <ul>
        <li>
          <span class="icon is-small">
            <i class="fas fa-home" aria-hidden="true"></i>
          </span>
          <span>Pokemons</span>
        </li>

        @for (part of breadcrumb(); track $index) {
          <li>
            <span class="icon is-small">
              <i class="fas fa-filter" aria-hidden="true"></i>
            </span>
            <span>{{ part }}</span>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    li::before {
      margin: 0 0.5rem;
    }
  `]
})
export class FilterBreadcrumbComponent {
  piping = input.required<string>();

  protected breadcrumb = computed(() => {
    const parts = this.piping().split('|').map((part: string) => part.trim());
    return parts;
  });
}
