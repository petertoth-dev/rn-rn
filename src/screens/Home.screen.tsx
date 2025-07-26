import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { log, logUI } from '@src/utils/logger.ts';
import { APP_ENV } from '@env';
import { storage } from '@src/storage/Storage.ts';
import {StoreState, useStore} from '@state/store.ts';
import { useGetApiStatus } from '@src/api/app.api.ts';
import dayjs from 'dayjs';
import { useTheme } from '@src/themes/theme.context.tsx';
import { check, request, RESULTS } from 'react-native-permissions';
import { PERMISSIONS } from '@src/constants.ts';
import useWatchLocation from '@src/utils/geolocation.ts';

const HomeScreen = () => {
  logUI.debug('HomeScreen Render');
  const navigation = useNavigation();
  const isReady = useStore((state: StoreState) => state.app.isReady);
  const connectivity = useStore((state) => state.app.connectivity);
  const colorScheme = useStore((state) => state.app.system.colorScheme);
  const deviceLocation = useStore((state) => state.app.device.location);
  const [apiStatus, setApiStatus] = useState<'connected' | null>(null);
  const getApiStatus = useGetApiStatus();
  const { Theme: theme } = useTheme();
  const {watchLocation} = useWatchLocation();

  storage.setItem('RENDER_TIMESTAMP', dayjs().format('YYYY-MM-DD HH:mm:ss'));
  
  // Test HTTP client
  useEffect(() => {
    getApiStatus.request().then((response)=>{
      setApiStatus(response?.data?.status || null);
    })
  },[]);

  // Location Tracking Permission
  useEffect(() => {
    check(PERMISSIONS.LOCATION_WHEN_IN_USE.permission).then((status)=>{
      if(status !== RESULTS.GRANTED){
        request(PERMISSIONS.LOCATION_WHEN_IN_USE.permission)
        //permissionRequestBottomSheetRef?.current?.present();
        log.debug('LOCATION_WHEN_IN_USE status:', status);
      }else{
        watchLocation.start();
        request(PERMISSIONS.LOCATION_ALWAYS.permission).then((status)=>{
          console.log('LOCATION_ALWAYS', status);
        });
      }
    });
  }, []);

  
  return (
    <View style={[theme.styles.Bg,{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
      <Text style={[theme.styles.H1]}>ENV: {APP_ENV}</Text>
      <Text style={[theme.styles.H2]}>isReady: {isReady ? 'true' : 'false'}</Text>
      <Text style={[theme.styles.H3]}>Color Scheme: {colorScheme}</Text>
      <Text style={[theme.styles.H4]}>Connectivity: isConnected: {connectivity.isConnected ? 'yes' : 'no'}, isOnline: {connectivity.isOnline ? 'yes' : 'no'}</Text>
      <Text style={[theme.styles.H5]}>Storage Test: {storage.getItem('RENDER_TIMESTAMP')}</Text>
      <Text style={[theme.styles.Text]}>API Test: {apiStatus ?? 'disconnected'}</Text>
      <Text style={[theme.styles.Text]}>Location: {deviceLocation?.coords.latitude}, {deviceLocation?.coords.longitude}, {deviceLocation?.coords.altitude}</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('App.LoginScreen');
        }}>
        <Text>LOGIN</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
