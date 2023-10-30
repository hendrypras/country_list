import axios from 'axios'
import { TCallApi } from '../types'

export const callAPI = async ({
  endpoint,
  method,
  headers,
  params,
  data,
  baseUrl,
}: TCallApi) => {
  const baseURL = baseUrl ? baseUrl : import.meta.env.VITE_BASE_URL
  const option = {
    baseURL,
    url: endpoint,
    method,
    headers,
    params,
    data,
  }
  const response = await axios(option)
  return response?.data
}
