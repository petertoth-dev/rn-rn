import { Theme as LightTheme } from '@src/themes/default.light.theme.ts';

const colors = {
  ...LightTheme.colors,
  text: LightTheme.colors.white,
  background: LightTheme.colors.neutral900,
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
  },
};
