export type Vitamin =
	| 'folates'
	| 'niacin'
	| 'riboflavin'
	| 'thiamin'
	| 'vitamin-a'
	| 'vitamin-b6'
	| 'vitamin-b12'
	| 'vitamin-d'
	| 'vitamin-c'
	| 'vitamin-e'
	| 'vitamin-k';

export type Nutriment = 'proteins' | 'fat' | 'carbohydrates' | 'water' | 'fiber';

export type Vitamins = {
	[key in Vitamin]: number;
};

export type NonGenderAges =
	| '0-6'
	| '7-12'
	| '13-36'
	| '37-96'
	| 'pregnant'
	| 'breastfeeding';
export type GenderAges = '97-156' | '157-216' | '217-840' | '841-10000';

export type VitaminData = {
	[key in NonGenderAges]: {
		data: Vitamins;
	};
} & {
	[key in GenderAges]: {
		male: Vitamins;
		female: Vitamins;
	};
};

/**
 * Age in months
 */
export type Age = number;

/**
 * Weight in Kilograms
 */
export type Weight = number;

/**
 * Height in centimeters
 */
export type Height = number;

/**
 * Biological gender
 */
export type Sex = 'male' | 'female';

/**
 * Activity level (a number bigger or equal to 1)
 */
export type ActivityLevel = number;

export type Special = {
	pregnant?: boolean;
	breastfeeding?: boolean;
	trimester?: 1 | 2 | 3;
};

export interface Profile {
	weight: Weight;
	height: Height;
	age: Age;
	sex: Sex;
	activityLevel: ActivityLevel;
	special?: Special;
}

export type Deficits = Partial<Record<Vitamin | Nutriment, number>>;

export type RecommendationsBody = Record<
	string,
	| {
			action: 'eq';
			value: string | number | boolean;
	  }
	| {
			action: 'gt' | 'gte' | 'lt' | 'lte';
			value: number;
	  }
	| {
			action: 'bt';
			value: {
				min: number;
				max: number;
			};
	  }
	| {
			action: 'contains' | 'not_contains';
			value: any[];
	  }
>;

export type Preferences = {
	allergens: Record<string, boolean>;
	nutriments: Record<string, boolean>;
	ingredients: { id: string }[];
	vegetarian?: boolean;
	vegan?: boolean;
	pescatarian?: boolean;
	palmoil?: boolean;
};
