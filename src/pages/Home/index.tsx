import styles from './style.module.scss'
import { Card, Container, Empty } from '../../components'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { TDataResponseCountry } from '../../types'
import { ThemeContext } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { DataCountryContext } from '../../context/DataCountryContext'
import useCountries from '../../hooks/useCountries'
import useFavCountries from '../../hooks/useFavCountries'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
const HomePage = () => {
  const [endpoint, setEndpoint] = useState('/all')
  const [keyword, setKeyword] = useState<null | string>(null)
  const { theme } = useContext(ThemeContext)
  const { countries, setCountries, errorMsg } = useContext(DataCountryContext)
  const { getCountries } = useCountries()
  const { getFavCountries } = useFavCountries()
  const [filterRegion, setFilterRegion] = useState<null | string>(null)

  useEffect(() => {
    if (keyword) {
      const searchData = countries?.filter((item: any) =>
        item?.name?.common?.toLowerCase().includes(keyword.toLowerCase())
      )
      setCountries(searchData)
    } else {
      getCountries(endpoint)
    }
    if (errorMsg) {
      toast.error(errorMsg)
    }
  }, [keyword, errorMsg])

  useEffect(() => {
    getFavCountries()
  }, [])

  useEffect(() => {
    if (filterRegion && filterRegion !== 'all') {
      setEndpoint(`/region/${filterRegion}`)
    } else {
      setEndpoint('/all')
    }
    getCountries(endpoint)
  }, [filterRegion, endpoint])
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  const handleFilterRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterRegion(e.target.value)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 28

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCountries = countries?.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil((countries?.length || 0) / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])
  const endPage = 5
  return (
    <>
      <Container>
        <section className={styles.header__home}>
          <div className={`${styles.search__wrapper} ${theme}`}>
            <SearchIcon className={styles.icon} />
            <input
              type="text"
              className={theme}
              placeholder="Search for a country..."
              onChange={handleSearch}
            />
          </div>
          <div className={styles.select__wrapper}>
            <select onChange={handleFilterRegion} className={`${theme} text`}>
              <option value="all" defaultValue={'all'}>
                Filter by Region
              </option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </section>
        {currentCountries?.length > 0 ? (
          <>
            <nav className={styles.nav__paginate}>
              <ul className={styles.nav__paginate__wrapper}>
                <li>
                  <button onClick={handlePrevPage}>
                    <ArrowBackIosIcon />
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => {
                  if (index < endPage) {
                    return (
                      <li key={index}>
                        <button
                          className={
                            currentPage === index + 1 ? styles.active : ''
                          }
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  } else if (index === endPage) {
                    return (
                      <li key={index}>
                        <span>...</span>
                      </li>
                    )
                  }
                  return null
                })}
                <li>
                  <button onClick={handleNextPage}>
                    <ArrowForwardIosIcon />
                  </button>
                </li>
              </ul>
            </nav>

            <div className={styles.card__wrapper}>
              {currentCountries.map((data: any) => {
                const dataCard: TDataResponseCountry = {
                  flag: data?.flags?.svg,
                  name: data?.name?.common,
                  population: data?.population,
                  region: data?.region,
                  capital: data?.capital ? data?.capital[0] : 'none',
                }
                return (
                  <React.Fragment key={data?.population}>
                    <Card data={dataCard} />
                  </React.Fragment>
                )
              })}
            </div>
            <nav className={styles.nav__paginate}>
              <ul className={styles.nav__paginate__wrapper}>
                <li>
                  <button onClick={handlePrevPage}>
                    <ArrowBackIosIcon />
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => {
                  if (index < endPage) {
                    return (
                      <li key={index}>
                        <button
                          className={
                            currentPage === index + 1 ? styles.active : ''
                          }
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  } else if (index === endPage) {
                    return (
                      <li key={index} className={theme}>
                        <span className="text">. . .</span>
                      </li>
                    )
                  }
                  return null
                })}
                <li>
                  <button onClick={handleNextPage}>
                    <ArrowForwardIosIcon />
                  </button>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <Empty
            text="The country you are looking for does not exist, please choose another
          country"
          />
        )}
      </Container>
    </>
  )
}

export default HomePage
