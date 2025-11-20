'use client';

import { BackgroundColorButton } from './ui/BackgroundColor';
import { TextColorButton } from './ui/TextColor';
import { createColorFeature } from './utils/createColorFeature';

export const TextColorFeatureClient = createColorFeature({
	featureKey: 'textColor',
	label: 'Text color',
	ButtonComponent: TextColorButton,
});

export const BackgroundColorFeatureClient = createColorFeature({
	featureKey: 'backgroundColor',
	label: 'Background color',
	ButtonComponent: BackgroundColorButton,
});
