export enum SortFieldEnum {
  ID = 'id',
  BASE_EXPERIENCE = 'base_experience',
  GENERATION = 'generation',
  HEIGHT = 'height',
  NAME = 'name',
  SPECIES = 'species',
  WEIGHT = 'weight',
}

export type SortField = SortFieldEnum | `${SortFieldEnum}`;
