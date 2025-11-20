import { globalStyle, style } from '@vanilla-extract/css';

export const buttonWrapper = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	position: 'relative',
});

export const colorButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '8px',
	border: 'none',
	borderRadius: '4px',
	backgroundColor: 'transparent',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	':hover': {
		backgroundColor: '#f5f5f5',
		borderColor: '#999',
	},
	':active': {
		backgroundColor: '#e8e8e8',
	},
	'@media': {
		'(prefers-color-scheme: dark)': {
			backgroundColor: 'rgb(30, 30, 30)',
			border: '1px solid rgb(68, 68, 68)',
			':hover': {
				backgroundColor: 'rgb(45, 45, 45)',
				borderColor: 'rgb(102, 102, 102)',
			},
			':active': {
				backgroundColor: 'rgb(55, 55, 55)',
			},
		},
	},
});

globalStyle(`html[data-theme="dark"] .${colorButton}`, {
	color: 'rgb(181, 181, 181)',
});

globalStyle(`html[data-theme="dark"] .${colorButton}:hover`, {
	backgroundColor: 'rgb(45, 45, 45)',
	borderColor: 'rgb(102, 102, 102)',
});

globalStyle(`html[data-theme="dark"] .${colorButton}:active`, {
	backgroundColor: 'rgb(55, 55, 55)',
});

export const colorIndicator = style({
	width: '16px',
	height: '16px',
	borderRadius: '2px',
	border: '2px solid #fff',
	boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
	flexShrink: 0,
	'@media': {
		'(prefers-color-scheme: dark)': {
			border: '2px solid rgb(20, 20, 20)',
			boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2)',
		},
	},
});

globalStyle(`html[data-theme="dark"] .${colorIndicator}`, {
	border: '1px solid rgb(20, 20, 20)',
	boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2)',
});

export const popover = style({
	zIndex: 1000,
	filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
	'@media': {
		'(prefers-color-scheme: dark)': {
			filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
		},
	},
});

globalStyle(`.twitter-picker`, {
	boxShadow: 'none !important',
});

globalStyle(`html[data-theme="dark"] .twitter-picker`, {
	border: '1px solid #3c3c3c',
	backgroundColor: '#222222 !important',
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 999,
});

export const pickerContainer = style({
	padding: '12px',
	backgroundColor: '#fff',
	borderRadius: '4px',
	boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
	minWidth: '276px',

	'@media': {
		'(prefers-color-scheme: dark)': {
			backgroundColor: '#222222',
			border: '1px solid #3c3c3c',
			boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
		},
	},

	selectors: {
		'html[data-theme="dark"] &': {
			backgroundColor: '#222222',
			border: '1px solid #3c3c3c',
			boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
		},
	},
});

export const gradientGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(6, 30px)',
	gap: '8px',
	padding: '4px',
});

export const gradientItem = style({
	width: '100%',
	aspectRatio: '1',
	border: '2px solid transparent',
	borderRadius: '4px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	padding: 0,
	outline: 'none',

	':hover': {
		transform: 'scale(1.1)',
		borderColor: '#3b82f6',
	},

	':focus-visible': {
		boxShadow: '0 0 0 2px #3b82f6',
	},
});

export const gradientItemActive = style([
	gradientItem,
	{
		borderColor: '#3b82f6',
		boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
	},
]);
