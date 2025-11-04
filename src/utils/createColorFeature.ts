import {
	createClientFeature,
	toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client";
import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";
import type { ColorClientFeatureProps } from "../types";

type ColorFeatureConfig = {
	featureKey: string;
	label: string;
	ButtonComponent: React.ComponentType<{
		editor: LexicalEditor;
		predefinedColors: string[];
		defaultColor: string;
	}>;
};

export const createColorFeature = ({
	featureKey,
	label,
	ButtonComponent,
}: ColorFeatureConfig) => {
	return createClientFeature<ColorClientFeatureProps>(({ props }) => {
		const { predefinedColors, defaultColor } = props;

		const ButtonWithProps = (buttonProps: {
			editor: LexicalEditor;
			anchorElem?: HTMLElement;
			active?: boolean;
			enabled?: boolean;
		}) => (
			<ButtonComponent
				{...buttonProps}
				predefinedColors={predefinedColors}
				defaultColor={defaultColor}
			/>
		);

		const toolbarConfig = {
			groups: [
				toolbarFeatureButtonsGroupWithItems([
					{
						key: featureKey,
						label,
						order: 1,
						Component: ButtonWithProps,
					},
				]),
			],
		};

		return {
			toolbarFixed: toolbarConfig,
			toolbarInline: toolbarConfig,
		};
	});
};
