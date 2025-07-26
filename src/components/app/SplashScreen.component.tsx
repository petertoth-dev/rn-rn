import { ActivityIndicator, Text, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
      <Text style={{color: 'white', marginBottom: 13}}>Loading...</Text>
      <ActivityIndicator size="large"/>
    </View>
  );
};

export default SplashScreen;
