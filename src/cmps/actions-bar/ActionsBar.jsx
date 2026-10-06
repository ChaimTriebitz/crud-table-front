import { useGlobalState } from '../../hooks'
import { AddRow, Search } from '..'

export const ActionsBar = () => {
   const { page, banks, lenders } = useGlobalState()
   const count = page === 'banks' ? banks?.length || 0 : lenders?.length || 0
   const title = page === 'banks' ? 'Banks' : 'Lenders'

   return (
      <div className='actions-bar'>
         <div className='page-intro'>
            <div>
               <span className='eyebrow'>Vito CRM</span>
               <h1>{title}</h1>
               <p>Manage and update your {page} directory.</p>
            </div>
            <span className='record-count'>{count} records</span>
         </div>

         <div className='actions-controls'>
            <Search />
            <AddRow />
         </div>
      </div>
   )
}
