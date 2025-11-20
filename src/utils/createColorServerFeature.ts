import { createServerFeature } from '@payloadcms/richtext-lexical';
import type { ColorClientFeatureProps, ColorFeatureProps } from '../types';
import { DEFAULT_TEXT_COLOR, DEFAULT_TEXT_COLORS } from './constants';

export const createColorServerFeature = (
	key: string,
	clientFeatureId: string,
	featureName: string = key,
) =>
	createServerFeature<
		ColorFeatureProps,
		ColorClientFeatureProps,
		ColorClientFeatureProps
	>({
		key,
		feature: ({ props }) => {
			const predefinedColors = props?.predefinedColors || DEFAULT_TEXT_COLORS;
			const defaultColor = props?.defaultColor || DEFAULT_TEXT_COLOR;
			const gradients = props?.gradients;

			if (predefinedColors.length === 0) {
				console.warn(
					`${featureName}: predefinedColors array is empty. Using default colors.`,
				);

				return {
					ClientFeature: `@payloadcms-toolbox/lexical-color-picker/dist/feature.client#${clientFeatureId}`,
					clientFeatureProps: {
						predefinedColors: DEFAULT_TEXT_COLORS,
						defaultColor: DEFAULT_TEXT_COLOR,
						gradients,
					},
				};
			}

			return {
				ClientFeature: `@payloadcms-toolbox/lexical-color-picker/dist/feature.client#${clientFeatureId}`,
				clientFeatureProps: {
					predefinedColors,
					defaultColor,
					gradients,
				},
			};
		},
	});
