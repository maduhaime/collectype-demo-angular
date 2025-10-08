import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SortDir } from 'collectype';
import type { SortField } from '../../enums/PokemonSort';

@Component({
  selector: 'app-sort-navbar',
  standalone: true,
  imports: [CommonModule],
  host: {
    'class': 'is-block'
  },
  template: `
    <div class="columns is-mobile">
      <div class="column">
        <div class="buttons has-addons">
          <button class="button is-info is-small"
                  (click)="setField('id')"
                  [class.is-active]="sortField() === 'id'">ID</button>
          <button class="button is-info is-small"
                  (click)="setField('name')"
                  [class.is-active]="sortField() === 'name'">Name</button>
          <button class="button is-info is-small"
                  (click)="setField('species')"
                  [class.is-active]="sortField() === 'species'">Species</button>
          <button class="button is-info is-small"
                  (click)="setField('generation')"
                  [class.is-active]="sortField() === 'generation'">Generation</button>
          <button class="button is-info is-small"
                  (click)="setField('base_experience')"
                  [class.is-active]="sortField() === 'base_experience'">Base Experience</button>
          <button class="button is-info is-small"
                  (click)="setField('height')"
                  [class.is-active]="sortField() === 'height'">Height</button>
          <button class="button is-info is-small"
                  (click)="setField('weight')"
                  [class.is-active]="sortField() === 'weight'">Weight</button>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="buttons has-addons is-right">
          <button class="button is-info is-small"
                  (click)="setDir('asc')"
                  [class.is-active]="sortDir() === 'asc'">ASC</button>
          <button class="button is-info is-small"
                  (click)="setDir('desc')"
                  [class.is-active]="sortDir() === 'desc'">DESC</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .button {
      font-weight: bold;
    }
  `]
})
export class SortNavbarComponent {
  sortField = input.required<SortField>();
  sortDir = input.required<SortDir>();
  change = output<{ field: SortField; dir: SortDir }>();

  protected field = signal<SortField>('id');
  protected dir = signal<SortDir>('asc');

  protected setField(newField: SortField): void {
    this.field.set(newField);
    this.change.emit({ field: this.field(), dir: this.dir() });
  }

  protected setDir(newDir: SortDir): void {
    this.dir.set(newDir);
    this.change.emit({ field: this.field(), dir: this.dir() });
  }
}
