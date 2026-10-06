import { useDialog, useForm, useGlobalState } from '../../hooks'
import { svgs } from '../../assets'
import { DIALOG_FIELDS } from '../../data'
import { Inputs } from '../../cmps'
import { objects, toastMsg } from '../../functions'
import { update } from '../../controllers'
import { ACTIONS } from '../../state'
import { recordDemoUpdate } from '../../functions/demoData'

export const DetailsDialog = () => {
   const { dialogs, page, dispatch, loggedInUser } = useGlobalState()
   const { row } = dialogs.details
   const isAuthenticated = Boolean(loggedInUser || localStorage.getItem('vito'))
   const canEdit = row._source === 'local' || (isAuthenticated && row._canEdit)
   const { values, handleChange, isValuesChanged } = useForm(
      objects.filterFields(row, DIALOG_FIELDS[page].map(field => field.internal_name))
   )
   const { closeDialog, dialogRef } = useDialog('details')

   const handleSave = () => {
      if (!canEdit) return
      if (!isAuthenticated || row._source === 'local') {
         recordDemoUpdate(page, row._id, values)
         dispatch({ type: ACTIONS.LOCAL_UPDATE, entity: page, payload: { id: row._id, values } })
         toastMsg.success('Demo changes saved locally. The database was not changed.')
         closeDialog()
         return
      }
      update.data(row._id, values, page)
         .then((res) => toastMsg.success(res.message))
         .then(() => dispatch({ type: ACTIONS.REFRESH_DATA }))
         .then(closeDialog)
         .catch((err) => toastMsg.error(err.message))
   }

   return (
      <dialog className='dialog form details' ref={dialogRef} onClose={closeDialog}>
         <div className='dialog-content'>
            <header>
               <h4>{row.bank || row.lender || 'Record details'}</h4>
               <section className='btns'>
                  {canEdit && isValuesChanged && <button onClick={handleSave}>{svgs.save}</button>}
                  <button onClick={closeDialog}>{svgs.clear}</button>
               </section>
            </header>
            {!canEdit && <p className='readonly-notice'>This database row is read-only. Only its creator can edit or delete it.</p>}
            <main>
               {DIALOG_FIELDS[page].map(field =>
                  <Inputs
                     key={field.internal_name}
                     value={values[field.internal_name]}
                     field={field}
                     handleChange={handleChange}
                     options={field.options}
                     disabled={!canEdit}
                  />
               )}
            </main>
         </div>
      </dialog>
   )
}
