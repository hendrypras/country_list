import { useNavigate, useParams } from 'react-router-dom'
import { Container } from '../../components'
import styles from './style.module.scss'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import useCountries from '../../hooks/useCountries'
import { DataCountryContext } from '../../context/DataCountryContext'
const DetailCountryPage = () => {
  const { countryName } = useParams()
  const [currencies, setCurrencies] = useState('')
  const [languages, setLanguages] = useState('')
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)
  const { detailCountry } = useContext(DataCountryContext)
  const { getDetailCountry } = useCountries()
  useEffect(() => {
    const currenciesArray = detailCountry?.currencies
      ? Object.keys(detailCountry?.currencies)
      : []
    if (currenciesArray.length > 0) {
      const currenciesString = currenciesArray.join(', ')
      setCurrencies(currenciesString)
    }
    const languagesObject = detailCountry?.languages
    if (languagesObject && Object.keys(languagesObject).length > 0) {
      const languagesArray = Object.entries(languagesObject).map(
        ([value]) => `${value}`
      )
      const languagesString = languagesArray?.join(', ')

      setLanguages(languagesString)
    }
  }, [detailCountry])
  useEffect(() => {
    if (countryName) {
      getDetailCountry(countryName)
    }
  }, [countryName])

  return (
    <Container>
      <div className={`${styles.back__btn} ${theme}`}>
        <button onClick={() => navigate(-1)} className={theme}>
          <KeyboardBackspaceIcon className="text" />
          <span className="text">Back</span>
        </button>
      </div>
      <div className={styles.detail__wrapper}>
        <div className={styles.img__wrapper}>
          <img src={detailCountry?.flags?.svg} alt="" />
        </div>
        <div className={styles.content__wrapper}>
          <h1 className="text">{detailCountry?.name?.common}</h1>
          <div className={`${styles.content__description__wrapper} text`}>
            <div className={styles.content__desc}>
              <div className={styles.content}>
                <h4>native name: </h4>
                <h5>{detailCountry?.name?.official}</h5>
              </div>
              <div className={styles.content}>
                <h4>population: </h4>
                <h5>{detailCountry?.population}</h5>
              </div>
              <div className={styles.content}>
                <h4>region: </h4>
                <h5>{detailCountry?.region}</h5>
              </div>
              <div className={styles.content}>
                <h4>sub region: </h4>
                <h5>{detailCountry?.subregion}</h5>
              </div>
              <div className={styles.content}>
                <h4>capital: </h4>
                <h5>
                  {detailCountry?.capital ? detailCountry?.capital[0] : 'None'}
                </h5>
              </div>
            </div>
            <div className={styles.content__desc}>
              <div className={styles.content}>
                <h4>top level domain: </h4>
                <h5>{detailCountry?.tld ? detailCountry?.tld[0] : '-'}</h5>
              </div>
              <div className={styles.content}>
                <h4>currencies: </h4>
                <h5>{currencies}</h5>
              </div>
              <div className={styles.content}>
                <h4>Languages: </h4>
                <h5>{languages}</h5>
              </div>
            </div>
          </div>
          <div className={styles.border__contries}>
            <h2 className="text">Border Countries:</h2>
            {detailCountry?.borders?.slice(0, 3).map((val: any) => {
              return (
                <div key={`key-${val}`} className={`${styles.border} ${theme}`}>
                  <p className="text">{val}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default DetailCountryPage
