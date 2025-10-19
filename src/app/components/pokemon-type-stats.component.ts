import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Pokemon } from '../../models/Pokemon';
import { PokemonCollection } from '../../collections/PokemonCollection';
import { PokemonType } from '../../enums/PokemonType';
import { capitalize, padLeft } from '../../utils/string';

@Component({
  selector: 'app-pokemon-type-stats',
  standalone: true,
  imports: [CommonModule],
  host: {
    'class': 'is-block'
  },
  template: `
    <hr />
    <nav class="level">
      @for (type of pokemonTypes; track type) {
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7">{{ capitalize(type) }}</p>
            <p class="title has-text-primary is-size-5">
              {{ padLeft(collection().fn.arrayIncludes('types', type).count, '0', 3) }}
            </p>
          </div>
        </div>
      }
    </nav>
    <hr />
  `
})
export class PokemonTypeStatsComponent {
  pokemons = input.required<Pokemon[]>();

  protected collection = computed(() => new PokemonCollection(this.pokemons()));
  protected pokemonTypes = Object.values(PokemonType);
  protected capitalize = capitalize;
  protected padLeft = padLeft;
}
