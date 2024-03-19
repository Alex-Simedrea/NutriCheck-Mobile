import { Nutriment, Special, Vitamin, VitaminData } from './types';

export const vitaminData: VitaminData = {
	'0-6': {
		data: {
			folates: 65,
			niacin: 2,
			riboflavin: 0.3,
			thiamin: 0.2,
			'vitamin-a': 400,
			'vitamin-b6': 0.1,
			'vitamin-b12': 0.4,
			'vitamin-d': 40,
			'vitamin-c': 400,
			'vitamin-e': 4,
			'vitamin-k': 2.0
		}
	},
	'7-12': {
		data: {
			folates: 80,
			niacin: 4,
			riboflavin: 0.4,
			thiamin: 0.3,
			'vitamin-a': 500,
			'vitamin-b6': 0.3,
			'vitamin-b12': 0.5,
			'vitamin-d': 50,
			'vitamin-c': 400,
			'vitamin-e': 5,
			'vitamin-k': 2.5
		}
	},
	'13-36': {
		data: {
			folates: 150,
			niacin: 6,
			riboflavin: 0.5,
			thiamin: 0.5,
			'vitamin-a': 300,
			'vitamin-b6': 0.5,
			'vitamin-b12': 0.9,
			'vitamin-d': 15,
			'vitamin-c': 600,
			'vitamin-e': 6,
			'vitamin-k': 30
		}
	},
	'37-96': {
		data: {
			folates: 200,
			niacin: 8,
			riboflavin: 0.6,
			thiamin: 0.6,
			'vitamin-a': 400,
			'vitamin-b6': 0.6,
			'vitamin-b12': 1.2,
			'vitamin-d': 25,
			'vitamin-c': 600,
			'vitamin-e': 7,
			'vitamin-k': 55
		}
	},
	'97-156': {
		male: {
			folates: 300,
			niacin: 12,
			riboflavin: 0.9,
			thiamin: 0.9,
			'vitamin-a': 600,
			'vitamin-b6': 1.0,
			'vitamin-b12': 1.8,
			'vitamin-d': 45,
			'vitamin-c': 600,
			'vitamin-e': 11,
			'vitamin-k': 60
		},
		female: {
			folates: 300,
			niacin: 12,
			riboflavin: 0.9,
			thiamin: 0.9,
			'vitamin-a': 600,
			'vitamin-b6': 1.0,
			'vitamin-b12': 1.8,
			'vitamin-d': 45,
			'vitamin-c': 600,
			'vitamin-e': 11,
			'vitamin-k': 60
		}
	},
	'157-216': {
		male: {
			folates: 400,
			niacin: 16,
			riboflavin: 1.3,
			thiamin: 1.2,
			'vitamin-a': 900,
			'vitamin-b6': 1.3,
			'vitamin-b12': 2.4,
			'vitamin-d': 75,
			'vitamin-c': 600,
			'vitamin-e': 15,
			'vitamin-k': 75
		},
		female: {
			folates: 400,
			niacin: 14,
			riboflavin: 1.0,
			thiamin: 1.0,
			'vitamin-a': 700,
			'vitamin-b6': 1.2,
			'vitamin-b12': 2.4,
			'vitamin-d': 65,
			'vitamin-c': 600,
			'vitamin-e': 15,
			'vitamin-k': 75
		}
	},
	'217-840': {
		male: {
			folates: 400,
			niacin: 16,
			riboflavin: 1.3,
			thiamin: 1.2,
			'vitamin-a': 900,
			'vitamin-b6': 1.3,
			'vitamin-b12': 2.4,
			'vitamin-d': 90,
			'vitamin-c': 600,
			'vitamin-e': 15,
			'vitamin-k': 120
		},
		female: {
			folates: 400,
			niacin: 14,
			riboflavin: 1.1,
			thiamin: 1.1,
			'vitamin-a': 700,
			'vitamin-b6': 1.3,
			'vitamin-b12': 2.4,
			'vitamin-d': 75,
			'vitamin-c': 600,
			'vitamin-e': 15,
			'vitamin-k': 90
		}
	},
	'841-10000': {
		male: {
			folates: 400,
			niacin: 16,
			riboflavin: 1.3,
			thiamin: 1.2,
			'vitamin-a': 900,
			'vitamin-b6': 1.7,
			'vitamin-b12': 2.4,
			'vitamin-d': 90,
			'vitamin-c': 800,
			'vitamin-e': 15,
			'vitamin-k': 120
		},
		female: {
			folates: 400,
			niacin: 14,
			riboflavin: 1.1,
			thiamin: 1.1,
			'vitamin-a': 700,
			'vitamin-b6': 1.5,
			'vitamin-b12': 2.4,
			'vitamin-d': 75,
			'vitamin-c': 800,
			'vitamin-e': 15,
			'vitamin-k': 90
		}
	},
	pregnant: {
		data: {
			folates: 600,
			niacin: 18,
			riboflavin: 1.4,
			thiamin: 1.4,
			'vitamin-a': 770,
			'vitamin-b6': 1.9,
			'vitamin-b12': 2.6,
			'vitamin-d': 85,
			'vitamin-c': 600,
			'vitamin-e': 15,
			'vitamin-k': 90
		}
	},
	breastfeeding: {
		data: {
			folates: 500,
			niacin: 17,
			riboflavin: 1.6,
			thiamin: 1.4,
			'vitamin-a': 1300,
			'vitamin-b6': 2.0,
			'vitamin-b12': 2.8,
			'vitamin-d': 120,
			'vitamin-c': 600,
			'vitamin-e': 19,
			'vitamin-k': 90
		}
	}
};

export const params: (Vitamin | Nutriment)[] = [
	'folates',
	'niacin',
	'riboflavin',
	'thiamin',
	'vitamin-a',
	'vitamin-b6',
	'vitamin-b12',
	'vitamin-d',
	'vitamin-c',
	'vitamin-e',
	'vitamin-k',
	'proteins',
	'fat',
	'carbohydrates',
	'water',
	'fiber'
];

export const specialDefault: Special = {
	breastfeeding: false,
	pregnant: false
};
