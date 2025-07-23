import {Appearance, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {useEffect, useState} from 'react';
import {APP_ENV} from "@env"
import dayjs from 'dayjs';
import {StoreState, useStore} from '@state/store.ts';
import {storage} from '@src/storage/Storage.ts';
import {useGetApiStatus} from '@src/api/app.api.ts';
import {logApp} from '@src/utils/logger.ts';
import {authorizationContext} from '@src/api/auth/AuthorizationStrategy.ts';
import Connectivity from '@components/app/Connectivity.component.tsx';
import {DEFAULT_COLOR_SCHEME} from '@src/constants.ts';

function App() {
  const systemColorScheme = useColorScheme() || DEFAULT_COLOR_SCHEME;
  const isReady = useStore((state: StoreState) => state.app.isReady);
  const setAppReadyStatus = useStore((state: StoreState) => state.app.setAppReadyStatus);
  const connectivity = useStore((state) => state.app.connectivity);
  const colorScheme = useStore((state) => state.app.system.colorScheme);
  const setAppState = useStore((state) => state.app.set);
  const getApiStatus = useGetApiStatus();
  const [apiStatus, setApiStatus] = useState<'connected' | null>(null);

  storage.setItem('RENDER_TIMESTAMP', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  // TODO: Add Splash-Screen logic
  useEffect(() => {
    setTimeout(()=>{
      setAppReadyStatus(true);
    },3000)
  },[]);

  // Test HTTP client
  useEffect(() => {
    getApiStatus.request().then((response)=>{
      setApiStatus(response?.data?.status || null);
    })
  },[])

  // Test Auth- TODO: Move this to an example Login component
  useEffect(() => {
    authorizationContext.getStrategy()?.setToken('TESTING.auth.token');
  },[])

  // Watch the device's Color Scheme changes
  useEffect(() => {
    setAppState(state => {state.app.system.colorScheme = systemColorScheme});
    const appearanceListener = Appearance.addChangeListener((event: Appearance.AppearancePreferences) => {
      setAppState(state => {state.app.system.colorScheme = event.colorScheme || DEFAULT_COLOR_SCHEME});
    });

    // Clean up the listener when the component unmounts
    return () => {
      appearanceListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} barStyle={systemColorScheme === 'light' ? 'light-content' : 'dark-content'} />
      <Connectivity />
      <Text style={{color: '#fff', fontSize: 40}}>ENV: {APP_ENV}</Text>
      <Text style={{color: '#fff', fontSize: 40}}>isReady: {isReady ? 'true' : 'false'}</Text>
      <Text style={{color: '#fff', fontSize: 20}}>Color Scheme: {colorScheme}</Text>
      <Text style={{color: '#fff', fontSize: 15}}>Connectivity: isConnected: {connectivity.isConnected ? 'yes' : 'no'}, isOnline: {connectivity.isOnline ? 'yes' : 'no'}</Text>
      <Text style={{color: '#fff', fontSize: 20}}>Storage Test: {storage.getItem('RENDER_TIMESTAMP')}</Text>
      <Text style={{color: '#fff', fontSize: 20}}>API Test: {apiStatus ?? 'disconnected'}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default App;
