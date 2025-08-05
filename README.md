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
- [Usage](#usage)
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
- [App Lifecycle](#app-lifecycle)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 **Ready-to-use architecture** with best practices baked in
- 🧩 **TypeScript** for type safety and better developer experience
- 🔄 **State management** with Zustand and Immer
- 📝 **Form handling** with React Hook Form
- 🎨 **Theming system** with light/dark mode support
- 🌐 **HTTP client** with built-in request/response handling
- 🔐 **Authentication** flow with token management
- 📱 **Navigation** using React Navigation
- 💾 **Storage system** with adapter pattern for different providers
- 🔌 **Environment configuration** for development and production
- 📍 **Geolocation** services with permission handling
- 🔒 **Permissions** management
- 📶 **Connectivity** monitoring
- 📝 **Logging** system
- 🧪 **Testing** setup with Jest
- 📅 **Date handling** with DayJS
- 🔤 **Custom fonts** with Ubuntu font family

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

## Usage

### Import Shortcuts

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

### Environment Configuration

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

### State Management

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

### Form Handling

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

### HTTP Client

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

### Authentication

Authentication is implemented with token management and various authentication strategies. For detailed information, see [Authentication Documentation](src/api/auth/README.md).

### Styling and Theming

RN-RN includes a comprehensive theming system with support for light and dark modes:

- Themes are automatically updated based on system preferences or can be manually set
- Bootstrap-style utility classes for consistent styling
- Variable typography and spacing
- Theme files follow the naming convention: `[name].[scheme].theme.ts` (e.g., `default.light.theme.ts`)

Usage:
```jsx
// Access the current color scheme
const colorScheme = useStore((state) => state.app.system.colorScheme);

// Access the theme in components
import { useTheme } from '@src/themes/theme.context';
import { View, Text } from 'react-native';

function MyComponent() {
  const { Theme } = useTheme();
  
  return (
    <View style={{ backgroundColor: Theme.colors.background }}>
      <Text style={{ color: Theme.colors.text }}>Hello World</Text>
    </View>
  );
}

// Or use the global Theme function
import { Theme } from '@src/themes/theme.context';

const backgroundColor = Theme().colors.background;
```

### Navigation

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

### Icons and SVG Handling

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

### ScreenHeader Component

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

### Permissions

RN-RN uses [react-native-permissions](https://github.com/zoontek/react-native-permissions) for permission management.

To add new permissions:

1. iOS: Update `ios/Podfile` and `ios/YourApp/Info.plist` with the required permission entries
2. Android: Update `android/app/src/main/AndroidManifest.xml` with the required permission entries

For a comprehensive understanding of the permission flow, refer to the [permission flow diagram](https://github.com/zoontek/react-native-permissions).

### Geolocation

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

### Connectivity

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

### Logging

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

### Storage

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

### Date Handling

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

### Custom Fonts

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

