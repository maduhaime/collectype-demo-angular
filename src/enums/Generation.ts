/**
 * Pokemon Generation enum mapping API strings to numbers
 */
export enum Generation {
  I = 1,
  II = 2,
  III = 3,
  IV = 4,
  V = 5,
  VI = 6,
  VII = 7,
  VIII = 8,
  IX = 9,
}

/**
 * Maps PokeAPI generation names to enum values
 */
export const GENERATION_MAP: Record<string, Generation> = {
  'generation-i': Generation.I,
  'generation-ii': Generation.II,
  'generation-iii': Generation.III,
  'generation-iv': Generation.IV,
  'generation-v': Generation.V,
  'generation-vi': Generation.VI,
  'generation-vii': Generation.VII,
  'generation-viii': Generation.VIII,
  'generation-ix': Generation.IX,
} as const;

/**
 * Utility functions for generation handling
 */
export const GenerationUtils = {
  /**
   * Converts API generation string to number
   */
  fromApiString(apiString: string): number {
    return GENERATION_MAP[apiString] || 0;
  },
};
