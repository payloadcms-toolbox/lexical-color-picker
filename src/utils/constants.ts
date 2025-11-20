/**
 * Default predefined text colors available in the editor
 */
export const DEFAULT_TEXT_COLORS = [
	'#000000', // Black
	'#ffffff', // White
	'#ff0000', // Red
	'#00ff00', // Green
	'#0000ff', // Blue
	'#ffff00', // Yellow
	'#ff00ff', // Magenta
	'#00ffff', // Cyan
	'#808080', // Gray
	'#ffa500', // Orange
	'#800080', // Purple
	'#a52a2a', // Brown
];

/**
 * Default text color (black)
 */
export const DEFAULT_TEXT_COLOR = '#000000';

/**
 * Regex pattern to extract color from CSS style string
 * Uses word boundary to match only 'color' property, not 'background-color' or other properties
 */
export const TEXT_COLOR_REGEX = /(?:^|;)\s*color\s*:\s*([^;]+)/i;
