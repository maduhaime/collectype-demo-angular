import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SortDir } from 'collectype';

import { PokemonCollection } from '../collections/PokemonCollection';
import type { Pokemon } from '../models/Pokemon';
import type { SortField } from '../enums/PokemonSort';

// Component imports
import { PokemonCardComponent } from './components/pokemon-card.component';
import { FilterNavbarComponent } from './components/filter-navbar.component';
import { PokemonStatsComponent } from './components/pokemon-stats.component';
import { FilterBreadcrumbComponent } from './components/filter-breadcrumb.component';
import { PokemonTypeStatsComponent } from './components/pokemon-type-stats.component';
import { SortNavbarComponent } from './components/sort-navbar.component';

/**
 * Pokemon data import (mocked for demo purposes)
 */
import { pokemons } from '../data/pokemons';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PokemonCardComponent,
    FilterNavbarComponent,
    PokemonStatsComponent,
    FilterBreadcrumbComponent,
    PokemonTypeStatsComponent,
    SortNavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  /**
   * Reactive signal for fetched Pokemon data
   */
  protected readonly fetched = signal<Pokemon[]>([]);

  /**
   * Collection wrapper for Pokemon operations
   */
  protected readonly collection = computed(() => new PokemonCollection(this.fetched()));

  /**
   * Current filter expression
   */
  protected readonly piping = signal('all()');

  /**
   * Current sort field and direction
   */
  protected readonly sortField = signal<SortField>('id');
  protected readonly sortDir = signal<SortDir>('asc');

  /**
   * Filtered and sorted Pokemon collection
   */
  protected readonly filtered = computed(() => {
    return this.collection().fn.pipe(this.piping()).sort(this.sortField(), this.sortDir());
  });

  /**
   * Handles filter changes from navbar
   */
  protected handleNavChange(filter: string): void {
    this.piping.set(filter);
  }

  /**
   * Handles sort changes from navbar
   */
  protected handleSortChange(event: { field: SortField; dir: SortDir }): void {
    this.sortField.set(event.field);
    this.sortDir.set(event.dir);
  }

  /**
   * Initializes Pokemon data on component initialization
   */
  ngOnInit(): void {
    try {
      this.fetched.set(pokemons);
      this.piping.set('all()');
    } catch (err) {
      console.error('Error fetching Pokemon:', err);
    }
  }
}
