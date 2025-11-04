import { createServerFeature } from "@payloadcms/richtext-lexical";
import type { ColorClientFeatureProps, ColorFeatureProps } from "./types";
import { DEFAULT_TEXT_COLOR, DEFAULT_TEXT_COLORS } from "./utils/constants";

export const BackgroundColorFeature = createServerFeature<
	ColorFeatureProps,
	ColorClientFeatureProps,
	ColorClientFeatureProps
>({
	key: "backgroundColor",
	feature: ({ props }) => {
		const predefinedColors = props?.predefinedColors || DEFAULT_TEXT_COLORS;
		const defaultColor = props?.defaultColor || DEFAULT_TEXT_COLOR;

		if (!defaultColor) {
			console.warn(
				"TextColorFeature: defaultColor is empty. Using default black color.",
			);
		}

		if (predefinedColors.length === 0) {
			console.warn(
				"TextColorFeature: predefinedColors array is empty. Using default colors.",
			);

			return {
				ClientFeature:
					"@payloadcms-toolbox/lexical-color-picker/dist/feature.client#BackgroundColorFeatureClient",
				clientFeatureProps: {
					predefinedColors: DEFAULT_TEXT_COLORS,
					defaultColor: DEFAULT_TEXT_COLOR,
				},
			};
		}

		return {
			ClientFeature:
				"@payloadcms-toolbox/lexical-color-picker/dist/feature.client#BackgroundColorFeatureClient",
			clientFeatureProps: {
				predefinedColors,
				defaultColor,
			},
		};
	},
});

export const TextColorFeature = createServerFeature<
	ColorFeatureProps,
	ColorClientFeatureProps,
	ColorClientFeatureProps
>({
	key: "textColor",
	feature: ({ props }) => {
		const predefinedColors = props?.predefinedColors || DEFAULT_TEXT_COLORS;
		const defaultColor = props?.defaultColor || DEFAULT_TEXT_COLOR;

		if (!defaultColor) {
			console.warn(
				"TextColorFeature: defaultColor is empty. Using default black color.",
			);
		}

		if (predefinedColors.length === 0) {
			console.warn(
				"TextColorFeature: predefinedColors array is empty. Using default colors.",
			);

			return {
				ClientFeature:
					"@payloadcms-toolbox/lexical-color-picker/dist/feature.client#TextColorFeatureClient",
				clientFeatureProps: {
					predefinedColors: DEFAULT_TEXT_COLORS,
					defaultColor: DEFAULT_TEXT_COLOR,
				},
			};
		}

		return {
			ClientFeature:
				"@payloadcms-toolbox/lexical-color-picker/dist/feature.client#TextColorFeatureClient",
			clientFeatureProps: {
				predefinedColors,
				defaultColor,
			},
		};
	},
});
