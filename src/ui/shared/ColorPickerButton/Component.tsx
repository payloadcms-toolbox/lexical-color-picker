import {
	FloatingPortal,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react';
import type { LexicalNode } from '@payloadcms/richtext-lexical/lexical';
import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
	type LexicalEditor,
	SELECTION_CHANGE_COMMAND,
} from '@payloadcms/richtext-lexical/lexical';
import {
	type PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { type ColorResult, TwitterPicker } from 'react-color';
import {
	extractBackgroundGradient,
	isGradient,
} from '../../../utils/gradientUtils';
import { getFirstTextNodeColor } from '../../../utils/textColorUtils';
import { SegmentedControl, SegmentedControlItem } from '../SegmentedControl';
import * as styles from './styles.css';

type PickerMode = 'linear' | 'gradient';

type Props = {
	editor: LexicalEditor;
	predefinedColors: string[];
	defaultColor: string;
	applyColorFn: (nodes: LexicalNode[], color: string) => void;
	ariaLabel: string;
	cssProperty: string;
	gradients?: string[];
	applyGradientFn?: (nodes: LexicalNode[], gradient: string) => void;
};

export const ColorPickerButton = ({
	editor,
	predefinedColors,
	defaultColor,
	applyColorFn,
	ariaLabel,
	cssProperty,
	gradients,
	applyGradientFn,
	children,
}: PropsWithChildren<Props>) => {
	const [currentColor, setCurrentColor] = useState<string>(defaultColor);
	const [currentGradient, setCurrentGradient] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);
	const [mode, setMode] = useState<PickerMode>('linear');

	const hasGradients = Boolean(gradients && gradients.length > 0);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [offset(8), flip(), shift({ padding: 8 })],
		placement: 'bottom-start',
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

	useEffect(() => {
		const updateCurrentColorOrGradient = () => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				const nodes = selection.getNodes();
				const selectionStyle = selection.style;

				if (hasGradients && cssProperty === 'color') {
					const gradient = extractBackgroundGradient(
						nodes[0]?.getStyle() || selectionStyle || '',
						'',
					);
					if (gradient && isGradient(gradient)) {
						setCurrentGradient(gradient);
						return;
					}
				}

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
				editor.getEditorState().read(updateCurrentColorOrGradient);
				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		const unregisterUpdateListener = editor.registerUpdateListener(
			({ editorState }) => {
				editorState.read(updateCurrentColorOrGradient);
			},
		);

		return () => {
			unregisterCommand();
			unregisterUpdateListener();
		};
	}, [editor, defaultColor, cssProperty, hasGradients]);

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

	const changeGradient = useCallback(
		(gradient: string) => {
			if (!applyGradientFn) return;

			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					const nodes = selection.extract();
					applyGradientFn(nodes, gradient);
				}
			});
		},
		[editor, applyGradientFn],
	);

	const handleColorChange = useCallback(
		(color: ColorResult) => {
			const newColor = color.hex;
			setCurrentColor(newColor);
			changeColor(newColor);
		},
		[changeColor],
	);

	const handleGradientClick = useCallback(
		(gradient: string) => {
			setCurrentGradient(gradient);
			changeGradient(gradient);
		},
		[changeGradient],
	);

	const handleModeChange = useCallback((newMode: PickerMode) => {
		setMode(newMode);
	}, []);

	// Determine current display value for the indicator
	const currentDisplayValue = currentGradient || currentColor;

	return (
		<div className={styles.buttonWrapper}>
			<button
				type="button"
				ref={refs.setReference}
				className={styles.colorButton}
				aria-label={ariaLabel}
				{...getReferenceProps()}
			>
				{children}
				<span
					className={styles.colorIndicator}
					style={{ background: currentDisplayValue }}
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
						<div className={styles.pickerContainer}>
							{hasGradients && (
								<SegmentedControl ariaLabel="Color mode">
									<SegmentedControlItem
										onClick={() => handleModeChange('linear')}
										isActive={mode === 'linear'}
									>
										Linear
									</SegmentedControlItem>
									<SegmentedControlItem
										onClick={() => handleModeChange('gradient')}
										isActive={mode === 'gradient'}
									>
										Gradient
									</SegmentedControlItem>
								</SegmentedControl>
							)}

							{mode === 'linear' ? (
								<TwitterPicker
									color={currentColor}
									onChange={handleColorChange}
									colors={predefinedColors}
									triangle="hide"
								/>
							) : (
								<div className={styles.gradientGrid}>
									{gradients?.map((gradient) => (
										<button
											key={gradient}
											type="button"
											className={
												currentGradient === gradient
													? styles.gradientItemActive
													: styles.gradientItem
											}
											style={{ background: gradient }}
											onClick={() => handleGradientClick(gradient)}
											aria-label={`Apply gradient: ${gradient}`}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</FloatingPortal>
			)}
		</div>
	);
};
