import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";
import { applyTextColorToNodes } from "../../../utils/textColorUtils";
import { ColorPickerButton } from "../../shared/ColorPickerButton";
import { TextColorIcon } from "../Icon";

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
};

export const TextColorButton = ({
	editor,
	predefinedColors,
	defaultColor,
}: Props) => (
	<ColorPickerButton
		editor={editor}
		predefinedColors={predefinedColors}
		defaultColor={defaultColor}
		applyColorFn={applyTextColorToNodes}
		IconComponent={TextColorIcon}
		ariaLabel="Pick text color"
		cssProperty="color"
	/>
);
