import { Pressable, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { useEffect } from 'react';
import { logUI } from '@src/utils/logger.ts';
import { authorizationContext } from '@src/api/auth/AuthorizationStrategy.ts';
import { useTheme } from '@src/themes/theme.context.tsx';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  logUI.debug('LoginScreen Render');
  const route = useRoute<RouteProp<any>>();
  const { Theme: theme } = useTheme();


  const { control, handleSubmit, setValue} = useForm<FormData>({
    mode: 'onChange',
  });

  // If the email address was taken during registration we show login screen prefilled with the email
  useEffect(() => {
    setValue('email', route?.params?.email || '');
  }, [route?.params]);

  const handleLogin = () => {
    authorizationContext.getStrategy()?.setToken('TESTING.auth.token');
  };

  return (
    <View style={[theme.styles.Bg, { flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
      <Pressable
        onPress={handleLogin}
      >
        <Text style={[theme.styles.Text]}>Login</Text>
        <Text style={[theme.styles.Text]}>Login SH</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
