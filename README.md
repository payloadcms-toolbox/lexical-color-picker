# lexical-color-picker

[![npm version](https://badge.fury.io/js/@payloadcms-toolbox%2Flexical-color-picker.svg)](https://badge.fury.io/js/@payloadcms-toolbox%2Flexical-color-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@payloadcms-toolbox/lexical-color-picker.svg)](https://www.npmjs.com/package/@payloadcms-toolbox/lexical-color-picker)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful, type-safe text color picker feature for [Lexical](https://lexical.dev/) editors in [Payload CMS](https://payloadcms.com/). Provides an intuitive toolbar control for selecting and applying text colors with full HTML/CSS conversion support.

## Table of Contents

- [The Problem](#the-problem)
- [This Solution](#this-solution)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Global Configuration](#global-configuration)
  - [Per-Field Configuration](#per-field-configuration)
- [Configuration Options](#configuration-options)
- [API Reference](#api-reference)
- [Customization](#customization)
- [TypeScript](#typescript)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [License](#license)

## The Problem

This plugin was created because the built-in Lexical features in Payload CMS don't provide a ready-made solution for text color management. There were no simple, intuitive tools available with familiar UX/UI for applying colors to text content. This gap led to the creation of this plugin to provide an easy-to-use color picker feature for content editors.

## This Solution

`lexical-color-picker` provides a **production-ready, plug-and-play solution** that:

✅ Integrates seamlessly with Payload CMS's Lexical editor
✅ Adds a color picker button to the toolbar
✅ Supports predefined color palettes for brand consistency
✅ Includes a visual color indicator showing the current text color
✅ Handles HTML/Markdown conversion automatically
✅ Fully typed with TypeScript
✅ Works with Lexical's undo/redo system

## Features

- 🎨 **Visual Color Picker**: Intuitive color picker in the Lexical toolbar
- 🔧 **Fully Customizable**: Define your own predefined color palettes
- 👁️ **Visual Feedback**: Color indicator shows current text color
- 🔒 **Type-Safe**: Full TypeScript definitions included
- ♿ **Accessible**: ARIA-compliant UI components

## Requirements

- **@payloadcms/richtext-lexical**: `^3.0.0`
- **React**: `>= 19.2.0`
- **Node.js**: `>= 18.0.0` (recommended)

## Installation

```bash
npm install @payloadcms-toolbox/lexical-color-picker

or

yarn add @payloadcms-toolbox/lexical-color-picker

or

pnpm add @payloadcms-toolbox/lexical-color-picker
```

### Peer Dependencies

This package has the following peer dependencies (usually already installed with Payload CMS):

```json
{
  "@payloadcms/richtext-lexical": "^3",
  "react": ">=19.2.0"
}
```

## Usage

### Global Configuration

Configure the text color feature globally for **all** rich text fields in your `payload.config.ts`:

```ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@payloadcms-toolbox/lexical-color-picker'
import { buildConfig } from 'payload'

import '@payloadcms-toolbox/lexical-color-picker/style.css'

export default buildConfig({
  // ... other config
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      TextColorFeature({
        predefinedColors: [
          '#000000', // Black
          '#ffffff', // White
          '#ff0000', // Red
          '#00ff00', // Green
          '#0000ff', // Blue
          '#ffff00', // Yellow
        ],
        defaultColor: '#000000'
      })
    ]
  }),
  // ... rest of config
})
```

### Per-Field Configuration

Add the text color feature to **specific** rich text fields:

```ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@payloadcms-toolbox/lexical-color-picker'

import '@payloadcms-toolbox/lexical-color-picker/style.css'

export const Pages = {
  slug: 'pages',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          TextColorFeature({
            predefinedColors: [
              '#000000', // Black
              '#ffffff', // White
              '#ff0000', // Red
              '#00ff00', // Green
              '#0000ff', // Blue
            ],
            defaultColor: '#000000'
          })
        ]
      })
    }
  ]
}
```

## Configuration Options

The `TextColorFeature` function accepts a configuration object with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `predefinedColors` | `string[]` | `['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#808080', '#ffa500', '#800080', '#a52a2a']` | Array of predefined colors for quick selection. Must be valid CSS color values (hex, rgb, rgba, named colors). |
| `defaultColor` | `string` | `'#000000'` | Default text color to apply. Must be a valid CSS color value. |

## API Reference

### `TextColorFeature(options?)`

Creates a text color picker feature for the Lexical editor.

**Parameters:**
- `options` (optional): Configuration object

**Returns:** Lexical feature that can be passed to the `features` array

**Example:**
```ts
// Default configuration (no parameters needed)
TextColorFeature()

// Custom brand colors
TextColorFeature({
  predefinedColors: [
    '#1a1a1a', // Brand Dark
    '#ffffff', // White
    '#3b82f6', // Brand Blue
    '#10b981', // Brand Green
    '#ef4444', // Brand Red
    '#f59e0b', // Brand Orange
  ],
  defaultColor: '#1a1a1a'
})

// Using RGB/RGBA values
TextColorFeature({
  predefinedColors: [
    'rgb(0, 0, 0)',
    'rgb(255, 255, 255)',
    'rgba(59, 130, 246, 0.8)',
  ],
  defaultColor: 'rgb(0, 0, 0)'
})

// Using named colors
TextColorFeature({
  predefinedColors: [
    'black',
    'white',
    'red',
    'blue',
    'green',
  ],
  defaultColor: 'black'
})
```

## Customization

### Brand Color Palette

Define your brand's color palette for consistent styling across your content:

```ts
TextColorFeature({
  predefinedColors: [
    '#1e293b', // Primary Dark
    '#0f172a', // Secondary Dark
    '#3b82f6', // Primary Blue
    '#60a5fa', // Light Blue
    '#10b981', // Success Green
    '#f59e0b', // Warning Orange
    '#ef4444', // Error Red
    '#8b5cf6', // Purple Accent
  ],
  defaultColor: '#1e293b'
})
```

### Grayscale Palette

Create a grayscale palette for minimal designs:

```ts
TextColorFeature({
  predefinedColors: [
    '#000000', // Black
    '#1a1a1a', // Near Black
    '#333333', // Dark Gray
    '#666666', // Medium Gray
    '#999999', // Light Gray
    '#cccccc', // Very Light Gray
    '#f5f5f5', // Almost White
    '#ffffff', // White
  ],
  defaultColor: '#333333'
})
```

### Extended Color Range

Provide a comprehensive color selection:

```ts
TextColorFeature({
  predefinedColors: [
    '#000000', '#1a1a1a', '#333333', '#666666', // Grays
    '#ff0000', '#ff6b6b', '#ffa500', '#ffd700', // Warm
    '#00ff00', '#90ee90', '#00ced1', '#00bfff', // Cool
    '#0000ff', '#6a5acd', '#ff00ff', '#ff1493', // Blues & Pinks
  ],
  defaultColor: '#000000'
})
```

### Color Formats

The plugin supports all valid CSS color formats:

```ts
// Hex colors (3-digit, 6-digit, 8-digit with alpha)
'#fff', '#ffffff', '#ffffffff'

// RGB/RGBA
'rgb(255, 255, 255)', 'rgba(255, 255, 255, 0.5)'

// HSL/HSLA
'hsl(0, 0%, 100%)', 'hsla(0, 0%, 100%, 0.5)'

// Named colors
'white', 'black', 'red', 'blue', 'transparent'
```

## TypeScript

This package is written in TypeScript and provides full type definitions.

### Type-Safe Configuration

```ts
import { TextColorFeature } from '@payloadcms-toolbox/lexical-color-picker'
import type { TextColorFeatureProps } from '@payloadcms-toolbox/lexical-color-picker'

// Type-safe configuration
const colorConfig: TextColorFeatureProps = {
  predefinedColors: ['#000000', '#ffffff', '#ff0000'],
  defaultColor: '#000000'
}

TextColorFeature(colorConfig)
```

### Available Types

```ts
export interface TextColorFeatureProps {
  predefinedColors?: string[]
  defaultColor?: string
}
```

## Troubleshooting

### Feature not appearing in toolbar

**Problem:** The color picker button doesn't show up in the editor toolbar.

**Solution:**
1. Ensure you're using Payload CMS >= 3.0.0
2. Check that the feature is added to the `features` array
3. Verify that `@payloadcms/richtext-lexical` is installed
4. Clear your build cache: `rm -rf .next` or `rm -rf dist`
5. Restart your development server

### Colors not applying correctly

**Problem:** Selecting a color doesn't change the text appearance.

**Solution:**
1. Check your CSS for conflicting `color` rules with `!important`
2. Use browser DevTools to inspect the applied inline styles
3. Ensure your `predefinedColors` values are valid CSS colors
4. Check console for any JavaScript errors
5. Verify that text is selected when clicking the color picker

### TypeScript errors

**Problem:** Type errors when using the feature.

**Solution:**
```bash
# Ensure types are properly installed
npm install --save-dev @types/react

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Build errors with Next.js

**Problem:** "Module not found" or SSR errors.

**Solution:**
```js
// next.config.js
module.exports = {
  transpilePackages: ['@payloadcms-toolbox/lexical-color-picker']
}
```

### Color picker not closing

**Problem:** The color picker popover doesn't close when clicking outside.

**Solution:**
This should work automatically. If not:
1. Check for any conflicting click handlers in your app
2. Ensure you're using the latest version of the package
3. Check browser console for errors

### Styled incorrectly / Missing styles

**Problem:** The color picker appears unstyled or has broken layout.

**Solution:**
Make sure to import the CSS file if needed:
```ts
import '@payloadcms-toolbox/lexical-color-picker/style.css'
```

## FAQ

### Can I use this with Lexical outside of Payload CMS?

Currently, this package is specifically designed for Payload CMS's Lexical integration. For standalone Lexical, you would need to adapt the feature implementation.

### Can I use hex, rgb, rgba, hsl, or named colors?

Yes! The `predefinedColors` array accepts any valid CSS color value:

```ts
TextColorFeature({
  predefinedColors: [
    '#ff0000',                    // Hex
    'rgb(255, 0, 0)',            // RGB
    'rgba(255, 0, 0, 0.5)',      // RGBA with transparency
    'hsl(0, 100%, 50%)',         // HSL
    'red',                        // Named color
  ]
})
```

### How do I limit colors to match my brand guidelines?

Simply provide only your brand colors in the `predefinedColors` array:

```ts
TextColorFeature({
  predefinedColors: [
    '#1a73e8', // Brand Primary
    '#34a853', // Brand Success
    '#fbbc04', // Brand Warning
    '#ea4335', // Brand Danger
  ],
  defaultColor: '#1a73e8'
})
```

### Does the color picker work in both fixed and inline toolbars?

Yes! The color picker automatically appears in both the fixed toolbar (top of editor) and inline toolbar (appears on text selection).

### Can users enter custom colors not in the predefined list?

Currently, users can only select from the predefined colors. This is by design to maintain brand consistency. If you need custom color input, you can provide a wider range of predefined colors.

### Does this work with dark mode?

Yes, the feature respects Payload CMS's theme settings automatically. The color picker popover adapts to your theme.

### How is the color stored in the database?

Colors are stored as inline CSS styles in the HTML content:
```html
<span style="color: #ff0000;">Colored text</span>
```

### Can I have different color palettes for different fields?

Yes! Use per-field configuration to define different color palettes:

```ts
{
  name: 'heroContent',
  type: 'richText',
  editor: lexicalEditor({
    features: [
      TextColorFeature({
        predefinedColors: ['#1a73e8', '#ffffff'], // Hero colors
      })
    ]
  })
},
{
  name: 'bodyContent',
  type: 'richText',
  editor: lexicalEditor({
    features: [
      TextColorFeature({
        predefinedColors: ['#333333', '#666666'], // Body colors
      })
    ]
  })
}
```

### Does this affect text already saved in the database?

No, this feature only affects new text color selections. Existing colored text will maintain its current color values.

## License

MIT © 2025 Evgenii Troinov

See [LICENSE](./LICENSE) file for details.

---

Made with ❤️ for the [Payload CMS](https://payloadcms.com/) community
