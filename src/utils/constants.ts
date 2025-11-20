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

/**
 * Default predefined gradients available in the editor
 */
export const DEFAULT_GRADIENTS = [
	'linear-gradient(90deg, #ff0000, #ff7f00)', // Red to Orange
	'linear-gradient(90deg, #ff7f00, #ffff00)', // Orange to Yellow
	'linear-gradient(90deg, #00ff00, #00ffff)', // Green to Cyan
	'linear-gradient(90deg, #0000ff, #8b00ff)', // Blue to Purple
	'linear-gradient(90deg, #ff00ff, #ff0080)', // Magenta to Pink
	'linear-gradient(90deg, #000000, #808080)', // Black to Gray
	'linear-gradient(90deg, #ff0000, #0000ff)', // Red to Blue
	'linear-gradient(90deg, #ffd700, #ff69b4)', // Gold to Hot Pink
	'linear-gradient(90deg, #00ffff, #ff00ff)', // Cyan to Magenta
	'linear-gradient(90deg, #32cd32, #1e90ff)', // Lime to Dodger Blue
	'linear-gradient(90deg, #ff4500, #ff1493)', // Orange Red to Deep Pink
	'linear-gradient(90deg, #4169e1, #00ced1)', // Royal Blue to Dark Turquoise
];
