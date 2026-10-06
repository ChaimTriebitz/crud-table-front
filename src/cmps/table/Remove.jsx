import { svgs } from '../../assets'
import { remove } from '../../controllers'
import { useGlobalState } from '../../hooks'
import { ACTIONS } from '../../state'
import { recordDemoRemove } from '../../functions/demoData'

export const Remove = ({ row, header }) => {
   const { dispatch, page, loggedInUser } = useGlobalState()
   const isAuthenticated = Boolean(loggedInUser || localStorage.getItem('vito'))

   const handleRemove = () => {
      dispatch({
         type: ACTIONS.OPEN_DIALOG,
         entity: 'confirm',
         payload: {
            action: () => {
               if (!isAuthenticated) {
                  recordDemoRemove(page, row._id)
                  dispatch({ type: ACTIONS.LOCAL_REMOVE, entity: page, payload: row._id })
                  return Promise.resolve()
               }

               return remove.data(row._id, page)
            },
            msg: isAuthenticated
               ? 'deleting "' + row[header.msg] + '" from the database'
               : 'deleting "' + row[header.msg] + '" from this demo only'
         }
      })
   }

   return (
      <button className='remove' onClick={handleRemove}>
         {svgs.trashBin}{svgs.trashCover}
      </button>
   )
}
