import { style } from "@vanilla-extract/css";

export const buttonWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	position: "relative",
});

export const colorButton = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	padding: "4px 8px",
	border: "1px solid #ccc",
	borderRadius: "4px",
	backgroundColor: "#fff",
	cursor: "pointer",
	transition: "all 0.2s ease",
	":hover": {
		backgroundColor: "#f5f5f5",
		borderColor: "#999",
	},
	":active": {
		backgroundColor: "#e8e8e8",
	},
});

export const colorIndicator = style({
	width: "18px",
	height: "18px",
	borderRadius: "2px",
	border: "2px solid #fff",
	boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
	flexShrink: 0,
});

export const popover = style({
	zIndex: 1000,
	filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
});

export const overlay = style({
	position: "fixed",
	inset: 0,
	zIndex: 999,
});
