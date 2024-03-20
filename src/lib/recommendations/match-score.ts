import { Preferences } from './types';
import { ProductProps } from '@/api/product';

function haveCommonItem(array1: any[], array2: any[]) {
  const set = new Set(array2);

  for (let item of array1) {
    if (set.has(item)) {
      return true;
    }
  }

  return false;
}

export const getMatchScore = (
  product: ProductProps,
  preferences: Preferences,
) => {
  // console.log('hello', JSON.stringify(product.ingredients, null, 2))

  try {
    if (
      (preferences?.pescatarian && !product?.pescatarian) ||
      (preferences?.vegan && !product?.vegan) ||
      (preferences?.vegetarian && !product?.vegetarian) ||
      (preferences?.palmoil && !product?.palmoil)
    )
      return 0;

    console.log('hello', JSON.stringify(preferences.allergens, null, 2))

    if (preferences?.allergens && product?.allergens_tags) {
      const ownAllergens = Object.keys(preferences.allergens).filter(
        (el) => preferences.allergens[el],
      );

      if (haveCommonItem(product.allergens_tags, ownAllergens)) return 0;
    }

    if (preferences?.ingredients && product?.ingredients) {
      // console.log(preferences.ingredients.map((el) => el.id))
      if (
        haveCommonItem(
          product.ingredients.map((el) => el.id),
          preferences.ingredients.map((el) => el.id),
        )
      )
        return 0;
    }

    if (preferences?.nutriments && product?.nutriments) {
      let score = 100;

      if (preferences.nutriments.salt && product.nutriments.salt > 0.1) {
        score -= 17;
      }

      if (preferences.nutriments.sugars && product.nutriments.sugars > 0.1) {
        score -= 21;
      }

      if (preferences.nutriments.fat && product.nutriments.fat > 0.1) {
        score -= 24;
      }

      if (
        preferences?.nutriments['saturated-fat'] &&
        product?.nutriments.saturated_fat > 0.1
      ) {
        score -= 23;
      }

      if (
        preferences?.nutriments.nutriscore &&
        (preferences?.nutriments.nutriscore as unknown as string) !==
        product?.nutriscore_grade
      ) {
        score -= 15;
      }

      return score;
    }

    return 100;
  } catch (e) {
    // console.error(e);
    return 'Unknown';
  }
};
