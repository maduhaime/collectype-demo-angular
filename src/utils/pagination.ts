/**
 * Configuration constants for pagination display
 */
export const PAGINATION_CONFIG = {
  /** Always show first N pages */
  FIRST: 2,
  /** Alwas show last N pages */
  LAST: 2,
  /** Show N pages around current page */
  AROUND: 2,
  /** Maximum pages to show before using ellipses */
  MAX_VISIBLE: 10,
} as const;

/**
 * Basic pagination information needed for calculations
 */
export interface PaginationInfo {
  current: number;
  total: number;
}

/**
 * Returns an array of pages to display with ellipses
 * Simple function that returns [1,2,'...',10,11,12,13,14,'...',19,20] format
 *
 * @param current - Current page number
 * @param total - Total number of pages
 * @param config - Display configuration (optional)
 * @returns Array of page numbers and '...' strings
 *
 * @example
 * ```typescript
 * paginationNumbers(12, 20) // [1, '...', 11, 12, 13, '...', 20]
 * paginationNumbers(2, 5)   // [1, 2, 3, 4, 5]
 * paginationNumbers(1, 100) // [1, 2, '...', 100]
 * ```
 */
export function paginationNumbers(current: number, total: number, config = PAGINATION_CONFIG): (number | string)[] {
  const { FIRST, LAST, AROUND, MAX_VISIBLE } = config;

  // Handle edge cases
  if (total <= 0 || current < 1 || current > total) {
    return [];
  }

  // If we have few pages, show all
  if (total <= MAX_VISIBLE) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  // Always add first pages
  for (let i = 1; i <= FIRST; i++) {
    pages.push(i);
  }

  // Calculate range around current
  const aroundStart = Math.max(FIRST + 1, current - AROUND);
  const aroundEnd = Math.min(total - LAST, current + AROUND);

  // Add left ellipsis if there's a gap
  if (aroundStart > FIRST + 1) {
    pages.push('...');
  }

  // Add pages around current (avoid duplicates)
  for (let i = aroundStart; i <= aroundEnd; i++) {
    if (i > FIRST && i <= total - LAST) {
      pages.push(i);
    }
  }

  // Add right ellipsis if there's a gap
  if (aroundEnd < total - LAST) {
    pages.push('...');
  }

  // Always add last pages (avoid duplicates)
  for (let i = Math.max(FIRST + 1, total - LAST + 1); i <= total; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return pages;
}
