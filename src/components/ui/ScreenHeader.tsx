import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ChevronLeftIcon } from '../../assets/icons/icons';
import { useNavigation } from '@react-navigation/native';
import {IconComponent} from '@app-types/general.types.ts';
import { useTheme } from '@src/themes/theme.context.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenHeaderProps {
  style?: ViewStyle;
  title: string;
  textColor?: string;
  LeftIcon?: IconComponent | null;
  RightIcon?: IconComponent;
  onRightComponentPress?: ()=>void;
  onLeftComponentPress?: ()=>void;
}

export const ScreenHeader = ({ style, title, textColor, LeftIcon = ChevronLeftIcon, RightIcon, onRightComponentPress, onLeftComponentPress }: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const { Theme } = useTheme();

  textColor = textColor || Theme.colors.text;
  const insets = useSafeAreaInsets();

  const defaultOnBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[
      Theme.styles.row, Theme.styles.py3,
      styles.container,
      { backgroundColor: Theme.colors.background },
      style,
      {paddingTop: (style?.paddingTop ? +style.paddingTop : Theme.spacing[3]) + insets.top}]}
    >
      <View style={styles.leftContainer}>
        <Pressable
          style={styles.leftPressable}
          onPress={onLeftComponentPress || defaultOnBackPress}
          hitSlop={20}
        >
          {!!LeftIcon && <LeftIcon color={textColor} />}
        </Pressable>
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Pressable
          style={styles.rightPressable}
          onPress={onRightComponentPress || null}
          hitSlop={20}
        >
          {!!RightIcon && <RightIcon color={textColor} />}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  leftPressable: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightPressable: {
    alignItems: 'flex-end',
  },
});