import { Component, computed, input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Pokemon } from '../../models/Pokemon';
import { PokemonCollection } from '../../collections/PokemonCollection';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [CommonModule],
  host: {
    'class': 'is-block'
  },
  template: `
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">All</p>
          <p class="title">{{ collection().count }}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Experienced</p>
          <p class="title">{{ collection().fn.experienced().count }}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Flying</p>
          <p class="title">{{ collection().fn.flying().count }}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Intimidating</p>
          <p class="title">{{ collection().fn.intimidating().count }}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Legendary</p>
          <p class="title">{{ collection().fn.legendary().count }}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Rare</p>
          <p class="title">{{ collection().fn.rare().count }}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Tall</p>
          <p class="title">{{ collection().fn.tall().count }}</p>
        </div>
      </div>
    </nav>
  `
})
export class PokemonStatsComponent {
  pokemons = input.required<Pokemon[]>();

  protected collection = computed(() => new PokemonCollection(this.pokemons()));
}
