import { useContext } from 'react'
import { callAPI } from '../domain/api'
import { DataCountryContext } from '../context/DataCountryContext'
import { TDataResponseCountry } from '../types'
import toast from 'react-hot-toast'

const baseUrl = import.meta.env.VITE_BASE_URL_SERVER
const useFavCountries = () => {
  const { setErrorMsg, setFavCountries } = useContext(DataCountryContext)
  const getFavCountries = async () => {
    try {
      const res = await callAPI({
        endpoint: '/favorite',
        method: 'GET',
        baseUrl,
      })
      setFavCountries(res)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  const addToFav = async (reqBodyFav: TDataResponseCountry) => {
    try {
      const res = await callAPI({
        endpoint: '/favorite',
        method: 'POST',
        data: reqBodyFav,
        baseUrl,
      })
      if (res) {
        toast.success(`${res.name} successfully added to favorite`)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      getFavCountries()
    }
  }
  const removeToFav = async (nameCountry: string) => {
    const baseUrl = import.meta.env.VITE_BASE_URL_SERVER
    try {
      await callAPI({
        endpoint: `/favorite/${nameCountry.toLowerCase().split(' ').join('-')}`,
        method: 'DELETE',
        baseUrl,
      })
      toast.success('Deleted Sucessfully!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      getFavCountries()
    }
  }

  return { getFavCountries, addToFav, removeToFav }
}

export default useFavCountries
