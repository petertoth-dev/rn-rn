# React Native, Right Now — A boilerplate

## Features

### Import Shortcuts
```
'@src': './src',
'@components': './src/components',
'@state': './src/state',
'@types': '.types',
```
To add/update shortcuts see `babel.config.js` and `tsconfig.json`

### Environments 
`react-native-dotenv` is pre-installed and configured.

There are two environments by default: `development` and `production`.

You can set environment-specific variables in `.env.{environment}` files. For the format, see the included `.env.{environment}.example` files.

#### Usage
```
import {APP_ENV} from "@env"
.
.
<Text>{APP_ENV}</Text>
```
More info: https://www.npmjs.com/package/react-native-dotenv

### State
`RN-RN` loves state, doesn't like hooks!
Hooks are overused, and causing race condition issues, hard to maintain using them in a bigger team. 
Not to mention the endless prop-drilling traps when need to pass information down through five components. Unreadable, unscalable code, headaches.

So we would like to encourage you to use states as much as possible. In the next parts you'll see some great examples how even `RN-RN` leverages its capabilities. 
Please browse the underlying source code to learn more!

We took Zustand and put it into a very comfortable home, giving one kind of meaning of its existence. It has a lot of way how you want to use Zustand, this is one of them.

We follow the `slice` pattern, but added some framework around it. A slice has a strict format, and each slice should follow that format and include the generic typings as well.

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
    [sliceKey]:AppStateData & AppStateActions;
}

export  const appSlice: StateCreator<StoreState, [], [], AppState> = (set, get) => ({
    [sliceKey]:{
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

When you add a new slice, you also need to update the `store.ts` file!


### Encrypted Storage
TODO: maybe add as an adapter

### Connectivity (NetInfo)
Based on [@react-native-community/netinfo](https://www.npmjs.com/package/@react-native-community/netinfo) library (can use it as-is, but recommended to go with the app state,'s connectivity)

Recommended: use Zustand store.
state.app.connectivity will be updated automatically by netinfo.

format:
```typescript
    connectivity: {
      isConnected: null,
      isOnline: null,
    },
```

```typescript
const connectivity = useStore((state) => state.app.connectivity);
```


### Http Client
We created a cool HTTP client (wrapper around axios) to be easy to make requests.
You should group your API calls into `*.api.ts` files under the `api` folder.
These should follow this format:

```typescript
export const useGetApiStatus = () => {
    const { response, isLoading, error, get, reset } = useGetRequest() as GetRequestState<{status: 'connected' | null}>;

    const request = async (parameters: {} = {}) => {
        return await get('/status', parameters);
    };

    return { response, isLoading, error, request, reset };
};

```

A handle function might be added if more processing needed over the request. The request method should be strictly do the HTTP request part, never anything else. This way we can re-use it anywhere if necessary.

```typescript
export const useFollowUser = () => {
    const { isLoading, error, post, reset } = usePostRequest() as PostRequestState<FollowUnfollowResponse>;
    const setUserData = useStore((state: UsersState) => state.users.set);
    const authUserId = useStore((state: AuthState) => state.auth.userId);

    const request = async (id: number) => {
        return await post(`/v2/${id}/follow`);
    };

    const handle = async (id: number) => {
        const response = await request(type, id);
        setUserData((state)=>{
            if(!authUserId) return;
            state.users.data[id].followings.push(response.data);
        });

        return response;
    };

    return { isLoading, error, request, handle, reset };
};

```

#### Usage
```typescript
    const {follow, isLoading} = useFollow();
    
    follow.handle(user?.id).then((response)=>{
        console.log(response);
    });

```


#### Authentication
[See more here](src/api/auth/README.md)

### Logging
Based on [react-native-logs](https://www.npmjs.com/package/react-native-logs)
but smarter and better formatted, plus examples how to create groups Like logAPI

### Shortcut paths
```
'@src': './src',
'@components': './src/components',
'@state': './src/state',
'@app-types': './types',
```
###

### Color Schemes (Light / Dark mode)
Color scheme is available in the store and automatically updated. 
Usage:
```typescript
  const colorScheme = useStore((state) => state.app.system.colorScheme);
```

### Styling
- Themes (light/dark supported), any custom theme can be added, and even swtich between them while the app is running. Basic light/dark mode themes already included.
- Bootstrap class-style logic styling
- variable typography
- variable spacing (with bootstrap style "classes")
- ThemeManager usage
- Theme() usage
- Examples of using these styles both inline and separately (style =)
- Theme filename convention [name].[scheme (light or dark)].theme.ts e.g.: default.light.ts. This way can be multiple themes all could have dark and light versions. COLOR_SCHEME constants tell if the color scheme is from system for overridden to static (light or dark)

### AppProvider
- this provider handles the basic bootstrapping the app

### Splash Screen
- SplashScreen component will be visible while app is booting (isReady === false)
- user can customize the design everything

### Navigation
- navigation has been implemented
- document typings /types/navigation.types.ts
- mention example inn App.tsx

### Permissions
we implement `https://github.com/zoontek/react-native-permissions`
- link document and explain/quote step by step how to add more permissions (e.g. uplading Podfile and Info.Plist and AndroidManifest)
- link the permission flow diagram because it's very helpful for understanding: https://github.com/zoontek/react-native-permissions

### GeoLocation
We implement: @react-native-community/geolocation
Since this plugin has many flaws we found a stable way to setup and use it
- explain how to use it
- explain that to get the position data user need to use the state (which is automatically updated) and NEVER import and use the plugin directly because running it twice will stop updating the location (bug with the plugin itself)
- explain that the location watcher need to be "started" somewhere ( watchLocation.start();). Currently it's in the Home component, as an example but it can be started from anywhere the user want just don't forget the 1) request 2) check the permissions.

# App LifeCycle
```text
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
