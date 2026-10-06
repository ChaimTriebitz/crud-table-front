import axios from 'axios'
import { urls } from '../config'

export const get = {
   data,
}

async function data(page) {
   const url = urls?.[page]?.get

   if (!url) {
      throw new Error('No API URL configured for ' + page)
   }

   try {
      const res = await axios.get(url, {
         timeout: 30000,
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (localStorage.getItem('vito') || '')
         }
      })

      if (!res.data?.success || !Array.isArray(res.data.data)) {
         throw new Error('Invalid ' + page + ' response from server')
      }

      return res.data
   } catch (err) {
      if (err.code === 'ECONNABORTED') {
         throw new Error('The server took too long to respond. Please try again.')
      }
      throw err
   }
}
