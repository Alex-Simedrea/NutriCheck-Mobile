// @ts-nocheck

import {
	ActivityLevel,
	Age,
	Deficits,
	GenderAges,
	Height,
	NonGenderAges,
	Nutriment,
	Preferences,
	Profile,
	RecommendationsBody,
	Sex,
	Special,
	Vitamin,
	Weight
} from './types';
import { params, specialDefault, vitaminData } from './constants';

export const calculateBMR = (weight: Weight, height: Height, age: Age, sex: Sex) => {
	if (sex === 'male') {
		return 10 * weight + 6.25 * height - (5 * age) / 12 + 5;
	} else {
		return 10 * weight + 6.25 * height - (5 * age) / 12 - 161;
	}
}

export const getAgeGroup = (age: Age, special: Special) => {
	if (special.pregnant) {
		return 'pregnant';
	}

	if (special.breastfeeding) {
		return 'breastfeeding';
	}

	return Object.keys(vitaminData).find(
		(group) => age >= +group.split('-')[0] && age <= +group.split('-')[1]
	);
};

export const pregnantData = (special: Special) => {
	if (special.pregnant) {
		if (special.trimester === 1) {
			return 0;
		}

		if (special.trimester === 2) {
			return 340;
		}

		return 450;
	}

	return 0;
};

export const getData = (
	weight: Weight,
	height: Height,
	age: Age,
	sex: Sex,
	activityLevel: ActivityLevel,
	special: Special = specialDefault
): {
	eer: number;
	bmr: number;
	data: Record<Vitamin | Nutriment, number>;
} => {
	const bmr = calculateBMR(weight, height, age, sex) + pregnantData(special);
	const eer = bmr * activityLevel;

	const ageGroup = getAgeGroup(age, special);

	const vitaminGroup = vitaminData[ageGroup as NonGenderAges | GenderAges];

	let vitamins;

	if ('data' in vitaminGroup) {
		vitamins = vitaminGroup.data;
	} else {
		vitamins = vitaminGroup[sex];
	}

	return {
		data: {
			...vitamins,
			proteins: (10 / 100) * eer,
			fat: (20 / 100) * eer,
			carbohydrates: (45 / 100) * eer,
			water: eer,
			fiber: (eer / 1000) * 14
		},
		eer,
		bmr
	};
};

export const getDeficits = (profile: Profile, products: Deficits[]) => {
	const deficits: Deficits = {};

	// console.log(products[0].proteins, 'ok');

	const optimal = getData(
		profile.weight,
		profile.height,
		profile.age,
		profile.sex,
		profile.activityLevel,
		profile.special
	);

	for (const param of params) {
		try {
			deficits[param] =
				(optimal.data[param] ?? 0) -
				(products.reduce(
					(accumulator, currentValue) => accumulator + (currentValue[param] ?? 0),
					0
				) ?? 0);
		} catch (e) {
			console.log(param, e, products);
		}
	}

	return {
		deficits,
		eer: optimal.eer,
		bmr: optimal.bmr
	};
};

export const generateRecommendationsBody = (
	deficits: Deficits,
	preferences: Preferences
) => {
	const mandatory: RecommendationsBody = {},
		optional: RecommendationsBody = {};

	if (deficits.fiber! > 0) {
		optional[`product.nutriscore_data.fiber`] = {
			action: 'bt',
			value: {
				min: 1,
				max: deficits.fiber! * 1.5
			}
		};
	}

	for (const nutriment of params) {
		if (deficits[nutriment]! > 0) {
			optional[`product.nutriments.${nutriment}`] = {
				action: 'bt',
				value: {
					min: 1,
					max: deficits[nutriment]! * 1.5
				}
			};
		}
	}

	const allergens = Object.keys(preferences.allergens).filter(
		(el) => preferences.allergens[el]
	);

	const ingredients = preferences.ingredients.map((el: { id: string }) => ({
		id: el.id
	}));

	if (ingredients.length > 0) {
		mandatory['product.ingredients'] = {
			action: 'not_contains',
			value: ingredients
		};
	}

	if (allergens.length > 0) {
		mandatory['product.allergens_tags'] = {
			action: 'not_contains',
			value: allergens
		};
	}

	if (preferences.vegetarian)
		mandatory['product.vegetarian'] = { action: 'eq', value: true };

	if (preferences.vegan)
		mandatory['product.vegan'] = { action: 'eq', value: true };

	if (preferences.pescatarian)
		mandatory['product.pescatarian'] = { action: 'eq', value: true };

	if (preferences.palmoil)
		mandatory['product.palmoil'] = { action: 'eq', value: true };

	if (preferences.nutriments.nutriscore) {
		mandatory['product.nutriscore_grade'] = {
			action: 'eq',
			value: preferences.nutriments.nutriscore
		};
	}

	if (preferences.nutriments.salt) {
		mandatory['product.nutriments.salt'] = {
			action: 'eq',
			value: 0
		};
	}

	if (preferences.nutriments.sugars) {
		mandatory['product.nutriments.sugars'] = {
			action: 'eq',
			value: 0
		};
	}

	if (preferences.nutriments.fat) {
		mandatory['product.nutriments.fat'] = {
			action: 'eq',
			value: 0
		};
	}

	if (preferences.nutriments['saturated-fat']) {
		mandatory['product.nutriments.saturated-fat'] = {
			action: 'eq',
			value: 0
		};
	}

	return {
		mandatory,
		optional
	};
};

