import { useEffect } from 'react'
import { ActionsBar, Table } from '../cmps'
import { TABLE_HEADERS } from '../data'
import { useGlobalState } from '../hooks'
import { get } from '../controllers'
import { ACTIONS } from '../state'
import { arrays, toastMsg } from '../functions'
import { applyDemoChanges } from '../functions/demoData'

export const Lenders = () => {
   const { dispatch, lenders, refreshCount, search, sort, loggedInUser } = useGlobalState()
   const isAuthenticated = Boolean(loggedInUser || localStorage.getItem('vito'))
   const rows = arrays.sortBy(arrays.filterObjects(lenders, ['contact', 'lender'], search), sort.by, sort.dir)

   useEffect(() => {
      dispatch({ type: ACTIONS.SET, entity: 'isDataLoading', payload: true })
      get.data('lenders')
         .then((res) => {
            const data = isAuthenticated ? res.data : applyDemoChanges('lenders', res.data)
            dispatch({
               type: ACTIONS.SET,
               entity: 'lenders',
               payload: data.map(row => ({
                  ...row,
                  _source: row._source || 'database',
                  _canEdit: isAuthenticated && Boolean(
                     row.createdBy && loggedInUser?._id &&
                     String(row.createdBy) === String(loggedInUser._id)
                  ),
               }))
            })
            dispatch({ type: ACTIONS.SET, entity: 'serverConnected', payload: true })
         })
         .catch((error) => {
            dispatch({ type: ACTIONS.SET, entity: 'serverConnected', payload: false })
            toastMsg.error(error.response?.data?.error || 'Unable to connect to the server')
         })
         .finally(() => dispatch({ type: ACTIONS.SET, entity: 'isDataLoading', payload: false }))
   }, [refreshCount, isAuthenticated, loggedInUser, dispatch])

   return (
      <main className='page lenders'>
         <ActionsBar />
         <Table headers={TABLE_HEADERS.lenders} rows={rows} />
      </main>
   )
}
