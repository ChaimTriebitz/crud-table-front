import { svgs } from '../../assets'
import { useGlobalState } from '../../hooks'
import { ACTIONS } from '../../state'


export const AddRow = () => {

   const { dispatch } = useGlobalState()

   const handleAddRow = () => {
      dispatch({
         type: ACTIONS.OPEN_DIALOG,
         entity: 'addRow',
      })
   }

   return (
      <section className='add-row'>
         <button onClick={handleAddRow}>{svgs.plus}</button>
      </section>
   )
}
