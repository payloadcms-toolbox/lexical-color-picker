import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
	type LexicalEditor,
	SELECTION_CHANGE_COMMAND,
} from "@payloadcms/richtext-lexical/lexical";
import { useCallback, useEffect, useState } from "react";
import {
	applyTextColorToNodes,
	getFirstTextNodeColor,
} from "../../utils/textColorUtils";
import { TextColorIcon } from "../Icon";

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
};

export const Button = ({ editor, predefinedColors, defaultColor }: Props) => {
	const [currentColor, setCurrentColor] = useState<string>(defaultColor);

	useEffect(() => {
		const updateCurrentColor = () => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				const nodes = selection.getNodes();
				const selectionStyle = selection.style;
				const color = getFirstTextNodeColor(
					nodes,
					defaultColor,
					selectionStyle,
				);
				setCurrentColor(color);
			}
		};

		const unregisterCommand = editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			() => {
				editor.getEditorState().read(updateCurrentColor);
				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		const unregisterUpdateListener = editor.registerUpdateListener(
			({ editorState }) => {
				editorState.read(updateCurrentColor);
			},
		);

		return () => {
			unregisterCommand();
			unregisterUpdateListener();
		};
	}, [editor, defaultColor]);

	const changeTextColor = useCallback(
		(color: string) => {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					const nodes = selection.extract();
					applyTextColorToNodes(nodes, color);
				}
			});
		},
		[editor],
	);

	const handleColorInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newColor = e.target.value;
			setCurrentColor(newColor);
			changeTextColor(newColor);
		},
		[changeTextColor],
	);

	const handlePredefinedColorClick = useCallback(
		(color: string) => {
			setCurrentColor(color);
			changeTextColor(color);
		},
		[changeTextColor],
	);

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<TextColorIcon />
			<input
				type="color"
				value={currentColor}
				onChange={handleColorInputChange}
				aria-label="Pick text color"
				style={{ width: "40px", height: "30px", cursor: "pointer" }}
			/>
			{predefinedColors.map((color) => (
				<button
					key={color}
					type="button"
					onClick={() => handlePredefinedColorClick(color)}
					aria-label={`Set text color to ${color}`}
					style={{
						width: "30px",
						height: "30px",
						backgroundColor: color,
						border: currentColor === color ? "2px solid #000" : "1px solid #ccc",
						borderRadius: "4px",
						cursor: "pointer",
						padding: 0,
					}}
				/>
			))}
		</div>
	);
};
