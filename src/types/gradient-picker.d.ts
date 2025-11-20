declare module 'react-best-gradient-color-picker' {
	import { FC } from 'react';

	interface GradientPickerProps {
		gradient: string;
		onChange: (gradient: string) => void;
		presets?: string[];
		[key: string]: any;
	}

	const GradientPicker: FC<GradientPickerProps>;
	export default GradientPicker;
}
