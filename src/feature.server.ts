import { createColorServerFeature } from './utils/createColorServerFeature';

export const BackgroundColorFeature = createColorServerFeature(
	'backgroundColor',
	'BackgroundColorFeatureClient',
	'BackgroundColorFeature',
);

export const TextColorFeature = createColorServerFeature(
	'textColor',
	'TextColorFeatureClient',
	'TextColorFeature',
);
