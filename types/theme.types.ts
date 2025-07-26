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


export type ContextualClasses = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ContextualColors = Record<ContextualClasses, string>;

export type ThemeType = { colors: Colors, styles: HelperStyles & CoreComponentStyles };
export type Colors = GeneralColors & ThemeColors & ContextualColors;
export type HelperStyles = { background: any; text: any ; row: any; spaceBetween: any; col: {auto: any; grow: any}} & SpacerStyles;
export type StyleTypes = ViewStyle & TextStyle & ImageStyle;


export type CoreComponents = 'Text' | 'Bg' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'Link' | 'TextInput' | 'Button' | 'ButtonDefault' | 'ButtonDefaultText' | 'ButtonPrimary' | 'ButtonPrimaryText' | 'Card' | 'CardDefault' | 'Label' | 'LabelText' | 'Tag' | 'TagText';
export type CoreComponentStyles = Record<CoreComponents, StyleTypes>;
export type ColorSchemes = 'light' | 'dark';
export type ColorSchemeSettings = 'light' | 'dark' | 'system';




