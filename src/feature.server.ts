import { createServerFeature } from '@payloadcms/richtext-lexical';

export const ColorPickerFeature = createServerFeature({
  key: 'colorPicker',
  feature: {
    ClientFeature:
      '@payloadcms-toolbox/lexical-color-picker/dist/feature.client#ColorPickerFeatureClient',
  },
});
