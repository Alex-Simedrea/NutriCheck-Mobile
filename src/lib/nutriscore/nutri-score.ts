import {
  badNutrients,
  FoodType,
  goodNutrients,
  NutrientTypes,
  NutrientValues,
  ScoreTable,
} from './types.d';
import * as scoreTableJSON from './score-tables.json';

const scoreTable: ScoreTable = scoreTableJSON as ScoreTable;

const calculate = (
  nutrientValues: NutrientValues,
  foodType: FoodType = FoodType.solid,
): number => {
  const badNutrientsScore: number = nutrientListScore(
    badNutrients,
    foodType,
    nutrientValues,
  );
  const goodNutrientsScore: number = nutrientListScore(
    goodNutrients,
    foodType,
    nutrientValues,
  );

  const fruitScore: number = nutrientScore(
    scoreTable[NutrientTypes.fruits_vegetables_nuts_colza_walnut_olive_oils][foodType],
    nutrientValues[NutrientTypes.fruits_vegetables_nuts_colza_walnut_olive_oils],
  );
  const fiberScore: number = nutrientScore(
    scoreTable[NutrientTypes.fiber][foodType],
    nutrientValues[NutrientTypes.fiber],
  );

  return badNutrientsScore >= 11 && fruitScore < 5
    ? badNutrientsScore - fiberScore - fruitScore
    : badNutrientsScore - goodNutrientsScore;
};

const nutrientScore = (
  nutrientScoreRanges: Array<[number, number, number]>,
  nutrientValue: number,
): number => {
  return nutrientScoreRanges.reduce(
    (score: number, range: number[]) =>
      inRange(nutrientValue, range[0], range[1]) ? range[2] : score,
    0,
  );
};

const nutrientListScore = (
  nutrientList: NutrientTypes[],
  foodType: FoodType,
  nutrientValues: NutrientValues,
): number => {
  return nutrientList.reduce(
    (score: number, nutrientType: NutrientTypes): number => {
      const currentScore: number = nutrientScore(
        scoreTable[nutrientType][foodType],
        nutrientValues[nutrientType],
      );
      return score + currentScore;
    },
    0,
  );
};

const inRange = (x: number, min: number, max: number): boolean =>
  (x - 0.000001 - min) * (x - max) <= 0;

export const getNutriScore = (
  nutrientValues: NutrientValues,
  foodType: FoodType = FoodType.solid,
): string => {
  const score = calculate(nutrientValues, foodType);
  const classNumber = nutrientScore(scoreTable.nutriClass[foodType], score);
  return String.fromCharCode(64 + classNumber);
};
