import type { Generation } from '../enums/Generation';

export type Pokemon = {
  id: number;
  name: string;
  types: Array<string>;
  base_experience: number;
  is_legendary: boolean;
  height: number;
  weight: number;
  stats: Map<string, number>;
  abilities: Set<string>;
  generation: Generation;
  species: string;
  sprite_url?: string;
};
