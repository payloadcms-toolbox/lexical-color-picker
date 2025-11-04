import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";
import { applyBackgroundColorToNodes } from "../../../utils/textColorUtils";
import { ColorPickerButton } from "../../shared/ColorPickerButton";
import { Icon } from "../Icon";

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
		IconComponent={Icon}
		ariaLabel="Pick background color"
		cssProperty="background-color"
	/>
);
