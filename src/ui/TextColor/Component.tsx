import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical';
import { applyTextGradientToNodes } from '../../utils/gradientUtils';
import { applyTextColorToNodes } from '../../utils/textColorUtils';
import { ColorPickerButton } from '../shared/ColorPickerButton';

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
	gradients?: string[];
};

export const TextColorButton = ({
	editor,
	predefinedColors,
	defaultColor,
	gradients,
}: Props) => (
	<ColorPickerButton
		editor={editor}
		predefinedColors={predefinedColors}
		defaultColor={defaultColor}
		applyColorFn={applyTextColorToNodes}
		ariaLabel="Pick text color"
		cssProperty="color"
		gradients={gradients}
		applyGradientFn={applyTextGradientToNodes}
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
			aria-label="Text color"
		>
			<title>Text color</title>
			<path d="M4 20h16" />
			<path d="m6 16 6-12 6 12" />
			<path d="M8 12h8" />
		</svg>
	</ColorPickerButton>
);
