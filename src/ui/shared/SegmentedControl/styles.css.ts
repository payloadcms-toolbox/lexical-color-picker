import { style } from '@vanilla-extract/css';

export const root = style({
	display: 'flex',
	gap: '2px',
	padding: '2px',
	backgroundColor: '#f3f4f6',
	borderRadius: '6px',
	marginBottom: '8px',

	'@media': {
		'(prefers-color-scheme: dark)': {
			backgroundColor: '#374151',
		},
	},

	selectors: {
		'html[data-theme="dark"] &': {
			backgroundColor: '#374151',
		},
	},
});

export const item = style({
	flex: 1,
	padding: '6px 12px',
	fontSize: '13px',
	fontWeight: 500,
	color: '#6b7280',
	backgroundColor: 'transparent',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
	transition: 'all 0.15s ease',
	outline: 'none',

	':hover': {
		color: '#374151',
		backgroundColor: '#e5e7eb',
	},

	':focus-visible': {
		boxShadow: '0 0 0 2px #3b82f6',
	},

	'@media': {
		'(prefers-color-scheme: dark)': {
			color: '#9ca3af',
			':hover': {
				color: '#d1d5db',
				backgroundColor: '#4b5563',
			},
		},
	},

	selectors: {
		'html[data-theme="dark"] &': {
			color: '#9ca3af',
		},
		'html[data-theme="dark"] &:hover': {
			color: '#d1d5db',
			backgroundColor: '#4b5563',
		},
	},
});

export const itemActive = style([
	item,
	{
		color: '#111827',
		backgroundColor: '#ffffff',
		boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

		':hover': {
			color: '#111827',
			backgroundColor: '#ffffff',
		},

		'@media': {
			'(prefers-color-scheme: dark)': {
				color: '#f9fafb',
				backgroundColor: '#1f2937',
				boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
				':hover': {
					color: '#f9fafb',
					backgroundColor: '#1f2937',
				},
			},
		},

		selectors: {
			'html[data-theme="dark"] &': {
				color: '#f9fafb',
				backgroundColor: '#1f2937',
				boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
			},
			'html[data-theme="dark"] &:hover': {
				color: '#f9fafb',
				backgroundColor: '#1f2937',
			},
		},
	},
]);
