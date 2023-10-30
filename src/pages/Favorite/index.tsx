import React, { useContext, useEffect } from 'react'
import { Card, Container, Empty } from '../../components'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import useFavCountries from '../../hooks/useFavCountries'
import { DataCountryContext } from '../../context/DataCountryContext'
const FavoritePage = () => {
  const { favCountries } = useContext(DataCountryContext)
  const navigate = useNavigate()
  const { getFavCountries } = useFavCountries()

  useEffect(() => {
    getFavCountries()
  }, [])
  return (
    <Container>
      <div className={styles.back__btn}>
        <button onClick={() => navigate(-1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12L3 12"
              stroke="#121214"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 17L3 12L8 7"
              stroke="#121214"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="text">Back</span>
        </button>
      </div>
      {favCountries?.length > 0 ? (
        <div className={styles.card__wrapper}>
          {favCountries?.map(data => {
            return (
              <React.Fragment key={data?.id}>
                <Card data={data} />
              </React.Fragment>
            )
          })}
        </div>
      ) : (
        <Empty text="No data in Favorite, please add contry to here" />
      )}
    </Container>
  )
}

export default FavoritePage
