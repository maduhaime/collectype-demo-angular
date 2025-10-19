import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Pokemon } from '../../models/Pokemon';
import { PokemonCollection } from '../../collections/PokemonCollection';
import { padLeft } from '../../utils/string';
import { Generation } from '../../enums/Generation';

@Component({
  selector: 'app-generation-stats',
  standalone: true,
  imports: [CommonModule],
  host: {
    'class': 'level is-hidden-touch'
  },
  template: `
    <!-- Option "All" -->
    <div [class]="'level-item has-text-centered py-2 ' + isActiveClass(null)">
      <div
        (click)="setGeneration(null)"
        style="cursor: pointer; text-decoration: none;"
      >
        <p class="heading is-size-7">All</p>
        <a class="title has-text-primary is-size-4">
          {{ padLeft(collection().count, '0', 3) }}
        </a>
      </div>
    </div>

    @for (gen of generations; track gen) {
      <div [class]="'level-item has-text-centered py-2 ' + isActiveClass(gen)">
        <div
          (click)="setGeneration(gen)"
          style="cursor: pointer; text-decoration: none;"

        >
          <p class="heading is-size-7">Gen {{ gen }}</p>
          <a class="title has-text-primary is-size-4">
            {{ padLeft(collection().fn.numberEquals('generation', gen).count, '0', 3) }}
          </a>
        </div>
      </div>
    }
  `,
  styles: [`
    a:hover {
      cursor: pointer;
    }

    div.is-active {
      color: var(--bulma-white);
      background-color: var(--bulma-primary);
      border-radius: 0.5rem;

      a {
        color: var(--bulma-white) !important;
      }
    }
  `]
})
export class GenerationStatsComponent {
  pokemons = input.required<Pokemon[]>();
  current = input<number | null>(null);
  change = output<number | null>();

  protected generation: number | null = null;

  protected collection = computed(() => new PokemonCollection(this.pokemons()));

  protected generations = Object.values(Generation).filter(gen => typeof gen === 'number') as number[];

  protected padLeft = padLeft;

  protected setGeneration(generation: number | null): void {
    this.generation = generation === null ? null : generation;
    this.change.emit(generation);
  }

  protected isActiveClass(generation: number | null): string {
    return this.current() === generation ? 'is-active' : '';
  }
}
