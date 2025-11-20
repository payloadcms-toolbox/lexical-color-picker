import {
	$isTextNode,
	type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical';

import { TEXT_COLOR_REGEX } from './constants';

const BACKGROUND_COLOR_REGEX = /background-color:\s*([^;]+)/i;

/**
 * Extracts color value from a CSS style string
 * @param style - CSS style string
 * @param defaultColor - Default color to return if not found
 * @returns Color value or default color
 */
export const extractTextColor = (
	style: string,
	defaultColor: string,
): string => {
	const match = style.match(TEXT_COLOR_REGEX);
	return match ? match[1].trim() : defaultColor;
};

/**
 * Removes color property from a CSS style string
 * Uses word boundary to remove only 'color' property, not 'background-color' or other properties
 * @param style - CSS style string
 * @returns Style string without color property
 */
export const removeTextColorFromStyle = (style: string): string => {
	return style.replace(/(?:^|;)\s*color\s*:\s*[^;]+;?\s*/gi, '').trim();
};

/**
 * Creates a new style string with the specified text color
 * @param currentStyle - Current CSS style string
 * @param color - Color to apply
 * @returns New style string with color property
 */
export const createStyleWithTextColor = (
	currentStyle: string,
	color: string,
): string => {
	const styleWithoutColor = removeTextColorFromStyle(currentStyle);

	return styleWithoutColor
		? `${styleWithoutColor}; color: ${color}`
		: `color: ${color}`;
};

/**
 * Extracts color value for a specific CSS property from style string
 * @param style - CSS style string
 * @param property - CSS property name ('color' or 'background-color')
 * @param defaultColor - Default color to return if not found
 * @returns Color value or default color
 */
export const extractColorByProperty = (
	style: string,
	property: string,
	defaultColor: string,
): string => {
	if (property === 'color') {
		return extractTextColor(style, defaultColor);
	} else if (property === 'background-color') {
		return extractBackgroundColor(style, defaultColor);
	}
	return defaultColor;
};

/**
 * Gets the color from the first text node in the array for a specific CSS property
 * @param nodes - Array of Lexical nodes
 * @param cssProperty - CSS property name ('color' or 'background-color')
 * @param defaultColor - Default color to return if not found
 * @param selectionStyle - Optional selection style to check when no text nodes found
 * @returns Color value or default color
 */
export const getFirstTextNodeColor = (
	nodes: LexicalNode[],
	cssProperty: string,
	defaultColor: string,
	selectionStyle?: string,
): string => {
	for (const node of nodes) {
		if ($isTextNode(node)) {
			return extractColorByProperty(node.getStyle(), cssProperty, defaultColor);
		}
	}

	if (selectionStyle) {
		return extractColorByProperty(selectionStyle, cssProperty, defaultColor);
	}

	return defaultColor;
};

/**
 * Extracts background-color value from a CSS style string
 * @param style - CSS style string
 * @param defaultColor - Default color to return if not found
 * @returns Background color value or default color
 */
export const extractBackgroundColor = (
	style: string,
	defaultColor: string,
): string => {
	const match = style.match(BACKGROUND_COLOR_REGEX);
	return match ? match[1].trim() : defaultColor;
};

/**
 * Removes background-color property from a CSS style string
 * @param style - CSS style string
 * @returns Style string without background-color property
 */
export const removeBackgroundColorFromStyle = (style: string): string => {
	return style.replace(/background-color:\s*[^;]+;?\s*/g, '').trim();
};

/**
 * Creates a new style string with the specified background color
 * @param currentStyle - Current CSS style string
 * @param color - Background color to apply
 * @returns New style string with background-color property
 */
export const createStyleWithBackgroundColor = (
	currentStyle: string,
	color: string,
): string => {
	const styleWithoutBgColor = removeBackgroundColorFromStyle(currentStyle);

	return styleWithoutBgColor
		? `${styleWithoutBgColor}; background-color: ${color}`
		: `background-color: ${color}`;
};

/**
 * Applies text color to all text nodes in the array with toggle functionality
 * If the same color is already applied, it removes the color property
 * @param nodes - Array of Lexical nodes
 * @param color - Color to apply or toggle off
 */
export const applyTextColorToNodes = (
	nodes: LexicalNode[],
	color: string,
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const currentStyle = node.getStyle();
			const currentColor = extractTextColor(currentStyle, '');

			// If the same color is already applied, remove the color property
			if (currentColor.toLowerCase() === color.toLowerCase()) {
				const newStyle = removeTextColorFromStyle(currentStyle);
				node.setStyle(newStyle);
			} else {
				// Otherwise, apply the new color
				const newStyle = createStyleWithTextColor(currentStyle, color);
				node.setStyle(newStyle);
			}
		}
	});
};

/**
 * Applies background color to all text nodes in the array with toggle functionality
 * If the same color is already applied, it removes the background-color property
 * @param nodes - Array of Lexical nodes
 * @param color - Background color to apply or toggle off
 */
export const applyBackgroundColorToNodes = (
	nodes: LexicalNode[],
	color: string,
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const currentStyle = node.getStyle();
			const currentColor = extractBackgroundColor(currentStyle, '');

			// If the same color is already applied, remove the background-color property
			if (currentColor.toLowerCase() === color.toLowerCase()) {
				const newStyle = removeBackgroundColorFromStyle(currentStyle);
				node.setStyle(newStyle);
			} else {
				// Otherwise, apply the new color
				const newStyle = createStyleWithBackgroundColor(currentStyle, color);
				node.setStyle(newStyle);
			}
		}
	});
};
