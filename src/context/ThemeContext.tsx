import {
  FC,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  setTheme: () => {},
})

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  const [theme, setTheme] = useState<Theme>(savedTheme || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
