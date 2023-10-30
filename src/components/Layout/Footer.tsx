import { useContext } from 'react'
import styles from './style.module.scss'
import { ThemeContext } from '../../context/ThemeContext'

const Footer = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <footer className={`${styles.footer__container} ${theme}`}>
      <div className={styles.footer__wrapper}>
        <span className={`text`}>
          &copy; {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
