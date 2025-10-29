"use client";

import "./index.css";

import {
	createClientFeature,
	toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client";
import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import type { TextColorClientFeatureProps } from "./types";
import { Button } from "./ui/Button";

export const TextColorFeatureClient =
	createClientFeature<TextColorClientFeatureProps>(({ props }) => {
		const { predefinedColors, defaultColor } = props;

		const ButtonWithProps = (buttonProps: {
			editor: LexicalEditor;
			anchorElem?: HTMLElement;
			active?: boolean;
			enabled?: boolean;
		}) => {
			return (
				<Button
					{...buttonProps}
					predefinedColors={predefinedColors}
					defaultColor={defaultColor}
				/>
			);
		};

		return {
			toolbarFixed: {
				groups: [
					toolbarFeatureButtonsGroupWithItems([
						{
							key: "textColor",
							label: "Text color",
							order: 1,
							Component: ButtonWithProps,
						},
					]),
				],
			},
			toolbarInline: {
				groups: [
					toolbarFeatureButtonsGroupWithItems([
						{
							key: "textColor",
							label: "Text color",
							order: 1,
							Component: ButtonWithProps,
						},
					]),
				],
			},
		};
	});
