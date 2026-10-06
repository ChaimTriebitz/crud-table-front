import { useEffect } from 'react'
import { ActionsBar, Table } from '../cmps'
import { TABLE_HEADERS } from '../data'
import { useGlobalState } from '../hooks'
import { get } from '../controllers'
import { ACTIONS } from '../state'
import { toastMsg } from '../functions'
import { applyDemoChanges } from '../functions/demoData'

export const Banks = () => {
   const { filters, dispatch, banks, loggedInUser } = useGlobalState()
   const isAuthenticated = Boolean(loggedInUser || localStorage.getItem('vito'))
   const filteredRows = banks?.filter(row => (row.lender === filters.category || !filters.category))

   useEffect(() => {
      dispatch({ type: ACTIONS.SET, entity: 'isDataLoading', payload: true })
      get.data('banks')
         .then((res) => {
            const rows = isAuthenticated ? res.data : applyDemoChanges('banks', res.data)
            dispatch({ type: ACTIONS.SET, entity: 'banks', payload: rows })
            dispatch({ type: ACTIONS.SET, entity: 'serverConnected', payload: true })
         })
         .catch((error) => {
            dispatch({ type: ACTIONS.SET, entity: 'serverConnected', payload: false })
            toastMsg.error(error.response?.data?.error || 'Unable to connect to the server')
         })
         .finally(() => dispatch({ type: ACTIONS.SET, entity: 'isDataLoading', payload: false }))
   }, [isAuthenticated, dispatch])

   return (
      <main className='page banks'>
         <ActionsBar />
         <Table headers={TABLE_HEADERS.banks} rows={filteredRows} />
      </main>
   )
}
