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

globalStyle(`html[data-theme="dark"] .twitter-picker`, {
	border: '1px solid #3c3c3c',
	backgroundColor: '#222222 !important',
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 999,
});
