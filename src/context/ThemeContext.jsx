import { useEffect, useMemo, useState } from 'react';
import ThemeContext from './themeContextInstance';
const STORAGE_KEY = 'sonido-vivo-theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app-shell theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
