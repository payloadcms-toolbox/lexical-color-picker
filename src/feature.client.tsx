"use client";

import "./index.css";

import { BackgroundColorButton } from "./ui/BackgroundColor/Button";
import { TextColorButton } from "./ui/TextColor/Button";
import { createColorFeature } from "./utils/createColorFeature";

export const TextColorFeatureClient = createColorFeature({
	featureKey: "textColor",
	label: "Text color",
	ButtonComponent: TextColorButton,
});

export const BackgroundColorFeatureClient = createColorFeature({
	featureKey: "backgroundColor",
	label: "Background color",
	ButtonComponent: BackgroundColorButton,
});
