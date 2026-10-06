import { AddRow, Search } from '..'
import { useGlobalState } from '../../hooks'

export const ActionsBar = () => {
   const { page, banks, lenders } = useGlobalState()
   const isBanks = page === 'banks'
   const count = isBanks ? banks.length : lenders.length
   const title = isBanks ? 'Banks' : 'Lenders'
   const description = isBanks
      ? 'Manage bank contacts and lending information.'
      : 'Manage lender contacts, deal sizes and notes.'

   return (
      <section className='actions-bar'>
         <div className='page-intro'>
            <div>
               <span className='eyebrow'>DATA</span>
               <h1>{title}</h1>
               <p>{description}</p>
            </div>
            <span className='record-count'>{count} records</span>
         </div>

         <div className='actions-controls'>
            <Search />
            <AddRow />
         </div>
      </section>
   )
}
