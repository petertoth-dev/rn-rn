# React Native, Right Now (RN-RN)

A modern, feature-rich React Native boilerplate designed for rapid development and scalability.

<p align="center">
  <img src="src/assets/logo-purple-lg-transp.png" alt="RN-RN Logo" width="200" />
</p>

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Import Shortcuts](#import-shortcuts)
- [Environment Configuration](#environment-configuration)
- [State Management](#state-management)
- [Form Handling](#form-handling)
- [HTTP Client](#http-client)
- [Authentication](#authentication)
- [Styling and Theming](#styling-and-theming)
- [Navigation](#navigation)
- [Permissions](#permissions)
- [Geolocation](#geolocation)
- [Connectivity](#connectivity)
- [Logging](#logging)
- [Storage](#storage)
- [App Provider](#app-provider)
- [Splash Screen](#splash-screen)
- [App Lifecycle](#app-lifecycle)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 **[Ready-to-use architecture](#project-structure)** with best practices baked in
- 🧩 **[TypeScript](https://github.com/microsoft/TypeScript)** for type safety and better developer experience
- 🌐 **[HTTP client](src/api/README.md)** with [Axios](https://github.com/axios/axios) for request/response handling
- 🔄 **[State management](#state-management)** with [Zustand](https://github.com/pmndrs/zustand) and [Immer](https://github.com/immerjs/immer)
- 📝 **[Form handling](#form-handling)** with [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- 🎨 **[Theming system](#styling-and-theming)** with light/dark mode support
- 🔐 **[Authentication](#authentication)** flow with token management
- 📱 **[Navigation](#navigation)** using [React Navigation](https://github.com/react-navigation/react-navigation)
- 💾 **[Storage system](#storage)** with adapter pattern for [MMKV](https://github.com/mrousavy/react-native-mmkv) and [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- 🔌 **[Environment configuration](#environment-configuration)** with [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)
- 📍 **[Geolocation](#geolocation)** services with [@react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation)
- 🔒 **[Permissions](#permissions)** management with [react-native-permissions](https://github.com/zoontek/react-native-permissions)
- 📶 **[Connectivity](#connectivity)** monitoring with [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo)
- 📝 **[Logging](#logging)** system with [react-native-logs](https://github.com/onubo/react-native-logs)
- 📅 **[Date handling](#date-handling)** with [DayJS](https://github.com/iamkun/dayjs)
- ✨ **[Animations](#navigation)** with [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated) v4.0.1
- 🔄 **[AppProvider](#app-provider)** for bootstrapping the application
- 🚀 **[Splash Screen](#splash-screen)** for initial loading experience
- 🎨 **[Icons and SVG Handling](#icons-and-svg-handling)** with pre-built icon components using [react-native-svg](https://github.com/software-mansion/react-native-svg)
- 🔤 **[Custom fonts](#custom-fonts)**
- 🧪 **[Testing](#requirements)** setup with [Jest](https://github.com/facebook/jest)

## Requirements

- Node.js >= 18
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url/rn-rn.git
   cd rn-rn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install iOS dependencies:
   ```bash
   npm run pod:install
   ```

4. Set up environment variables:
   ```bash
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```
   Edit the files to add your environment-specific variables.

5. Start the development server:
   ```bash
   npm start
   ```

6. Run the app:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## Project Structure

```
rn-rn/
├── android/                # Android native code
├── ios/                    # iOS native code
├── src/
│   ├── api/                # API clients and services
│   │   └── auth/           # Authentication API and strategies
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/         # Reusable UI components
│   │   └── app/            # App-specific components
│   ├── exceptions/         # Custom error handling
│   ├── screens/            # Screen components
│   │   └── auth/           # Authentication screens
│   ├── state/              # State management (Zustand)
│   │   └── middlewares/    # State middlewares
│   ├── storage/            # Storage utilities
│   │   └── adapters/       # Storage adapters
│   ├── themes/             # Theme definitions
│   └── utils/              # Utility functions
├── types/                  # TypeScript type definitions
├── App.tsx                 # Main App component
├── AppProvider.tsx         # App initialization and providers
└── index.js                # Entry point
```

## Import Shortcuts

RN-RN provides convenient import shortcuts to avoid deep relative imports:

```javascript
// Instead of
import Component from '../../components/MyComponent';

// You can use
import Component from '@components/MyComponent';
```

Available shortcuts:
```
'@src': './src',
'@components': './src/components',
'@state': './src/state',
'@app-types': './types',
```

To add or update shortcuts, modify `babel.config.js` and `tsconfig.json`.

## Environment Configuration

RN-RN uses `react-native-dotenv` for environment configuration. There are two environments by default: `development` and `production`.

Environment-specific variables are stored in `.env.{environment}` files. Example:

```
# .env.development
APP_ENV=development
BASE_URL=https://api.dev.example.com
```

Usage in code:
```javascript
import { APP_ENV, BASE_URL } from "@env";

console.log(`Current environment: ${APP_ENV}`);
console.log(`API base URL: ${BASE_URL}`);
```

## State Management

RN-RN uses Zustand for state management, following a slice pattern for better organization and type safety.

Each slice has a specific format:

```typescript
const sliceKey = 'app' as const;

export interface AppStateData {
    isReady: boolean,
}

export interface AppStateActions {
    setAppReadyStatus: (isReady: boolean) => void;
    set: (updater: (state: AppState) => void) => void;
}
export interface AppState {
    [sliceKey]: AppStateData & AppStateActions;
}

export const appSlice: StateCreator<StoreState, [], [], AppState> = (set, get) => ({
    [sliceKey]: {
        isReady: false,
        setAppReadyStatus: (isReady) =>
            set((state) => ({
                ...state,
                [sliceKey]: {
                    ...state[sliceKey],
                    isReady: isReady,
                },
            })),
        set: (fn) => set(produce(fn)),
    },
});
```

When adding a new slice, update the `store.ts` file to include it.

Usage:
```typescript
import useStore from '@state/store';

// Access state
const isReady = useStore(state => state.app.isReady);

// Update state
const setAppReadyStatus = useStore(state => state.app.setAppReadyStatus);
setAppReadyStatus(true);
```

## Form Handling

RN-RN uses [React Hook Form](https://github.com/react-hook-form/react-hook-form) for efficient form management with minimal re-renders and easy validation.

#### Basic Form Setup

```tsx
import { useForm } from 'react-hook-form';
import Input from '@components/ui/forms/Input';
import { Button, View, Text } from 'react-native';

type FormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <View>
      <Input
        name="email"
        control={control}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email',
          },
        }}
      />
      
      <Input
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
      />
      
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

#### Form Validation

React Hook Form provides built-in validation with error messages:

```tsx
// Example validation rules
const validationRules = {
  required: 'This field is required',
  minLength: {
    value: 6,
    message: 'Minimum 6 characters'
  },
  maxLength: {
    value: 20,
    message: 'Maximum 20 characters'
  },
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Invalid format'
  },
  validate: (value) => value === 'correct' || 'Invalid value'
};
```

#### Custom Form Components

The `Input` component supports custom children for advanced input types:

```tsx
import { useForm } from 'react-hook-form';
import Input from '@components/ui/forms/Input';
import { View, TextInput } from 'react-native';

function CustomInputExample() {
  const { control } = useForm();
  
  return (
    <View>
      {/* With custom child component */}
      <Input
        name="customField"
        control={control}
        rules={{ required: 'This field is required' }}
      >
        <TextInput 
          style={{ height: 100, textAlignVertical: 'top' }}
          multiline
          placeholder="Enter long text here..."
        />
      </Input>
    </View>
  );
}
```

For more advanced usage, refer to the [React Hook Form documentation](https://react-hook-form.com/get-started).

## HTTP Client

RN-RN provides a wrapper around Axios for making HTTP requests. API calls should be grouped into `*.api.ts` files under the `api` folder:

```typescript
export const useGetApiStatus = () => {
    const { response, isLoading, error, get, reset } = useGetRequest() as GetRequestState<{status: 'connected' | null}>;

    const request = async (parameters: {} = {}) => {
        return await get('/status', parameters);
    };

    return { response, isLoading, error, request, reset };
};
```

For more complex operations, add a handle function:

```typescript
export const useFollowUser = () => {
    const { isLoading, error, post, reset } = usePostRequest() as PostRequestState<FollowUnfollowResponse>;
    const setUserData = useStore((state: UsersState) => state.users.set);
    const authUserId = useStore((state: AuthState) => state.auth.userId);

    const request = async (id: number) => {
        return await post(`/v2/${id}/follow`);
    };

    const handle = async (id: number) => {
        const response = await request(id);
        setUserData((state) => {
            if(!authUserId) return;
            state.users.data[id].followings.push(response.data);
        });

        return response;
    };

    return { isLoading, error, request, handle, reset };
};
```

Usage:
```typescript
const { handle, isLoading } = useFollowUser();

handle(user?.id).then((response) => {
    console.log(response);
});
```

## Authentication

Authentication is implemented with token management and various authentication strategies. For detailed information, see [Authentication Documentation](src/api/auth/README.md).

## Styling and Theming

RN-RN includes a comprehensive theming system with support for light and dark modes. The system provides a consistent way to style your application with automatic theme switching based on device preferences.

#### Key Features

- **Light and Dark Mode Support**: Themes automatically update based on system preferences or can be manually set
- **Utility Classes**: Bootstrap-style utility classes for consistent styling across your app
- **Responsive Typography**: Variable typography with predefined heading styles and text decorations
- **Flexible Grid System**: 12-column grid system with responsive layouts
- **Spacing Utilities**: Consistent spacing with margin and padding helpers
- **Color System**: Contextual colors for primary, secondary, success, danger, etc.
- **Component Styles**: Pre-styled components like buttons, cards, and inputs
- **Global Access**: Access theme properties both inside and outside of React components

#### Theme Structure

Theme files follow the naming convention: `[name].[scheme].theme.ts` (e.g., `default.light.theme.ts`, `default.dark.theme.ts`).

Each theme consists of:

- **Colors**: Base colors, contextual colors, and theme-specific colors
- **Styles**: Core component styles and utility helper styles
- **Spacing**: Consistent spacing values for margins, padding, and gaps

#### Basic Usage

```jsx
// Access the theme in components
import { useTheme } from '@src/themes/theme.context';
import { View, Text } from 'react-native';

function MyComponent() {
  const { Theme } = useTheme();
  
  return (
    <View style={[Theme.styles.Bg]}>
      <Text style={[Theme.styles.Text]}>Hello World</Text>
    </View>
  );
}

// Or use the global Theme function outside of components
import { Theme } from '@src/themes/theme.context';

const backgroundColor = Theme().colors.background;
```

#### Automatic Light/Dark Mode

The `Theme.styles.Bg` and `Theme.styles.Text` styles automatically adapt to the current theme:

```jsx
// This will use light or dark background/text colors based on the active theme
<View style={[Theme.styles.Bg]}>
  <Text style={[Theme.styles.Text]}>Adaptive text</Text>
</View>
```

#### Typography

```jsx
// Headings
<Text style={Theme.styles.H1}>Heading 1</Text>
<Text style={Theme.styles.H2}>Heading 2</Text>
// ... H3, H4, H5, H6

// Text styles
<Text style={[Theme.styles.Text, Theme.styles.text.center]}>Centered text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.strong]}>Bold text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.muted]}>Muted text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.small]}>Small text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.underline]}>Underlined text</Text>
<Text style={[Theme.styles.Text, Theme.styles.text.strike]}>Strike-through text</Text>

// Special text components
<Text style={Theme.styles.Lead}>Lead paragraph</Text>
<Text style={Theme.styles.Link}>Link text</Text>
<Text style={Theme.styles.Code}>Code snippet</Text>
```

#### Grid System

```jsx
// Basic row with equal columns
<View style={Theme.styles.row}>
  <View style={Theme.styles.col.grow}>
    <Text>Column 1</Text>
  </View>
  <View style={Theme.styles.col.grow}>
    <Text>Column 2</Text>
  </View>
</View>

// 12-column grid system
<View style={Theme.styles.row}>
  <View style={Theme.styles.col.col4}>
    <Text>4 columns</Text>
  </View>
  <View style={Theme.styles.col.col8}>
    <Text>8 columns</Text>
  </View>
</View>

// Alignment options
<View style={[Theme.styles.row, Theme.styles.justifyContent.center]}>
  <Text>Centered content</Text>
</View>
```

#### Spacing

```jsx
// Margins (m = margin, t/r/b/l/x/y = direction, 0-5 = size)
<View style={Theme.styles.m3}>
  <Text>Margin 3 on all sides</Text>
</View>
<View style={Theme.styles.mt2}>
  <Text>Margin top 2</Text>
</View>
<View style={Theme.styles.mx4}>
  <Text>Horizontal margin 4</Text>
</View>

// Padding (p = padding, t/r/b/l/x/y = direction, 0-5 = size)
<View style={Theme.styles.p3}>
  <Text>Padding 3 on all sides</Text>
</View>
<View style={Theme.styles.py2}>
  <Text>Vertical padding 2</Text>
</View>

// Gap
<View style={Theme.styles.g2}>
  <Text>Gap 2 between children</Text>
</View>
```

For more detailed documentation, see [Themes Documentation](src/themes/README.md).

## Navigation

RN-RN uses React Navigation for screen navigation:

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Navigation types are defined in `/types/navigation.types.ts`.

## Icons and SVG Handling

RN-RN uses `react-native-svg` for rendering SVG icons and graphics. The boilerplate includes a set of pre-built icon components in `src/assets/icons/icons.tsx`.

#### Using Icons

Icons are implemented as React components that accept standardized props:

```tsx
import { ChevronLeftIcon } from '@src/assets/icons/icons';

// With default props (height: 28, width: 28, color: theme text color)
<ChevronLeftIcon />

// With custom props
<ChevronLeftIcon height={24} width={24} color="#FF0000" />
```

#### Icon Props

All icons accept the following props through the `IconProps` interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 28 | The height of the icon |
| width | number | 28 | The width of the icon |
| color | string | Theme().colors.text | The color of the icon |
| ...restProps | any | - | Any additional props to pass to the SVG component |

#### Adding New Icons

To add a new icon:

1. Import the SVG paths or elements from your SVG file
2. Create a new component following the pattern of existing icons
3. Export the component with appropriate default props

```tsx
export const NewIcon = ({height = 28, width = 28, color = Theme().colors.text, ...restProps}: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...restProps}
  >
    <Path
      d="..." // Your SVG path data
      fill={color}
    />
  </Svg>
);
```

## ScreenHeader Component

The `ScreenHeader` component provides a consistent header across screens with navigation controls and title.

```tsx
import { ScreenHeader } from '@components/ui/ScreenHeader';

// Basic usage with default back button
<ScreenHeader title="Screen Title" />

// Custom right icon with action
<ScreenHeader 
  title="Screen Title" 
  RightIcon={SearchIcon} 
  onRightComponentPress={() => console.log('Search pressed')} 
/>

// Custom styling
<ScreenHeader 
  title="Screen Title" 
  style={{ backgroundColor: 'black' }} 
  textColor="white" 
/>
```

#### ScreenHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | (required) | The title text to display in the header |
| style | ViewStyle | undefined | Custom styles for the header container |
| textColor | string | Theme.colors.text | Color for the title and icons |
| LeftIcon | IconComponent \| null | ChevronLeftIcon | Icon component for the left side (usually back button) |
| RightIcon | IconComponent | undefined | Icon component for the right side (optional) |
| onLeftComponentPress | () => void | navigation.goBack() | Function to call when left icon is pressed |
| onRightComponentPress | () => void | null | Function to call when right icon is pressed |

## Permissions

RN-RN uses [react-native-permissions](https://github.com/zoontek/react-native-permissions) for permission management.

To add new permissions:

1. iOS: Update `ios/Podfile` and `ios/YourApp/Info.plist` with the required permission entries
2. Android: Update `android/app/src/main/AndroidManifest.xml` with the required permission entries

For a comprehensive understanding of the permission flow, refer to the [permission flow diagram](https://github.com/zoontek/react-native-permissions).

## Geolocation

RN-RN implements [@react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation) for location services.

Important notes:
- Always access location data through the app state, which is automatically updated
- Never import and use the geolocation plugin directly, as running it twice can cause issues
- Start the location watcher using `watchLocation.start()` after checking permissions

Usage:
```typescript
// Access location data from state
const location = useStore(state => state.app.device.location);

// Start watching location (after checking permissions)
import { watchLocation } from '@src/utils/geolocation';
watchLocation.start();
```

## Connectivity

RN-RN monitors network connectivity using [@react-native-community/netinfo](https://www.npmjs.com/package/@react-native-community/netinfo).

The connectivity status is automatically updated in the app state:

```typescript
// Access connectivity status from state
const connectivity = useStore((state) => state.app.connectivity);

// Check if connected
if (connectivity.isConnected) {
  // Device has an active network connection
}

// Check if online
if (connectivity.isOnline) {
  // Device has internet access
}
```

## Logging

RN-RN includes a logging system based on [react-native-logs](https://www.npmjs.com/package/react-native-logs) with improved formatting and grouping capabilities:

```typescript
import { log, logAPI } from '@src/utils/logger';

// General logging
log.debug('Debug message');
log.info('Info message');
log.warn('Warning message');
log.error('Error message');

// API logging group
logAPI.debug('API request', { url, method, data });
logAPI.info('API response', { status, data });
```

## Storage

RN-RN provides a flexible storage system using the Adapter Pattern, allowing you to easily switch between different storage providers:

```typescript
import { storage } from '@src/storage/Storage';

// Store data
storage.setItem('MY_KEY', { data: 'example' });

// Retrieve data
const data = storage.getItem('MY_KEY');

// Remove data
storage.removeItem('MY_KEY');

// Clear all data
storage.clear();
```

The storage system includes adapters for:
- MMKV (high-performance, synchronous storage)
- AsyncStorage (asynchronous storage with Promise-based API)

For detailed documentation on how to use the storage system and create custom adapters, see the [Storage Documentation](src/storage/README.md).

## Date Handling

RN-RN uses [DayJS](https://day.js.org/) for date manipulation and formatting. DayJS is a lightweight alternative to Moment.js with a similar API.

```typescript
import dayjs from 'dayjs';

// Get current date/time
const now = dayjs();

// Format dates
const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

// Parse dates
const date = dayjs('2025-08-01');

// Date calculations
const tomorrow = dayjs().add(1, 'day');
const lastWeek = dayjs().subtract(7, 'day');

// Date comparisons
const isBefore = dayjs('2025-01-01').isBefore(dayjs('2025-12-31'));
const isSame = dayjs('2025-01-01').isSame(dayjs('2025-01-01'));
```

## Custom Fonts

RN-RN comes with the Ubuntu font family pre-configured. The font files are located in the `assets/fonts` directory.

To use the custom fonts in your styles:

```typescript
import { DEFAULT_FONT } from '@src/constants';

const styles = StyleSheet.create({
  text: {
    fontFamily: DEFAULT_FONT,
    fontSize: 16,
  },
  boldText: {
    fontFamily: DEFAULT_FONT,
    fontWeight: 'bold',
  },
});
```

To add additional custom fonts:

1. Add your font files to the `assets/fonts` directory
2. Link the fonts using:
   ```bash
   npx react-native-asset
   ```
3. For iOS, you may need to add the font to the Info.plist file
4. For Android, the fonts should be automatically linked

For more details, see the [React Native documentation on custom fonts](https://reactnative.dev/docs/text#font-family).

## App Provider

The AppProvider is a crucial component that bootstraps the application and manages its initialization process. It wraps the entire application and handles various setup tasks before the main UI is displayed.

```tsx
import { AppProvider } from './AppProvider';

function App() {
  return (
    <AppProvider>
      {/* Your app content */}
    </AppProvider>
  );
}
```

#### Key Features

- **Application Bootstrapping**: Initializes essential services and data before the app becomes interactive
- **State Management**: Sets the app's ready status when initialization is complete
- **System Monitoring**: Subscribes to color scheme and connectivity changes
- **Splash Screen Control**: Works with the isReady state to control when the splash screen is dismissed

#### Implementation

The AppProvider uses React's Context API to provide initialization services to the entire application:

```tsx
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const setAppReadyStatus = useStore(state => state.app.setAppReadyStatus);

  useColorSchemes(); // Initialize and subscribe to color scheme updates
  useConnectivity(); // Subscribe to network/internet connection updates

  useEffect(() => {
    const bootstrap = async () => {
      // Perform initialization tasks here
      // For example: load user data, check authentication, etc.
      
      // When everything is ready, set isReady to true
      setAppReadyStatus(true);
    };

    bootstrap();
  }, []);

  return <>{children}</>;
};
```

## Splash Screen

The Splash Screen is displayed during the application's initialization phase, providing visual feedback to users while the app loads. It's automatically shown when the app starts and dismissed once the AppProvider sets the `isReady` state to true.

```tsx
import SplashScreen from '@components/app/SplashScreen.component';

function App() {
  const isReady = useStore(state => state.app.isReady);
  
  return (
    <AppProvider>
      {!isReady ? (
        <SplashScreen />
      ) : (
        <View>
          {/* Main application UI */}
        </View>
      )}
    </AppProvider>
  );
}
```

#### Implementation

The SplashScreen component is a simple loading screen with an activity indicator:

```tsx
const SplashScreen = () => {
  const { Theme } = useTheme();

  return (
    <View style={[Theme.styles.container.flex, Theme.styles.container.center]}>
      <Text style={[Theme.styles.Text, Theme.styles.mb4]}>Loading...</Text>
      <ActivityIndicator size="large" color={Theme.colors.primary}/>
    </View>
  );
};
```

#### Connection with AppProvider

The AppProvider and Splash Screen work together to create a smooth startup experience:

1. When the app launches, the AppProvider begins its initialization process
2. While initialization is in progress, `isReady` is false, so the Splash Screen is displayed
3. The AppProvider performs necessary setup tasks (loading data, checking authentication, etc.)
4. Once initialization is complete, the AppProvider sets `isReady` to true
5. This state change triggers a re-render, replacing the Splash Screen with the main application UI

This pattern ensures that users see a loading indicator until the app is fully ready to use, providing a better user experience by avoiding partially loaded or non-functional UI states.

## App Lifecycle

```
╔══════════════════════════════════════════════════════════════════╗
║                      📱 React Native App Boot                    ║
╚══════════════════════════════════════════════════════════════════╝

            ┌───────────────────────────────┐
            │   📦 Native Code (iOS/Android)│
            └────────────┬──────────────────┘
                         │ Launches native app shell
                         ▼
              ┌─────────────────────────────┐
              │     🟦 JavaScript Bridge    │    
              └────────────┬────────────────┘
                         │ Loads JS bundle (from metro or release bundle)
                         ▼
              ┌─────────────────────────────┐
              │   🚀 App Entry: index.js    │
              └────────────┬────────────────┘
                           │
          ┌────────────────┴──────────────────────┐
          ▼                                       ▼
┌─────────────────────────────────┐    ┌──────────────────────────┐
│ AppRegistry.registerComponent() │    │  App.tsx (Root Component)│
└─────────────────────────────────┘    └────────────┬─────────────┘
                                                    ▼
                                      ┌───────────────────────────┐
                                      │   <AppProvider>           │
                                      │   <ThemeProvider>         │
                                      │   <NavigationContainer>   │
                                      └────────────┬──────────────┘
                                                   │
                                 Runs first render ▼
                                      ┌───────────────────────────┐
                                      │   React Renders Tree      │
                                      │  (Virtual DOM creation)   │
                                      └────────────┬──────────────┘
                                                   ▼
                                 ┌────────────────────────────────────┐
                                 │       🎯 useEffect (on mount)      │
                                 │  (e.g. bootstrap(), listeners)     │
                                 └─────────────────┬──────────────────┘
                                                   ▼
                                  ┌─────────────────────────────────┐
                                  │     🔁 React state updates      │
                                  │     - from stores/hooks/etc     │
                                  │     - triggers re-renders       │
                                  └─────────────────┬───────────────┘
                                                    ▼
                                ┌──────────────────────────────────────┐
                                │       Re-render updated subtree      │
                                └─────────────────┬────────────────────┘
                                                  ▼
                                 ┌────────────────────────────────────┐
                                 │  React reconciles + updates native │
                                 │     views via Fabric/Bridge        │
                                 └────────────────────────────────────┘

╔══════════════════════════════════════════════════════════════════╗
║                  💬 Events / Listeners during Runtime            ║
╚══════════════════════════════════════════════════════════════════╝

User interaction, API responses, animations, system events like:

    - AppState (foreground/background)
    - Dimensions (rotation)
    - Appearance (color scheme)
    - NetInfo (connectivity)
    - Push notifications
    - Timers, gestures, scroll, etc

         ▼
Trigger JS handlers (callbacks, hooks) → update state → re-render

╔══════════════════════════════════════════════════════════════════╗
║                  🔚 App Teardown / Background                    ║
╚══════════════════════════════════════════════════════════════════╝

When user exits app or it gets backgrounded:

    - useEffect cleanups run
    - Subscriptions removed
    - Native views paused/unmounted

React Native keeps JS engine alive in background unless killed.
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

