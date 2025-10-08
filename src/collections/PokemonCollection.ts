import { Collection, FullFunctions } from 'collectype';

import type { Pokemon } from '../models/Pokemon';

/**
 * Extended functions for Pokémon collections with domain-specific filtering capabilities.
 * Inherits all standard collection operations and adds Pokémon-specific business logic.
 */
export class PokemonFunctions extends FullFunctions<Pokemon> {
  experienced(minExperience: number = 100): this {
    return this.numberIsPositive('base_experience').numberGreaterOrEqual('base_experience', minExperience);
  }

  flying(): this {
    return this.arrayIncludes('types', 'flying');
  }

  intimidating(): this {
    return this.setIncludes('abilities', 'intimidate');
  }

  legendary(flag: boolean = true): this {
    return this.booleanEquals('is_legendary', flag);
  }

  rare(threshold: number = 200): this {
    return this.numberGreaterOrEqual('base_experience', threshold);
  }

  tall(threshold: number = 20): this {
    return this.numberGreaterOrEqual('height', threshold);
  }
}

/**
 * Collection wrapper for Pokémon items with specialized PokemonFunctions.
 *
 * This class provides easy access to Pokémon-specific operations through the `fn` property,
 * including custom filters like `.legendary()` and `.experienced()`, in addition to all standard collection methods.
 *
 * Example usage (type inference for the functions class is automatic):
 *   const collection = new PokemonCollection(pokemons);
 *   const legendary = collection.fn.legendary();
 *   const experienced = collection.fn.experienced();
 */
export class PokemonCollection extends Collection<Pokemon, PokemonFunctions> {
  constructor(items: Pokemon[]) {
    super(items, PokemonFunctions);
  }
}
