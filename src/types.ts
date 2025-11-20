/**
 * Props for configuring the TextColor feature on the server side
 */
export interface ColorFeatureProps {
	/**
	 * Array of predefined colors for quick selection
	 * Must be valid CSS color values (hex, rgb, rgba, named colors)
	 * @default ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
	 */
	predefinedColors?: string[];

	/**
	 * Default text color to apply
	 * Must be a valid CSS color value
	 * @default '#000000'
	 */
	defaultColor?: string;

	/**
	 * Array of predefined gradients for quick selection
	 * Must be valid CSS gradient values (linear-gradient, radial-gradient, conic-gradient)
	 * @default undefined (gradients disabled)
	 */
	gradients?: string[];
}

/**
 * Props passed to the client feature (validated and with defaults applied)
 */
export interface ColorClientFeatureProps {
	/**
	 * Array of predefined colors for quick selection
	 */
	predefinedColors: string[];

	/**
	 * Default text color to apply
	 */
	defaultColor: string;

	/**
	 * Array of predefined gradients for quick selection
	 */
	gradients?: string[];
}
