# Theming System Documentation

The RN-RN theming system provides a comprehensive solution for styling your React Native application with support for light and dark modes. This document explains the architecture, features, and usage of the theming system.

## Table of Contents

- [Architecture](#architecture)
- [Theme Structure](#theme-structure)
- [Using Themes](#using-themes)
- [Color System](#color-system)
- [Typography](#typography)
- [Grid System](#grid-system)
- [Spacing Utilities](#spacing-utilities)
- [Component Styles](#component-styles)
- [Creating Custom Themes](#creating-custom-themes)

## Architecture

The theming system consists of several key components:

- **Theme Context**: Provides theme data to all components via React Context
- **Theme Provider**: Manages theme state and switching between themes
- **Theme Files**: Define the actual styles, colors, and spacing for each theme variant
- **Theme Types**: TypeScript types that ensure consistency across themes

### Key Files

- `theme.context.tsx`: Provides the context, provider, and hooks for accessing themes
- `themes.ts`: Registry of available themes for dynamic loading
- `default.light.theme.ts`: Light theme implementation
- `default.dark.theme.ts`: Dark theme implementation

## Theme Structure

Each theme consists of three main parts:

1. **Colors**: All color values used throughout the application
2. **Styles**: Component and utility styles built with the theme's colors
3. **Spacing**: Consistent spacing values for margins, padding, and layout

### Theme Type Definition

```typescript
export type ThemeType = { 
  colors: Colors, 
  styles: HelperStyles & CoreComponentStyles, 
  spacing: { [key: number]: number } 
};
```

## Using Themes

### Within React Components

Use the `useTheme` hook to access the current theme:

```jsx
import { useTheme } from '@src/themes/theme.context';

function MyComponent() {
  const { Theme } = useTheme();
  
  return (
    <View style={[Theme.styles.Bg]}>
      <Text style={[Theme.styles.Text]}>Hello World</Text>
    </View>
  );
}
```

### Outside of React Components

Use the global `Theme` function:

```jsx
import { Theme } from '@src/themes/theme.context';

const backgroundColor = Theme().colors.background;
```

### Changing Themes

The theme can be changed using the `setTheme` function from the theme context:

```jsx
const { setTheme } = useTheme();

// Change to a different theme
setTheme('cyberpunk');
```

### Accessing the Current Color Scheme

```jsx
const colorScheme = useStore((state) => state.app.system.colorScheme);
// Returns 'light' or 'dark'
```

## Color System

The color system is organized into three categories:

1. **General Colors**: Base colors like black, white, and neutral shades
2. **Theme Colors**: Theme-specific colors like text and background
3. **Contextual Colors**: Semantic colors like primary, secondary, success, etc.

### Available Colors

```typescript
// General Colors
Theme.colors.black
Theme.colors.white
Theme.colors.neutral50 - Theme.colors.neutral1200 // Neutral shades

// Theme Colors
Theme.colors.text       // Automatically adapts to light/dark mode
Theme.colors.background // Automatically adapts to light/dark mode

// Contextual Colors
Theme.colors.primary
Theme.colors.secondary
Theme.colors.accent
Theme.colors.success
Theme.colors.danger
Theme.colors.warning
Theme.colors.info
```

### Color Helpers

```jsx
// Background color helpers
<View style={Theme.styles.background.primary}>
  <Text>Primary background</Text>
</View>

// Text color helpers
<Text style={Theme.styles.text.primary}>Primary text</Text>
<Text style={Theme.styles.text.muted}>Muted text</Text>
```

## Typography

The typography system provides consistent text styling across your application.

### Headings

```jsx
<Text style={Theme.styles.H1}>Heading 1</Text>
<Text style={Theme.styles.H2}>Heading 2</Text>
<Text style={Theme.styles.H3}>Heading 3</Text>
<Text style={Theme.styles.H4}>Heading 4</Text>
<Text style={Theme.styles.H5}>Heading 5</Text>
<Text style={Theme.styles.H6}>Heading 6</Text>
```

### Text Styles

```jsx
<Text style={Theme.styles.Text}>Regular text</Text>
<Text style={Theme.styles.Lead}>Lead paragraph</Text>
<Text style={Theme.styles.Link}>Link text</Text>
<Text style={Theme.styles.Code}>Code snippet</Text>
```

### Text Modifiers

```jsx
<Text style={[Theme.styles.Text, Theme.styles.text.center]}>Centered text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.strong]}>Bold text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.muted]}>Muted text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.small]}>Small text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.underline]}>Underlined text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.strike]}>Strike-through text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.left]}>Left-aligned text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.right]}>Right-aligned text</Text>
```

## Grid System

The grid system is based on a 12-column layout with flexible options for creating responsive designs.

### Basic Row and Column Layout

```jsx
<View style={Theme.styles.row}>
  <View style={Theme.styles.col.grow}>
    <Text>Equal width column</Text>
  </View>
  <View style={Theme.styles.col.grow}>
    <Text>Equal width column</Text>
  </View>
</View>
```

### Column Sizes

```jsx
<View style={Theme.styles.row}>
  <View style={Theme.styles.col.col4}>
    <Text>4 columns (33%)</Text>
  </View>
  <View style={Theme.styles.col.col8}>
    <Text>8 columns (67%)</Text>
  </View>
</View>
```

Available column sizes: `col1` through `col12` (representing 8.33% to 100% width)

### Special Column Types

```jsx
<View style={Theme.styles.row}>
  <View style={Theme.styles.col.auto}>
    <Text>Auto width (fits content)</Text>
  </View>
  <View style={Theme.styles.col.grow}>
    <Text>Grows to fill remaining space</Text>
  </View>
</View>
```

### Alignment Options

```jsx
// Horizontal alignment (justifyContent)
<View style={[Theme.styles.row, Theme.styles.justifyContent.start]}>
  <Text>Start-aligned content</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.justifyContent.center]}>
  <Text>Center-aligned content</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.justifyContent.spaceBetween]}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.justifyContent.spaceAround]}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.justifyContent.spaceEvenly]}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>

// Vertical alignment (alignItems)
<View style={[Theme.styles.row, Theme.styles.alignItems.start]}>
  <Text>Top-aligned content</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.alignItems.center]}>
  <Text>Center-aligned content</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.alignItems.end]}>
  <Text>Bottom-aligned content</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.alignItems.stretch]}>
  <Text>Stretched content</Text>
</View>

<View style={[Theme.styles.row, Theme.styles.alignItems.baseline]}>
  <Text>Baseline-aligned content</Text>
</View>
```

### Container Helpers

```jsx
<View style={Theme.styles.container.flex}>
  <Text>Flex container (flex: 1)</Text>
</View>

<View style={Theme.styles.container.center}>
  <Text>Centered container</Text>
</View>
```

## Spacing Utilities

The spacing system provides consistent margins, padding, and gaps throughout your application.

### Spacing Scale

The spacing scale is defined as:

```typescript
const spacing = {
  0: 0,            // No spacing
  1: spacer * 0.25, // 3px (with default spacer of 12)
  2: spacer * 0.5,  // 6px
  3: spacer,        // 12px
  4: spacer * 1.5,  // 18px
  5: spacer * 3,    // 36px
};
```

### Margin Utilities

```jsx
// All sides
<View style={Theme.styles.m0}>...</View> // margin: 0
<View style={Theme.styles.m1}>...</View> // margin: 3px
<View style={Theme.styles.m2}>...</View> // margin: 6px
<View style={Theme.styles.m3}>...</View> // margin: 12px
<View style={Theme.styles.m4}>...</View> // margin: 18px
<View style={Theme.styles.m5}>...</View> // margin: 36px

// Top margin
<View style={Theme.styles.mt0}>...</View> // marginTop: 0
<View style={Theme.styles.mt1}>...</View> // marginTop: 3px
// ... and so on

// Bottom margin
<View style={Theme.styles.mb0}>...</View> // marginBottom: 0
<View style={Theme.styles.mb1}>...</View> // marginBottom: 3px
// ... and so on

// Left margin
<View style={Theme.styles.ml0}>...</View> // marginLeft: 0
<View style={Theme.styles.ml1}>...</View> // marginLeft: 3px
// ... and so on

// Right margin
<View style={Theme.styles.mr0}>...</View> // marginRight: 0
<View style={Theme.styles.mr1}>...</View> // marginRight: 3px
// ... and so on

// Horizontal margin (left and right)
<View style={Theme.styles.mx0}>...</View> // marginHorizontal: 0
<View style={Theme.styles.mx1}>...</View> // marginHorizontal: 3px
// ... and so on

// Vertical margin (top and bottom)
<View style={Theme.styles.my0}>...</View> // marginVertical: 0
<View style={Theme.styles.my1}>...</View> // marginVertical: 3px
// ... and so on
```

### Padding Utilities

```jsx
// All sides
<View style={Theme.styles.p0}>...</View> // padding: 0
<View style={Theme.styles.p1}>...</View> // padding: 3px
<View style={Theme.styles.p2}>...</View> // padding: 6px
<View style={Theme.styles.p3}>...</View> // padding: 12px
<View style={Theme.styles.p4}>...</View> // padding: 18px
<View style={Theme.styles.p5}>...</View> // padding: 36px

// Top, bottom, left, right, horizontal, vertical padding
// Follow the same pattern as margin utilities with pt*, pb*, pl*, pr*, px*, py*
```

### Gap Utilities

```jsx
<View style={Theme.styles.g0}>...</View> // gap: 0
<View style={Theme.styles.g1}>...</View> // gap: 3px
<View style={Theme.styles.g2}>...</View> // gap: 6px
<View style={Theme.styles.g3}>...</View> // gap: 12px
<View style={Theme.styles.g4}>...</View> // gap: 18px
<View style={Theme.styles.g5}>...</View> // gap: 36px
```

## Component Styles

The theming system includes pre-styled components for common UI elements.

### Text Components

```jsx
<Text style={Theme.styles.Text}>Regular text</Text>
<Text style={Theme.styles.H1}>Heading 1</Text>
<Text style={Theme.styles.H2}>Heading 2</Text>
<Text style={Theme.styles.H3}>Heading 3</Text>
<Text style={Theme.styles.H4}>Heading 4</Text>
<Text style={Theme.styles.H5}>Heading 5</Text>
<Text style={Theme.styles.H6}>Heading 6</Text>
<Text style={Theme.styles.Lead}>Lead paragraph</Text>
<Text style={Theme.styles.Link}>Link text</Text>
<Text style={Theme.styles.Code}>Code snippet</Text>
```

### Button Components

```jsx
<Pressable style={[Theme.styles.Button, Theme.styles.ButtonDefault]}>
  <Text style={Theme.styles.ButtonDefaultText}>Default Button</Text>
</Pressable>

<Pressable style={[Theme.styles.Button, Theme.styles.ButtonPrimary]}>
  <Text style={Theme.styles.ButtonPrimaryText}>Primary Button</Text>
</Pressable>
```

### Card Components

```jsx
<View style={Theme.styles.Card}>
  <Text style={Theme.styles.CardText}>Card content</Text>
</View>

<View style={Theme.styles.CardDefault}>
  <Text>Default card content</Text>
</View>
```

### Input Components

```jsx
<TextInput style={Theme.styles.TextInput} placeholder="Enter text" />
```

### Label and Tag Components

```jsx
<View style={Theme.styles.Label}>
  <Text style={Theme.styles.LabelText}>Label</Text>
</View>

<View style={Theme.styles.Tag}>
  <Text style={Theme.styles.TagText}>Tag</Text>
</View>
```

## Creating Custom Themes

To create a custom theme:

1. Create a new theme file following the naming convention: `[name].[scheme].theme.ts`
2. Implement the theme structure following the pattern in the default themes
3. Register the theme in `themes.ts`

### Example Custom Theme

```typescript
// cyberpunk.dark.theme.ts
import { ThemeType } from '@app-types/theme.types.ts';
import { DEFAULT_FONT } from '@src/constants.ts';

// Define your colors
const colors = {
  // General colors
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  // ... other colors
  
  // Theme-specific colors
  text: '#00ff41', // Neon green text
  background: '#0d0208', // Dark background
  
  // Contextual colors
  primary: '#ff003c', // Neon red
  secondary: '#9600ff', // Neon purple
  accent: '#00fff9', // Neon cyan
  // ... other contextual colors
};

// Define your styles based on these colors
const styles = {
  // Core component styles
  Text: {
    fontFamily: DEFAULT_FONT,
    color: colors.text,
    fontSize: 16,
  },
  Bg: {
    backgroundColor: colors.background,
  },
  // ... other styles
  
  // Helper styles
  // ... utility styles
};

// Export the theme
export const Theme: ThemeType = {
  colors: colors,
  styles: styles,
  spacing: {
    0: 0,
    1: 3,
    2: 6,
    3: 12,
    4: 18,
    5: 36,
  },
};
```

### Registering Your Custom Theme

Add your theme to the `themes.ts` file:

```typescript
export const Themes: Record<string, () => Promise<ThemeModule>> = {
  'default.light': () => import('@src/themes/default.light.theme.ts'),
  'default.dark': () => import('@src/themes/default.dark.theme.ts'),
  'cyberpunk.dark': () => import('@src/themes/cyberpunk.dark.theme.ts'),
};
```

Now your custom theme can be used by setting the theme name:

```jsx
const { setTheme } = useTheme();
setTheme('cyberpunk');
```