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
import { PaginationBarComponent } from './components/pagination-bar.component';

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
   * Current filter expression
   */
  protected readonly expression = signal('all()');

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
   * Filtered and sorted Pokemon collection
   */
  protected readonly filtered = computed(() => {
    return this.collection().fn.pipe(this.expression()).sort(this.sortField(), this.sortDir());
  });

  /**
   * Paginated Pokemon collection
   */
  protected readonly paginated = computed(() => {
    return this.collection().fn.pipe(this.expression()).sort(this.sortField(), this.sortDir()).page(this.page(), this.perPage());
  });

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
