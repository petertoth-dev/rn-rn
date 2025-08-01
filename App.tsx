import { StatusBar, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { BASE_URL } from '@env';
import { useStore } from '@state/store.ts';
import { RootNavigationStackParamList } from '@app-types/navigation.types.ts';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { logNavigation } from '@src/utils/logger.ts';
import LoginScreen from '@src/screens/auth/Login.screen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@src/screens/Home.screen.tsx';
import { ThemeProvider } from '@src/themes/theme.context.tsx';
import SplashScreen from '@components/app/SplashScreen.component.tsx';
import { AppProvider } from './AppProvider.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import TypographyScreen from '@src/screens/Typography.screen.tsx';
import GridSystemScreen from '@src/screens/GridSystem.screen.tsx';
import ComponentsScreen from '@src/screens/Components.screen.tsx';

function App() {
  const Stack = createNativeStackNavigator<RootNavigationStackParamList>();
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string | undefined>(undefined);

  const isReady = useStore(state => state.app.isReady);
  const colorScheme = useStore(state => state.app.system.colorScheme);

  const linking = {
    prefixes: ['rn-rn://', BASE_URL],
    config: {
      screens: {
        // 'App.VerifyEmailScreen': '/email/verification/:token', // example how to add universal-links to the project
      },
    },
  };

  /**
   * You can add specific logic here. E.g., show different routes when the user has logged in
   */
  let initialRoute = (): keyof RootNavigationStackParamList => {
    return 'App.HomeScreen';
  };

  return (
    <AppProvider>
      <ThemeProvider>
        {!isReady ? (
          <SplashScreen />
        ) : (
          <>
            <SafeAreaView style={styles.safeAreaView}>
              <StatusBar
                translucent={true}
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
              />
              <NavigationContainer
                ref={navigationRef}
                linking={linking}
                // Log Navigation changes
                onReady={() => {
                  routeNameRef.current = navigationRef.getCurrentRoute()?.name;
                }}
                onStateChange={async () => {
                  const previousRouteName = routeNameRef.current;
                  const currentRouteName =
                    navigationRef.getCurrentRoute()?.name;

                  if (previousRouteName !== currentRouteName) {
                    routeNameRef.current = currentRouteName;
                    logNavigation.debug(currentRouteName);
                  }
                }}
              >
                <Stack.Navigator
                  initialRouteName={initialRoute()}
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen
                    name="App.LoginScreen"
                    component={LoginScreen}
                  />
                  <Stack.Screen name="App.HomeScreen" component={HomeScreen} />
                  <Stack.Screen name="App.TypographyScreen" component={TypographyScreen} />
                  <Stack.Screen name="App.GridSystemScreen" component={GridSystemScreen} />
                  <Stack.Screen name="App.ComponentsScreen" component={ComponentsScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </>
        )}
      </ThemeProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
