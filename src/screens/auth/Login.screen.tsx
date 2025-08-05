import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { logUI } from '@src/utils/logger.ts';
import { authorizationContext } from '@src/api/auth/AuthorizationStrategy.ts';
import { ScreenHeader } from '@components/ui/ScreenHeader.tsx';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@src/themes/theme.context.tsx';
import Input from '@components/ui/forms/Input.tsx';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  logUI.debug('LoginScreen Render');
  const route = useRoute<RouteProp<any>>();
  const { Theme } = useTheme();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (route?.params?.email) {
      setValue('email', route.params.email);
    }
  }, [route?.params, setValue]);

  const handleLogin = (data: FormData) => {
    logUI.debug('Login attempt', data);
    authorizationContext.getStrategy()?.setToken('TESTING.auth.token');
    navigation.navigate('Home' as never); // Example navigation after login
  };

  return (
    <ScrollView
      style={[Theme.styles.Bg, Theme.styles.px3]}
      contentContainerStyle={[Theme.styles.py3]}
      stickyHeaderIndices={[0]}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader title="Login" />

      {/* Email Input */}
      <Input
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        placeholder="Email"
        placeholderTextColor={Theme.colors.neutral300}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
      <Input
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        }}
        placeholder="Password"
        placeholderTextColor={Theme.colors.neutral300}
        rightItem={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        }
        secureTextEntry={!showPassword}
      />

      {/* Login Button */}
      <Pressable
        style={[Theme.styles.Button, Theme.styles.ButtonPrimary, Theme.styles.mt4]}
        onPress={handleSubmit(handleLogin)}
        disabled={isSubmitting}
      >
        <Text style={[Theme.styles.ButtonPrimaryText]}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Text>
      </Pressable>

    </ScrollView>
  );
};

export default LoginScreen;
