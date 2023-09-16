import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  withCredentials: true
})
const makeRequest = async (url: string, options?: object) => {
  
  try {
    const result = await api(url, options)

    return result.data
    
  } catch (error) {
    console.log(error)
  }
}

export default makeRequest