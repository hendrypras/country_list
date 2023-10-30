import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import styles from './style.module.scss'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <nav className={`${styles.nav__container} ${theme}`}>
      <div className={styles.nav__wrapper}>
        <Link to={'/'} className={styles.brand}>
          <h1 className={`text`}>Where In The World?</h1>
        </Link>
        <div className={styles.icon__wrapper}>
          <Link to={'/favorite'}>
            <FavoriteIcon className={`${styles.icon}`} />
          </Link>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={styles.theme}
          >
            {theme === 'light' ? (
              <>
                <Brightness2OutlinedIcon className={`${styles.icon} text`} />
                <span className={`text`}>Dark Mode</span>
              </>
            ) : (
              <>
                <ModeNightIcon className={`${styles.icon} text`} />
                <span className={`text`}>Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
