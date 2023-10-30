import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { FC, useContext, useEffect, useState } from 'react'

import { TDataResponseCountry } from '../../types'
import { DataCountryContext } from '../../context/DataCountryContext'
import useFavCountries from '../../hooks/useFavCountries'

type TData = { data: TDataResponseCountry }

const Card: FC<TData> = ({ data }) => {
  const navigate = useNavigate()
  const { favCountries } = useContext(DataCountryContext)
  const [reqBodyFav, setReqBodyFav] = useState<TDataResponseCountry>({
    id: '',
    name: '',
    flag: '',
    population: 0,
    capital: '',
    region: '',
  })
  const isInFav = favCountries?.some(
    item => item?.name.toLowerCase() === data?.name.toLowerCase()
  )
  const [isHeartClicked, setIsHeartClicked] = useState(isInFav)

  const { addToFav, removeToFav } = useFavCountries()
  const handleDetail = (nameCountry: string) => {
    navigate(`detail/${nameCountry}`)
  }

  useEffect(() => {
    if (data) {
      setReqBodyFav({
        id: data?.name.toLowerCase().split(' ').join('-'),
        name: data?.name,
        flag: data?.flag,
        population: data?.population,
        region: data?.region,
        capital: data?.capital,
      })
    }
  }, [data])
  useEffect(() => {
    setIsHeartClicked(isInFav)
  }, [isInFav])
  return (
    <div className={styles.card}>
      <div className={styles.flag} onClick={() => handleDetail(data?.name)}>
        <img src={data?.flag} alt={'flalg-image'} />
      </div>
      <div className={styles.content__wrapper}>
        <h1 className={`${styles.label__country} text`}>{data?.name}</h1>
        <div className={styles.content__bottom}>
          <div className={`${styles.content__description}`}>
            <div className={`${styles.wrapper__content_desc}`}>
              <h4 className={`${styles.key} text`}>Population:</h4>
              <h5 className={`${styles.value} text`}>
                {data?.population.toLocaleString()}
              </h5>
            </div>
            <div className={`${styles.wrapper__content_desc}`}>
              <h4 className={`${styles.key} text`}>Region:</h4>
              <h5 className={`${styles.value} text`}>{data?.region}</h5>
            </div>
            <div className={`${styles.wrapper__content_desc}`}>
              <h4 className={`${styles.key} text`}>Capital:</h4>
              <h5 className={`${styles.value} text`}>{data?.capital}</h5>
            </div>
          </div>
          <div className={styles.icno__fav}>
            {isHeartClicked ? (
              <button onClick={() => removeToFav(data?.name)}>
                <FavoriteIcon />
              </button>
            ) : (
              <button onClick={() => addToFav(reqBodyFav)}>
                <FavoriteBorderIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
