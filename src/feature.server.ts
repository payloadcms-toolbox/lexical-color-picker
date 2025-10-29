import { createServerFeature } from "@payloadcms/richtext-lexical";
import type {
	TextColorClientFeatureProps,
	TextColorFeatureProps,
} from "./types";
import { DEFAULT_TEXT_COLOR, DEFAULT_TEXT_COLORS } from "./utils/constants";

export const TextColorFeature = createServerFeature<
	TextColorFeatureProps,
	TextColorClientFeatureProps,
	TextColorClientFeatureProps
>({
	key: "textColor",
	feature: ({ props }) => {
		// Provide defaults following Payload CMS patterns
		const predefinedColors = props?.predefinedColors || DEFAULT_TEXT_COLORS;
		const defaultColor = props?.defaultColor || DEFAULT_TEXT_COLOR;

		// Validate defaultColor is a valid color
		if (!defaultColor) {
			console.warn(
				"TextColorFeature: defaultColor is empty. Using default black color.",
			);
		}

		// Ensure predefinedColors array is not empty
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
