import { svgs } from '../../assets'
import { useGlobalState } from '../../hooks'
import { ACTIONS } from '../../state'

export const AddRow = () => {
   const { dispatch, page } = useGlobalState()
   const label = page === 'banks' ? 'Add bank' : 'Add lender'

   const handleAddRow = () => {
      dispatch({
         type: ACTIONS.OPEN_DIALOG,
         entity: 'addRow',
      })
   }

   return (
      <section className='add-row'>
         <button
            type='button'
            className='add-row-button'
            onClick={handleAddRow}
            aria-label={label}
         >
            {svgs.plus}
            <span>{label}</span>
         </button>
      </section>
   )
}
