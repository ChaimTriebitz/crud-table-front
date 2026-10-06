import { useDialog, useForm, useGlobalState } from '../../hooks'
import { svgs } from '../../assets'
import { DIALOG_FIELDS } from '../../data'
import { toastMsg, objects } from '../../functions'
import { create } from '../../controllers'
import { Inputs } from '../../cmps'
import { ACTIONS } from '../../state'
import { recordDemoCreate } from '../../functions/demoData'

export const AddRowDialog = () => {
   const { page, dispatch, loggedInUser } = useGlobalState()
   const isAuthenticated = Boolean(loggedInUser || localStorage.getItem('vito'))

   const { values, handleChange, isValuesChanged } = useForm(
      objects.filterFields({}, DIALOG_FIELDS[page].map(field => field.internal_name))
   )
   const { closeDialog, dialogRef } = useDialog('addRow')

   const handleSave = () => {
      if (!isAuthenticated) {
         const row = { ...values, _id: 'demo-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) }
         recordDemoCreate(page, row)
         dispatch({ type: ACTIONS.LOCAL_CREATE, entity: page, payload: row })
         toastMsg.success('Demo row added locally. The database was not changed.')
         closeDialog()
         return
      }

      create.data(values, page)
         .then((data) => toastMsg.success(data.message))
         .then(() => dispatch({ type: ACTIONS.REFRESH_DATA }))
         .then(closeDialog)
         .catch((data) => toastMsg.error(data.message))
   }

   return (
      <dialog className='dialog details' ref={dialogRef} onClose={closeDialog}>
         <div className='dialog-content'>
            <header>
               <h4>{isAuthenticated ? 'Add New Row' : 'Add Demo Row'}</h4>
               <section className='btns'>
                  {isValuesChanged && <button onClick={handleSave}>{svgs.save}</button>}
                  <button type='button' onClick={closeDialog}>{svgs.clear}</button>
               </section>
            </header>
            <main className='form'>
               {DIALOG_FIELDS[page].map(field =>
                  <Inputs
                     key={field.internal_name}
                     value={values[field.internal_name]}
                     field={field}
                     handleChange={handleChange}
                     options={field.options}
                  />
               )}
            </main>
         </div>
      </dialog>
   )
}
