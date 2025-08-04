import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type GeneralColors = Record<string, string>

export type ThemeColors = {
    text: string;
    background: string;
}

type SpacerSize = 0 | 1 | 2 | 3 | 4 | 5;
type SpacerDirection = 't' | 'b' | 'l' | 'r' | 'x' | 'y';
type MarginTypes = `m${SpacerDirection}${SpacerSize}` | `m${SpacerSize}`;
type PaddingTypes =  `p${SpacerDirection}${SpacerSize}` | `p${SpacerSize}`;
type GapTypes =  `g${SpacerSize}`;
type HeadingTypes =  'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export type SpacerTypes = MarginTypes | PaddingTypes | HeadingTypes | GapTypes;
export type SpacerStyles = { [key in SpacerTypes] : any};


export type ContextualClasses = 'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'warning' | 'info';
export type ContextualColors = Record<ContextualClasses, string>;

export type ThemeType = { colors: Colors, styles: HelperStyles & CoreComponentStyles, spacing: { [key: number]: number } };
export type Colors = GeneralColors & ThemeColors & ContextualColors;
export type StyleTypes = ViewStyle & TextStyle & ImageStyle;

export type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ColStyles = {
  auto: StyleTypes;
  grow: StyleTypes;
} & {
  [key in `col${ColumnSize}`]: StyleTypes;
};

export type HelperStyles = {
  background: any; text: any ;
  row: any;
  col: ColStyles;
  justifyContent: {start: StyleTypes; center: StyleTypes; spaceBetween: StyleTypes; spaceAround: StyleTypes; spaceEvenly: StyleTypes; }
  alignItems: {start: StyleTypes; end: StyleTypes; center: StyleTypes; stretch: StyleTypes, baseline: StyleTypes }
  container: {flex: StyleTypes; center: StyleTypes }
} & SpacerStyles;


export type CoreComponents = 'Text' | 'Bg' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'Lead' | 'Link' | 'TextInput' | 'Button' | 'ButtonDefault' | 'ButtonDefaultText' | 'ButtonPrimary' | 'ButtonPrimaryText' | 'Card' | 'CardText' | 'CardDefault' | 'Label' | 'LabelText' | 'Tag' | 'TagText' | 'Code';
export type CoreComponentStyles = Record<CoreComponents, StyleTypes>;
export type ColorSchemes = 'light' | 'dark';
export type ColorSchemeSettings = 'light' | 'dark' | 'system';




