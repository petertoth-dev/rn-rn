import { useEffect } from 'react';
import { Appearance } from 'react-native';
import useStore from '@state/store.ts';
import { DEFAULT_COLOR_SCHEME } from '@src/constants.ts';

export const useColorSchemes = () => {
  const setAppState = useStore((state) => state.app.set);

  // Initialize
  const currentScheme = Appearance.getColorScheme();
  setAppState(state => { state.app.system.colorScheme = currentScheme || DEFAULT_COLOR_SCHEME });

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setAppState(state => { state.app.system.colorScheme = colorScheme || DEFAULT_COLOR_SCHEME });
    });

    return () => subscription.remove();
  }, []);
};
