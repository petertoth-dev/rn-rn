import React, { ReactElement, ReactNode } from 'react';
import { Text, View, TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Controller } from 'react-hook-form';
import { Theme } from '@src/themes/theme.context.tsx';

interface InputProps<C extends React.ElementType> {
  name: string;
  control: any;
  rules?: object;
  styles?: {
    container?: StyleProp<ViewStyle>;
    input?: StyleProp<ViewStyle>;
    error?: StyleProp<TextStyle>;
  };
  rightItem?: ReactNode;
  children?: ReactElement<React.ComponentProps<C>>;
}

const Input = <C extends React.ElementType = typeof TextInput>({
  name,
  control,
  rules = {},
  styles = {},
  rightItem,
  defaultValue = '',
  onChangeText,
  children,
  ...restProps
}: InputProps<C> & React.ComponentProps<C>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View
          style={[Theme().styles.mb4, styles?.container]}
        >
          <View style={[Theme().styles.row, Theme().styles.TextInput, styles?.input, { position: 'relative' },]}>
            {children ? (
              React.cloneElement(children, {
                value,
                onBlur,
                onChangeText: (text: string) => {
                  onChange(text);
                  onChangeText?.(text);
                },
                ...restProps,
              } as React.ComponentProps<C>)
            ) : (
              <TextInput
                {...(restProps as TextInputProps)}
                style={[Theme().styles.col.grow, Theme().styles.p0, restProps.style,]}
                value={value}
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(text);
                  onChangeText?.(text);
                }}
              />
            )}
            {rightItem}
          </View>
          {error && (
            <Text style={[Theme().styles.text.danger, Theme().styles.mt2, Theme().styles.mx2, styles.error]}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default Input;