import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { CollectionInfo } from 'collectype';

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

        @for (step of info().steps; track $index) {
          <li>
            <span class="icon is-small">
              <i class="fas fa-filter" aria-hidden="true"></i>
            </span>
            <span>{{ step }}</span>
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
  /**
   * Signal containing the collection info with steps
   */
  info = input.required<CollectionInfo>();
}
