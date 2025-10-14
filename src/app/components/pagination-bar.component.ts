import { Component, input, output, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { CollectionInfo } from 'collectype';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (info().page) {
      <nav class="pagination is-small" role="navigation">
        <a
          (click)="setPage(info().page!.current - 1); $event.preventDefault()"
          class="pagination-previous"
          [class.is-disabled]="info().page!.current === 1"
          href="#">Previous</a>
        <a
          (click)="setPage(info().page!.current + 1); $event.preventDefault()"
          class="pagination-next"
          [class.is-disabled]="info().page!.current === info().page!.totalPages"
          href="#">Next</a>

        <ul class="pagination-list">
          @for (n of getPageNumbers(); track n) {
            <li>
              <a
                (click)="setPage(n); $event.preventDefault()"
                class="pagination-link"
                [class.is-current]="n === info().page!.current"
                href="#">{{ n }}</a>
            </li>
          }
        </ul>
      </nav>

      <div class="columns is-mobile is-vcentered mb-5">
        <div class="column">
          <p class="is-size-7">
            Items <b>{{ info().page!.startIndex + 1 }}</b> - <b>{{ info().page!.endIndex }}</b> of <b>{{ info().page!.totalItems }}</b>
          </p>
        </div>
        <div class="column is-flex is-vcentered is-justify-content-flex-end">
          <div><span class="is-size-7">Per Page :&nbsp;</span></div>
          <div class="field">
            <div class="control">
              <div class="select is-small">
                <select [value]="info().page!.perPage" (change)="setPerPage($event)">
                  <option [value]="20">20</option>
                  <option [value]="40">40</option>
                  <option [value]="60">60</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    a[href="#"] {
      text-decoration: none;
    }

    a[href="#"]:hover {
      text-decoration: none;
    }

    .is-disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  `]
})
export class PaginationBarComponent {
  /**
   * Collection info containing pagination state
   */
  info = input.required<CollectionInfo>();

  /**
   * Emits pagination change events
   */
  @Output() change = new EventEmitter<{ page: number; perPage: number }>();

  /**
   * Sets the current page
   */
  protected setPage(newPage: number): void {
    const pageInfo = this.info().page;
    if (!pageInfo) return;

    const { current, totalPages, perPage } = pageInfo;
    if (newPage === current || newPage < 1 || newPage > totalPages) return;

    this.change.emit({ page: newPage, perPage });
  }

  /**
   * Sets the items per page
   */
  protected setPerPage(event: Event): void {
    event.stopPropagation(); // Empêche l'événement de remonter

    const pageInfo = this.info().page;
    if (!pageInfo) return;

    const newPerPage = Number((event.target as HTMLSelectElement).value);
    const { perPage } = pageInfo;
    if (newPerPage === perPage) return;

    this.change.emit({ page: 1, perPage: newPerPage });
  }

  /**
   * Gets array of page numbers for pagination links
   */
  protected getPageNumbers(): number[] {
    const pageInfo = this.info().page;
    if (!pageInfo) return [];

    return Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1);
  }
}
