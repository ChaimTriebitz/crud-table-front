import axios from 'axios'
import { urls } from '../config'

export const create = {
   data,
   manyData,
}

async function data(data, page) {
   try {
      const res = await axios.post(urls?.[page]?.create, data, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('vito') || ''}`
         }
      })
      return res.data
   } catch (err) {
      console.error(err)
      throw err.response?.data || err
   }
}

async function manyData(data, page) {
   try {
      const res = await axios.post(urls?.[page]?.createMany, data, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('vito') || ''}`
         }
      })
      return res.data
   } catch (err) {
      console.error(err)
      throw err.response?.data || err
   }
}
