import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SortDir } from 'collectype';

import { PokemonCollection } from '../collections/PokemonCollection';
import type { Pokemon } from '../models/Pokemon';
import type { SortField } from '../enums/PokemonSort';

// Component imports
import { FilterBreadcrumbComponent } from './components/filter-breadcrumb.component';
import { FilterNavbarComponent } from './components/filter-navbar.component';
import { GenerationStatsComponent } from './components/generation-stats.component';
import { PaginationBarComponent } from './components/pagination-bar.component';
import { PokemonCardComponent } from './components/pokemon-card.component';
import { PokemonStatsComponent } from './components/pokemon-stats.component';
import { PokemonTypeStatsComponent } from './components/pokemon-type-stats.component';
import { SortNavbarComponent } from './components/sort-navbar.component';

/**
 * Pokemon data import (mocked for demo purposes)
 */
import { pokemons } from '../data';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PokemonCardComponent,
    FilterNavbarComponent,
    PokemonStatsComponent,
    FilterBreadcrumbComponent,
    GenerationStatsComponent,
    PokemonTypeStatsComponent,
    SortNavbarComponent,
    PaginationBarComponent
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
   * Current generation number or null for all generations
   */
  protected readonly generation = signal<number | null>(null);

  /**
   * Current filter expression
   */
  protected readonly expression = signal<string>('all()');

  /**
   * Current sort field and direction
   */
  protected readonly sortField = signal<SortField>('id');
  protected readonly sortDir = signal<SortDir>('asc');

  /**
   * Current pagination page and perPage
   */
  protected page = signal<number>(1);
  protected perPage = signal<number>(20);

  /**
   * Generationalized Pokemon collection
   */
  protected readonly generationalized = computed(() => {
    return this.collection().fn.generation(this.generation());
  });

  /**
   * Filtered and sorted Pokemon collection
   */
  protected readonly filtered = computed(() => {
    return this.collection().fn.generation(this.generation()).pipe(this.expression()).sort(this.sortField(), this.sortDir());
  });

  /**
   * Paginated Pokemon collection
   */
  protected readonly paginated = computed(() => {
    return this.collection().fn.generation(this.generation()).pipe(this.expression()).sort(this.sortField(), this.sortDir()).page(this.page(), this.perPage());
  });

  /**
   * Handles generation changes
   */
  protected handleGenerationChange(newGeneration: number | null): void {
    this.page.set(1); // Reset to first page when changing filter
    this.generation.set(newGeneration);
  }

  /**
   * Handles expression changes
   */
  protected handleExpressionChange(newExpression: string): void {
    this.page.set(1); // Reset to first page when changing filter
    this.expression.set(newExpression);
  }

  /**
   * Handles sort changes from navbar
   */
  protected handleSortChange(event: { field: SortField; dir: SortDir }): void {
    this.sortField.set(event.field);
    this.sortDir.set(event.dir);
  }

  /**
   * Handles pagination changes
   */
  protected handlePageChange(event: { page: number; perPage: number }): void {
    // Ignore les événements DOM qui ne sont pas nos événements personnalisés
    if (!event || typeof event.page !== 'number' || typeof event.perPage !== 'number') {
      return;
    }

    this.page.set(event.page);
    this.perPage.set(event.perPage);
  }  /**
   * Initializes Pokemon data on component initialization
   */
  ngOnInit(): void {
    try {
      this.fetched.set(pokemons);
      this.expression.set('all()');
    } catch (err) {
      console.error('Error fetching Pokemon:', err);
    }
  }
}
