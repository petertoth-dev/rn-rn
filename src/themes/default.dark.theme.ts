import { Theme as LightTheme } from '@src/themes/default.light.theme.ts';
import { DEFAULT_FONT } from '@src/constants.ts';

const colors = {
  ...LightTheme.colors,
  text: LightTheme.colors.white,
  background: LightTheme.colors.neutral1200,
};

export const Theme = {
  ...LightTheme,
  colors: colors,
  styles: {
    ...LightTheme.styles,
    Text: {
      ...LightTheme.styles.Text,
      color:colors.text,
    },
    Bg: {
      ...LightTheme.styles.Bg,
      backgroundColor: colors.background,
    },
    H1: {
      ...LightTheme.styles.H1,
      color:colors.text,
    },
    H2: {
      ...LightTheme.styles.H2,
      color:colors.text,
    },
    H3: {
      ...LightTheme.styles.H3,
      color:colors.text,
    },
    H4: {
      ...LightTheme.styles.H4,
      color:colors.text,
    },
    H5: {
      ...LightTheme.styles.H5,
      color:colors.text,
    },
    H6: {
      ...LightTheme.styles.H6,
      color:colors.text,
    },
    Lead: {
      ...LightTheme.styles.Lead,
      color:colors.text,
    },
    Code: {
      ...LightTheme.styles.Code,
      backgroundColor: colors.neutral1100,
      color: '#a5a49f',
    },
    Card: {
      ...LightTheme.styles.Card,
      borderColor: colors.neutral900,
      backgroundColor: colors.neutral1100,
      color: '#a5a49f',
    },
  },
};
