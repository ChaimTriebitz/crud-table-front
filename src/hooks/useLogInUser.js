import axios from 'axios'
import { useGlobalState } from './useGlobalState'
import { ACTIONS } from '../state'
import { urls } from '../config'
import { useNavigate } from 'react-router-dom'

export const useLogInUser = () => {
   const { dispatch } = useGlobalState()
   const navigate = useNavigate()

   return async () => {
      try {
         const { data } = await axios.get(urls.private.get, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('vito')}`
            }
         })
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: data.user })
         navigate('/banks')
      } catch (error) {
         localStorage.removeItem('vito')
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: null })
         console.log(error)
      }
   }
