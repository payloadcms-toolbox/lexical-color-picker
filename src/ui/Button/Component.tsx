import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
	type LexicalEditor,
	SELECTION_CHANGE_COMMAND,
} from "@payloadcms/richtext-lexical/lexical";
import { useCallback, useEffect, useState } from "react";
import { TwitterPicker, type ColorResult } from "react-color";
import {
	useFloating,
	useClick,
	useDismiss,
	useInteractions,
	FloatingPortal,
	offset,
	flip,
	shift,
} from "@floating-ui/react";
import {
	applyTextColorToNodes,
	getFirstTextNodeColor,
} from "../../utils/textColorUtils";
import { TextColorIcon } from "../Icon";
import * as styles from "./styles.css";

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
};

export const Button = ({ editor, predefinedColors, defaultColor }: Props) => {
	const [currentColor, setCurrentColor] = useState<string>(defaultColor);
	const [isOpen, setIsOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [offset(8), flip(), shift({ padding: 8 })],
		placement: "bottom-start",
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

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

	const handleColorChange = useCallback(
		(color: ColorResult) => {
			const newColor = color.hex;
			setCurrentColor(newColor);
			changeTextColor(newColor);
		},
		[changeTextColor],
	);

	return (
		<div className={styles.buttonWrapper}>
			<button
				type="button"
				ref={refs.setReference}
				className={styles.colorButton}
				aria-label="Pick text color"
				{...getReferenceProps()}
			>
				<TextColorIcon />
				<span
					className={styles.colorIndicator}
					style={{ backgroundColor: currentColor }}
				/>
			</button>

			{isOpen && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className={styles.popover}
						{...getFloatingProps()}
					>
						<TwitterPicker
							color={currentColor}
							onChange={handleColorChange}
							colors={predefinedColors}
							triangle="hide"
						/>
					</div>
				</FloatingPortal>
			)}
		</div>
	);
};
