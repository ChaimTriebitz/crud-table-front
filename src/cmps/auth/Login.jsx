import { useState } from 'react'
import axios from 'axios'
import { useDialog, useForm, useGlobalState, useLogInUser } from '../../hooks'
import { urls } from '../../config'
import { ACTIONS } from '../../state'

export const Login = () => {
   const { dispatch } = useGlobalState()
   const { dialogRef, closeDialog } = useDialog('login')
   const { values, handleChange } = useForm({ username: '', password: '' })
   const login = useLogInUser()
   const [err, setErr] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')

      try {
         const { data } = await axios.post(urls.auth.login, { ...values })

         if (data.success) {
            localStorage.setItem('vito', data.token)
            login()
         }
      } catch (error) {
         setErr(error.response?.data?.error || 'Unable to log in. Please try again.')
      }
   }

   return (
      <dialog className='dialog login' ref={dialogRef} onClose={closeDialog}>
         <div className='dialog-content'>
            <header>
               <div>
                  <span className='eyebrow'>WELCOME BACK</span>
                  <h4>Log in</h4>
               </div>
            </header>

            <main>
               <form className='form' onSubmit={handleSubmit}>
                  <div className='input'>
                     <label htmlFor='username'>Username</label>
                     <input
                        id='username'
                        name='username'
                        autoComplete='username'
                        value={values.username}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                     />
                  </div>

                  <div className='input'>
                     <label htmlFor='password'>Password</label>
                     <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        value={values.password}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                     />
                  </div>

                  <button className='btn success' type='submit'>Log in</button>
                  {err && <p className='error' role='alert'>{err}</p>}
               </form>
            </main>

            <footer>
               <p>
                  Don't have an account?{' '}
                  <button
                     type='button'
                     className='dialog-link'
                     onClick={() => {
                        closeDialog()
                        dispatch({ type: ACTIONS.OPEN_DIALOG, entity: 'register' })
                     }}
                  >
                     Register
                  </button>
               </p>
            </footer>
         </div>
      </dialog>
   )
}
