import { createContext, useContext, useState, useEffect } from 'react';
import { ColorSchemes, ThemeType } from '@app-types/theme.types';
import { COLOR_SCHEME, DEFAULT_COLOR_SCHEME } from '@src/constants.ts';
import useStore from '@state/store.ts';
import { Themes } from '@src/themes/themes.ts';

type ThemeContextType = {
  Theme: ThemeType;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeName = useStore((state) => state.app.system.theme);
  const setTheme = useStore((state) => state.app.setTheme);
  const colorScheme = useStore((state) => state.app.system.colorScheme);
  const [Theme, _setTheme] = useState<ThemeType>();

  // Load The Selected Theme
  useEffect(() => {
    loadTheme(themeName, colorScheme || DEFAULT_COLOR_SCHEME).then(result=>{
      if(result){
        _currentTheme = result;
        _setTheme(result);
      }
    })
  }, [themeName, colorScheme]);

  const loadTheme = async (name: string, scheme: ColorSchemes): Promise<ThemeType | null> => {
    scheme = COLOR_SCHEME === 'system' ? scheme : COLOR_SCHEME;
    const themeKey = `${name}.${scheme}`;

    const importer = Themes[themeKey];
    if (!importer) {
      console.warn(`No theme registered under key: ${themeKey}`);
      return null;
    }

    try {
      const module = await importer();
      return module.Theme;
    } catch (error) {
      console.error(`Error loading theme "${themeKey}":`, error);
      return null;
    }
  };

  if(!Theme) return null;

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

let _currentTheme: ThemeType;
// Globally Accessible
export const Theme = () => _currentTheme;
