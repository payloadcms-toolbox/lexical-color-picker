import {
	createClientFeature,
	toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical';
import type { FC } from 'react';
import type { ColorClientFeatureProps } from '../types';

type ColorFeatureConfig = {
	featureKey: string;
	label: string;
	ButtonComponent: FC<{
		editor: LexicalEditor;
		predefinedColors: string[];
		defaultColor: string;
		gradients?: string[];
	}>;
};

export const createColorFeature = ({
	featureKey,
	label,
	ButtonComponent,
}: ColorFeatureConfig) =>
	createClientFeature<ColorClientFeatureProps>(({ props }) => {
		const { predefinedColors, defaultColor, gradients } = props;

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
				gradients={gradients}
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
		};
	});
