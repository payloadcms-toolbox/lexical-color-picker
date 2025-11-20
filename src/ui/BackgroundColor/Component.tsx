import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical';

import { applyBackgroundColorToNodes } from '../../utils/textColorUtils';
import { ColorPickerButton } from '../shared/ColorPickerButton';

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
};

export const BackgroundColorButton = ({
	editor,
	predefinedColors,
	defaultColor,
}: Props) => (
	<ColorPickerButton
		editor={editor}
		predefinedColors={predefinedColors}
		defaultColor={defaultColor}
		applyColorFn={applyBackgroundColorToNodes}
		ariaLabel="Pick background color"
		cssProperty="background-color"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Background color button</title>
			<path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
			<path d="m5 2 5 5" />
			<path d="M2 13h15" />
			<path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
		</svg>
	</ColorPickerButton>
);
