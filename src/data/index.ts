import type { Pokemon } from '../models/Pokemon.js';

/**
 * Main Pokemon data index
 * Imports and merges all generation-based data files
 */

import { gen1 } from './pokemon-0001-0151.js';
import { gen2 } from './pokemon-0152-0251.js';
import { gen3 } from './pokemon-0252-0386.js';
import { gen4 } from './pokemon-0387-0493.js';
import { gen5 } from './pokemon-0494-0649.js';
import { gen6 } from './pokemon-0650-0721.js';
import { gen7 } from './pokemon-0722-0809.js';
import { gen8 } from './pokemon-0810-0905.js';
import { gen9 } from './pokemon-0906-1025.js';

/**
 * Complete array of all Pokemon (all generations)
 * Merged from individual generation files
 */
export const pokemons: Pokemon[] = [...gen1, ...gen2, ...gen3, ...gen4, ...gen5, ...gen6, ...gen7, ...gen8, ...gen9];
