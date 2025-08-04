import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from '@src/themes/theme.context.tsx';

const SplashScreen = () => {
  const { Theme } = useTheme();

  return (
    <View style={[Theme.styles.container.flex, Theme.styles.container.center]}>
      <Text style={[Theme.styles.Text, Theme.styles.mb4]}>Loading...</Text>
      <ActivityIndicator size="large" color={Theme.colors.primary}/>
    </View>
  );
};

export default SplashScreen;
