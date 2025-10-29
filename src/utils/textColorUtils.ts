import {
	$isTextNode,
	type LexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

import { TEXT_COLOR_REGEX } from "./constants";

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
 * @param style - CSS style string
 * @returns Style string without color property
 */
export const removeTextColorFromStyle = (style: string): string => {
	return style.replace(/color:\s*[^;]+;?\s*/g, "").trim();
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
 * Gets the text color from the first text node in the array
 * @param nodes - Array of Lexical nodes
 * @param defaultColor - Default color to return if not found
 * @param selectionStyle - Optional selection style to check when no text nodes found
 * @returns Color value or default color
 */
export const getFirstTextNodeColor = (
	nodes: LexicalNode[],
	defaultColor: string,
	selectionStyle?: string,
): string => {
	for (const node of nodes) {
		if ($isTextNode(node)) {
			return extractTextColor(node.getStyle(), defaultColor);
		}
	}

	if (selectionStyle) {
		return extractTextColor(selectionStyle, defaultColor);
	}

	return defaultColor;
};

/**
 * Applies text color to all text nodes in the array
 * @param nodes - Array of Lexical nodes
 * @param color - Color to apply
 */
export const applyTextColorToNodes = (
	nodes: LexicalNode[],
	color: string,
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const newStyle = createStyleWithTextColor(node.getStyle(), color);
			node.setStyle(newStyle);
		}
	});
};
