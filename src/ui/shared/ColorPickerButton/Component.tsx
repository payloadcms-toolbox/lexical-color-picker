import {
	FloatingPortal,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from "@floating-ui/react";
import type { LexicalNode } from "@payloadcms/richtext-lexical/lexical";
import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
	type LexicalEditor,
	SELECTION_CHANGE_COMMAND,
} from "@payloadcms/richtext-lexical/lexical";
import { useCallback, useEffect, useState } from "react";
import { type ColorResult, TwitterPicker } from "react-color";
import { getFirstTextNodeColor } from "../../../utils/textColorUtils";
import * as styles from "./styles.css";

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
	applyColorFn: (nodes: LexicalNode[], color: string) => void;
	IconComponent: React.ComponentType;
	ariaLabel: string;
	cssProperty: string; // 'color' or 'background-color'
};

export const ColorPickerButton = ({
	editor,
	predefinedColors,
	defaultColor,
	applyColorFn,
	IconComponent,
	ariaLabel,
	cssProperty,
}: Props) => {
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
					cssProperty,
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
	}, [editor, defaultColor, cssProperty]);

	const changeColor = useCallback(
		(color: string) => {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					const nodes = selection.extract();
					applyColorFn(nodes, color);
				}
			});
		},
		[editor, applyColorFn],
	);

	const handleColorChange = useCallback(
		(color: ColorResult) => {
			const newColor = color.hex;
			setCurrentColor(newColor);
			changeColor(newColor);
		},
		[changeColor],
	);

	return (
		<div className={styles.buttonWrapper}>
			<button
				type="button"
				ref={refs.setReference}
				className={styles.colorButton}
				aria-label={ariaLabel}
				{...getReferenceProps()}
			>
				<IconComponent />
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
