export enum FoodType {
  solid = 'solid',
  beverage = 'beverage',
}

export enum NutrientTypes {
  energy = 'energy',
  sugars = 'sugars',
  saturated_fat = 'saturated_fat',
  sodium = 'sodium',
  fruits_vegetables_nuts_colza_walnut_olive_oils = 'fruits_vegetables_nuts_colza_walnut_olive_oils',
  fiber = 'fiber',
  proteins = 'proteins',
}

export const badNutrients: NutrientTypes[] = [
  NutrientTypes.energy,
  NutrientTypes.sugars,
  NutrientTypes.saturated_fat,
  NutrientTypes.sodium,
];
export const goodNutrients: NutrientTypes[] = [
  NutrientTypes.proteins,
  NutrientTypes.fiber,
  NutrientTypes.fruits_vegetables_nuts_colza_walnut_olive_oils,
];

interface NutrientScore {
  [FoodType.solid]: Array<[number, number, number]>;
  [FoodType.beverage]: Array<[number, number, number]>;
}

export interface ScoreTable {
  [NutrientTypes.energy]: NutrientScore;
  [NutrientTypes.sugars]: NutrientScore;
  [NutrientTypes.saturated_fat]: NutrientScore;
  [NutrientTypes.sodium]: NutrientScore;
  [NutrientTypes.fruits_vegetables_nuts_colza_walnut_olive_oils]: NutrientScore;
  [NutrientTypes.fiber]: NutrientScore;
  [NutrientTypes.proteins]: NutrientScore;
  nutriClass: NutrientScore;
}

export interface NutrientValues {
  [NutrientTypes.energy]: number;
  [NutrientTypes.sugars]: number;
  [NutrientTypes.saturated_fat]: number;
  [NutrientTypes.sodium]: number;
  [NutrientTypes.fruits_vegetables_nuts_colza_walnut_olive_oils]: number;
  [NutrientTypes.fiber]: number;
  [NutrientTypes.proteins]: number;
}
