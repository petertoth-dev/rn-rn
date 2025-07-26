import { useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import useStore from '@state/store.ts';
import { DEFAULT_COLOR_SCHEME } from '@src/constants.ts';

export const useColorSchemes = () => {
  const setAppState = useStore((state) => state.app.set);

  useEffect(() => {
    const currentScheme = Appearance.getColorScheme();
    setAppState(state => {state.app.system.colorScheme = currentScheme || DEFAULT_COLOR_SCHEME});

    const subscription = Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      setAppState(state => {state.app.system.colorScheme = colorScheme || DEFAULT_COLOR_SCHEME});
    });

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

}
