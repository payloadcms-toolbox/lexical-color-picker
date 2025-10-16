"use client";

import "./index.css";

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client";

import { Button } from "./ui/Button";

export const ColorPickerFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: "colorPicker",
          label: "Pick the color",
          order: 1,
          Component: Button,
        },
      ]),
    ],
  },
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: "colorPicker",
          label: "Pick the color",
          order: 1,
          Component: Button,
        },
      ]),
    ],
  },
});
