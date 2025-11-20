import {
	$isTextNode,
	type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical';

/**
 * Regex to detect gradient values in CSS
 */
const GRADIENT_REGEX =
	/(linear-gradient|radial-gradient|conic-gradient)\([^)]+\)/i;

/**
 * Checks if a value is a gradient
 * @param value - CSS value to check
 * @returns True if value is a gradient
 */
export const isGradient = (value: string): boolean => {
	return GRADIENT_REGEX.test(value);
};

/**
 * Extracts background-image gradient from a CSS style string
 * @param style - CSS style string
 * @param defaultGradient - Default gradient to return if not found
 * @returns Gradient value or default gradient
 */
export const extractBackgroundGradient = (
	style: string,
	defaultGradient: string,
): string => {
	const match = style.match(/background-image:\s*([^;]+)/i);
	if (match) {
		const value = match[1].trim();
		return isGradient(value) ? value : defaultGradient;
	}
	return defaultGradient;
};

/**
 * Removes background-image property from a CSS style string
 * @param style - CSS style string
 * @returns Style string without background-image property
 */
export const removeBackgroundImageFromStyle = (style: string): string => {
	return style.replace(/background-image:\s*[^;]+;?\s*/gi, '').trim();
};

/**
 * Removes background-clip property from a CSS style string
 * @param style - CSS style string
 * @returns Style string without background-clip property
 */
export const removeBackgroundClipFromStyle = (style: string): string => {
	return style.replace(/background-clip:\s*[^;]+;?\s*/gi, '').trim();
};

/**
 * Removes -webkit-background-clip property from a CSS style string
 * @param style - CSS style string
 * @returns Style string without -webkit-background-clip property
 */
export const removeWebkitBackgroundClipFromStyle = (style: string): string => {
	return style.replace(/-webkit-background-clip:\s*[^;]+;?\s*/gi, '').trim();
};

/**
 * Removes -webkit-text-fill-color property from a CSS style string
 * @param style - CSS style string
 * @returns Style string without -webkit-text-fill-color property
 */
export const removeWebkitTextFillColorFromStyle = (style: string): string => {
	return style.replace(/-webkit-text-fill-color:\s*[^;]+;?\s*/gi, '').trim();
};

/**
 * Removes all gradient-related properties from style string
 * @param style - CSS style string
 * @returns Style string without gradient properties
 */
export const removeGradientPropertiesFromStyle = (style: string): string => {
	const result = style
		.replace(/background-image:\s*[^;]+;?\s*/gi, '')
		.replace(/background-clip:\s*[^;]+;?\s*/gi, '')
		.replace(/-webkit-background-clip:\s*[^;]+;?\s*/gi, '')
		.replace(/-webkit-text-fill-color:\s*[^;]+;?\s*/gi, '')
		.replace(/;\s*;/g, ';') // Clean up double semicolons
		.replace(/^\s*;\s*/, '') // Remove leading semicolon
		.replace(/\s*;\s*$/, '') // Remove trailing semicolon
		.trim();
	return result;
};

/**
 * Creates a new style string with text gradient
 * Also removes color property to prevent conflicts
 * @param currentStyle - Current CSS style string
 * @param gradient - Gradient to apply
 * @returns New style string with gradient properties for text
 */
export const createStyleWithTextGradient = (
	currentStyle: string,
	gradient: string,
): string => {
	let styleWithoutGradient = removeGradientPropertiesFromStyle(currentStyle);

	// Remove solid color property when applying gradient
	styleWithoutGradient = styleWithoutGradient
		.replace(/(?:^|;)\s*color\s*:\s*[^;]+;?\s*/gi, '')
		.trim();

	const gradientStyles = `background-image: ${gradient}; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent`;

	return styleWithoutGradient
		? `${styleWithoutGradient}; ${gradientStyles}`
		: gradientStyles;
};

/**
 * Creates a new style string with background gradient
 * Also removes background-color property to prevent conflicts
 * @param currentStyle - Current CSS style string
 * @param gradient - Gradient to apply
 * @returns New style string with background-image property
 */
export const createStyleWithBackgroundGradient = (
	currentStyle: string,
	gradient: string,
): string => {
	let styleWithoutGradient = removeBackgroundImageFromStyle(currentStyle);

	// Remove solid background-color property when applying gradient
	styleWithoutGradient = styleWithoutGradient
		.replace(/background-color:\s*[^;]+;?\s*/gi, '')
		.trim();

	return styleWithoutGradient
		? `${styleWithoutGradient}; background-image: ${gradient}`
		: `background-image: ${gradient}`;
};

/**
 * Applies text gradient to all text nodes in the array with toggle functionality
 * If the same gradient is already applied, it removes the gradient properties
 * @param nodes - Array of Lexical nodes
 * @param gradient - Gradient to apply or toggle off
 */
export const applyTextGradientToNodes = (
	nodes: LexicalNode[],
	gradient: string,
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const currentStyle = node.getStyle();
			const currentGradient = extractBackgroundGradient(currentStyle, '');

			// If the same gradient is already applied, remove gradient properties
			if (currentGradient.toLowerCase() === gradient.toLowerCase()) {
				const newStyle = removeGradientPropertiesFromStyle(currentStyle);
				node.setStyle(newStyle);
			} else {
				// Otherwise, apply the new gradient
				const newStyle = createStyleWithTextGradient(currentStyle, gradient);
				node.setStyle(newStyle);
			}
		}
	});
};

/**
 * Applies background gradient to all text nodes in the array with toggle functionality
 * If the same gradient is already applied, it removes the background-image property
 * @param nodes - Array of Lexical nodes
 * @param gradient - Gradient to apply or toggle off
 */
export const applyBackgroundGradientToNodes = (
	nodes: LexicalNode[],
	gradient: string,
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const currentStyle = node.getStyle();
			const currentGradient = extractBackgroundGradient(currentStyle, '');

			// If the same gradient is already applied, remove the background-image property
			if (currentGradient.toLowerCase() === gradient.toLowerCase()) {
				const newStyle = removeBackgroundImageFromStyle(currentStyle);
				node.setStyle(newStyle);
			} else {
				// Otherwise, apply the new gradient
				const newStyle = createStyleWithBackgroundGradient(
					currentStyle,
					gradient,
				);
				node.setStyle(newStyle);
			}
		}
	});
};
