import { useContext } from 'react'
import { callAPI } from '../domain/api'
import { DataCountryContext } from '../context/DataCountryContext'

const useCountries = () => {
  const { setCountries, setErrorMsg, setDetailCountry } =
    useContext(DataCountryContext)
  const getCountries = async (endpoint: string) => {
    try {
      const response = await callAPI({ endpoint, method: 'GET' })
      if (response) {
        setCountries(response)
      }
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  const getDetailCountry = async (countryName: string) => {
    try {
      const response = await callAPI({
        endpoint: `/name/${countryName}`,
        method: 'GET',
      })
      if (response?.length > 0) {
        setDetailCountry(response[0])
      }
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  return { getCountries, getDetailCountry }
}

export default useCountries
