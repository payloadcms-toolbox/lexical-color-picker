import type { PropsWithChildren } from 'react';
import * as styles from './styles.css';

type SegmentedControlProps = {
	ariaLabel?: string;
};

type SegmentedControlItemProps = {
	onClick: () => void;
	isActive: boolean;
};

export const SegmentedControl = ({
	ariaLabel,
	children,
}: PropsWithChildren<SegmentedControlProps>) => {
	return (
		<div className={styles.root} role="tablist" aria-label={ariaLabel}>
			{children}
		</div>
	);
};

export const SegmentedControlItem = ({
	onClick,
	isActive,
	children,
}: PropsWithChildren<SegmentedControlItemProps>) => (
	<button
		type="button"
		role="tab"
		aria-selected={isActive}
		className={isActive ? styles.itemActive : styles.item}
		onClick={onClick}
	>
		{children}
	</button>
);
