import {
  FC,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
import { TDataResponseCountry } from '../types'

interface IDataCountries {
  countries?: []
  setCountries?: Dispatch<SetStateAction<any>>
  detailCountry?: any
  setDetailCountry?: Dispatch<SetStateAction<any>>
  favCountries?: TDataResponseCountry[]
  setFavCountries?: Dispatch<SetStateAction<TDataResponseCountry[]>>
  errorMsg?: string | null
  setErrorMsg?: Dispatch<SetStateAction<string | null>>
}

export const DataCountryContext = createContext<IDataCountries>({
  countries: [],
  setCountries: () => {},
  detailCountry: {},
  setDetailCountry: () => {},
  favCountries: [],
  setFavCountries: () => {},
  errorMsg: '',
  setErrorMsg: () => {},
})
export const CountriesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [countries, setCountries] = useState<any>([])
  const [detailCountry, setDetailCountry] = useState<any>({})
  const [favCountries, setFavCountries] = useState<TDataResponseCountry[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  return (
    <DataCountryContext.Provider
      value={{
        countries,
        setCountries,
        detailCountry,
        setDetailCountry,
        favCountries,
        setFavCountries,
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </DataCountryContext.Provider>
  )
}
