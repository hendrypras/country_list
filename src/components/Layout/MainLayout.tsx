import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './style.module.scss'
import Footer from './Footer'

const MainLayout = () => {
  const { theme } = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <>
      <Navbar />
      <main className={`${theme} ${styles.main__container}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
