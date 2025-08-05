import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { logUI } from '@src/utils/logger.ts';
import { APP_ENV } from '@env';
import { storage } from '@src/storage/Storage.ts';
import { StoreState, useStore } from '@state/store.ts';
import { useGetQuote } from '@src/api/app.api.ts';
import dayjs from 'dayjs';
import { useTheme } from '@src/themes/theme.context.tsx';
import { openSettings, RESULTS } from 'react-native-permissions';
import useWatchLocation from '@src/utils/geolocation.ts';
import { QuoteApiResponse } from '@app-types/api.types.ts';
import { ScreenHeader } from '@components/ui/ScreenHeader.tsx';

const HomeScreen = () => {
  logUI.debug('HomeScreen Render');
  const navigation = useNavigation();
  const isReady = useStore((state: StoreState) => state.app.isReady);
  const connectivity = useStore((state) => state.app.connectivity);
  const colorScheme = useStore((state) => state.app.system.colorScheme);
  const deviceLocation = useStore((state) => state.app.device.location);
  const [quote, setQuote] = useState<string>('');
  const getQuote = useGetQuote();
  const { Theme: theme } = useTheme();
  const { watch, permissions } = useWatchLocation();

  // Save render timestamp
  storage.setItem('RENDER_TIMESTAMP', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  /**
   * Example usage for a custom API request
   */
  useEffect(() => {
    getQuote.request().then((response) => {
      const data = response as unknown as QuoteApiResponse; // This is just an example so we override the default response typings
      setQuote(data[0]?.q || '');
    });
  }, []);

  /**
   * Example initialization usage of the geolocation service
   */
  useEffect(() => {
    const init = async () => {
      const status = await permissions.foreground.check();
      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Location Permission Blocked',
          'Please enable location access in your device settings.',
          [
            { text: 'Open Settings', onPress: ()=>{openSettings()} },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return;
      }
      if (status !== RESULTS.GRANTED) {
        const result = await permissions.foreground.request();
        if (result !== RESULTS.GRANTED) {
          // Add UI for requesting
          return;
        }
      }

      watch.start();
    };

    init();
    return () => watch.stop();
  }, []);

  return (
    <ScrollView
      style={[theme.styles.Bg, { flex: 1 }]}
      contentContainerStyle={[theme.styles.p4, theme.styles.g4]}
      stickyHeaderIndices={[0]}
    >
      <ScreenHeader title="React Native, Right Now!" textColor={theme.colors.accent} LeftIcon={null} />
      {/* Header */}
      <Text style={[theme.styles.H1, theme.styles.mb3, theme.styles.text.center]}>
        Welcome to the App
      </Text>

      {/* ENV Card */}
      <View style={[theme.styles.Card, theme.styles.p3, theme.styles.g2]}>
        <Text style={theme.styles.H4}>App</Text>
        <Text style={theme.styles.Text}>ENV: {APP_ENV}</Text>
        <Text style={theme.styles.Text}>Ready: {isReady ? '✅ Yes' : '❌ No'}</Text>
        <Text style={theme.styles.Text}>Color Scheme: {colorScheme}</Text>
      </View>

      {/* Connectivity Card */}
      <View style={[theme.styles.Card, theme.styles.p3, theme.styles.g2]}>
        <Text style={theme.styles.H4}>Connectivity</Text>
        <Text style={theme.styles.Text}>
          Connected: {connectivity.isConnected ? '✅ Yes' : '❌ No'}
        </Text>
        <Text style={theme.styles.Text}>
          Online: {connectivity.isOnline ? '✅ Yes' : '❌ No'}
        </Text>
      </View>

      {/* Quote Block */}
      <View style={[theme.styles.Card, theme.styles.p3, theme.styles.g2,]}>
        <Text style={theme.styles.H4}>Daily Quote</Text>
        <Text style={[theme.styles.CardText]}>{quote || 'Fetching a quote...'}</Text>
      </View>

      {/* Location */}
      <View style={[theme.styles.Card, theme.styles.p3, theme.styles.g2]}>
        <Text style={theme.styles.H4}>Location</Text>
        {deviceLocation ? (
          <Text style={theme.styles.Text}>
            {deviceLocation.coords.latitude}, {deviceLocation.coords.longitude} (alt:
            {deviceLocation.coords.altitude})
          </Text>
        ) : (
          <Text style={theme.styles.Text}>Location not available</Text>
        )}
      </View>

      {/* Storage */}
      <View style={[theme.styles.Card, theme.styles.p3]}>
        <Text style={theme.styles.H4}>Last Render</Text>
        <Text style={theme.styles.Text}>{storage.getItem('RENDER_TIMESTAMP')}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={[theme.styles.g2]}>
        {[
          { title: 'Login', screen: 'App.LoginScreen' },
          { title: 'Typography', screen: 'App.TypographyScreen' },
          { title: 'Grid System', screen: 'App.GridSystemScreen' },
          { title: 'Components', screen: 'App.ComponentsScreen' },
        ].map((btn) => (
          <Pressable
            key={btn.title}
            style={[theme.styles.Button, theme.styles.ButtonPrimary]}
            onPress={() => navigation.navigate(btn.screen as never)}
          >
            <Text style={[theme.styles.ButtonPrimaryText]}>{btn.title}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
