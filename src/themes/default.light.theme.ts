import { StyleSheet } from 'react-native';
import {
  Colors,
  ContextualColors,
  CoreComponentStyles,
  GeneralColors,
  HelperStyles,
  SpacerStyles,
  SpacerTypes,
  ThemeColors,
  ThemeType,
} from '../../types/theme.types.ts';
import { DEFAULT_FONT } from '@src/constants.ts';

const spacer = 12;
export const spacing: { [key: number]: number } = {
  0: 0,
  1: spacer * 0.25,
  2: spacer * 0.5,
  3: spacer,
  4: spacer * 1.5,
  5: spacer * 3,
};

const baseFontSize = 16;

const typography: { [key: number | string]: number } = {
  normal: baseFontSize,
  1: baseFontSize * 1.25,
  2: baseFontSize * 1.5,
  3: baseFontSize * 1.75,
  4: baseFontSize * 2,
  5: baseFontSize * 2.5,
  small: baseFontSize * 0.875,
};

const generalColors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  red: 'red',
  blue: 'blue',
  green: 'green',
  orange: 'orange',

  // Neutral
  neutral100: '#F1F1F1',
  neutral200: '#E0E0E0',
  neutral300: '#999999',
  neutral400: '#6E6E6E',
  neutral600: '#3F3F3F',
  neutral650: '#363636',
  neutral700: '#2F2F2F',
  neutral800: '#292929',
  neutral900: '#232323',
  neutral1000: '#1D1D1D',
} satisfies GeneralColors;

const themeColors: ThemeColors = {
  text: generalColors.black,
  background: generalColors.white,
};

const contextualColors: ContextualColors = {
  primary: generalColors.blue,
  secondary: generalColors.neutral400,
  success: generalColors.green,
  danger: generalColors.red,
  warning: generalColors.orange,
  info: generalColors.blue,
};

export const colors: Colors = {
  ...generalColors,
  ...themeColors,
  ...contextualColors,
};

const coreComponentStyles: CoreComponentStyles =
  StyleSheet.create<CoreComponentStyles>({
    Text: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography.normal,
    },
    Bg: {
      backgroundColor: colors.background,
    },
    H1: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography[5],
      fontWeight: '600',
    },
    H2: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography[4],
      fontWeight: '600',
    },
    H3: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography[3],
      fontWeight: '600',
    },
    H4: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography[2],
      fontWeight: '600',
    },
    H5: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography[1],
      fontWeight: '600',
    },
    H6: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: typography.normal,
      fontWeight: '600',
    },
    Link: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '400',
      textDecorationLine: 'underline',
    },
    TextInput: {
      fontFamily: DEFAULT_FONT,
      color: colors.text,
      fontSize: 16,
      lineHeight: 20,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: generalColors.neutral200,
      borderRadius: 15,
      paddingTop: 17,
      paddingBottom: 17,
      paddingHorizontal: spacing[4],
    },
    Button: {
      borderRadius: 30,
      height: 60,
      width: '100%',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    ButtonDefault: {
      borderWidth: 1,
      borderColor: colors.neutral200,
      backgroundColor: colors.white,
    },
    ButtonDefaultText: {
      color: colors.neutral400,
      fontWeight: '400',
      fontSize: 16,
    },
    ButtonPrimary: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    ButtonPrimaryText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 16,
    },
    Card: {
      backgroundColor: colors.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.neutral200,
    },
    CardDefault: {
      backgroundColor: colors.white,
      borderRadius: 12,
    },
    Label: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      marginRight: spacing[2],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      backgroundColor: colors.blue1000overlay,
      gap: 3,
      flexDirection: 'row',
    },
    LabelText: {
      fontSize: 12,
      color: colors.white,
      fontWeight: '500',
    },
    Tag: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      marginRight: spacing[2],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      backgroundColor: colors.white,
      gap: 3,
      flexDirection: 'row',
    },
    TagText: {
      fontSize: 14,
      color: colors.neutral900,
      fontWeight: '700',
    },
  });

const generateSpacerStyles = (): SpacerStyles => {
  const tags: { [key: string]: string } = { m: 'margin', p: 'padding' };
  const directions: { [key: string]: string } = {
    x: 'Horizontal',
    y: 'Vertical',
    l: 'Left',
    r: 'Right',
    t: 'Top',
    b: 'Bottom',
  };
  const spacerStyles: SpacerStyles = {} as SpacerStyles;

  // Generate styles for directional spacers (x,y,l,t,t,b)
  for (const tag in tags) {
    const tagName = tags[tag];
    for (const direction in directions) {
      const directionName = directions[direction];

      for (const spaceKey in spacing) {
        spacerStyles[`${tag}${direction}${spaceKey}` as SpacerTypes] = {
          [tagName + directionName]: spacing[spaceKey],
        };
      }
    }

    // Generate styles for base spacers (e.g., p0, p1, ..., m0, m1, ...)
    for (const spaceKey in spacing) {
      spacerStyles[`${tag}${spaceKey}` as SpacerTypes] = {
        [tagName]: spacing[spaceKey],
      };
    }
  }

  for (const spaceKey in spacing) {
    spacerStyles[`g${spaceKey}` as SpacerTypes] = { gap: spacing[spaceKey] };
  }

  return spacerStyles;
};

const helperStyles: HelperStyles = {
  background: {
    primary: {
      backgroundColor: contextualColors.primary,
    },
    white: {
      backgroundColor: generalColors.white,
    },
    neutral: {
      backgroundColor: colors.neutral400,
    },
  },
  text: {
    white: {
      color: generalColors.white,
    },
    black: {
      color: generalColors.black,
    },
    muted: {
      color: generalColors.neutral400,
    },
    primary: {
      color: contextualColors.primary,
    },
    danger: {
      color: contextualColors.danger,
    },
    warning: {
      color: contextualColors.warning,
    },
    success: {
      color: contextualColors.success,
    },
    strong: {
      fontWeight: '800',
    },
    underline: {
      textDecorationLine: 'underline',
    },
    center: {
      textAlign: 'center',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  col: {
    auto: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
    },
    grow: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
    },
  },
  ...generateSpacerStyles(),
};

export const styles = {
  ...coreComponentStyles,
  ...helperStyles,
};

export const Theme: ThemeType = {
  colors: colors,
  styles: styles,
};
