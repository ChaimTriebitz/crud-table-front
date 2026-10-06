import { useState } from 'react'
import axios from 'axios'
import { useDialog, useForm, useLogInUser } from '../../hooks'
import { urls } from '../../config'

export const Register = () => {
   const login = useLogInUser()
   const { dialogRef, closeDialog } = useDialog('register')
   const { values, handleChange } = useForm({ username: '', email: '', password: '' })
   const [err, setErr] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')

      try {
         const { data } = await axios.post(urls.auth.register, { ...values })
         localStorage.setItem('vito', data.token)
         login()
         closeDialog()
      } catch (error) {
         setErr(error.response?.data?.error || 'Unable to create the account. Please try again.')
      }
   }

   return (
      <dialog className='dialog register' ref={dialogRef} onClose={closeDialog}>
         <div className='dialog-content'>
            <header>
               <div>
                  <span className='eyebrow'>GET STARTED</span>
                  <h4>Create account</h4>
               </div>
            </header>

            <main>
               <form className='form' onSubmit={handleSubmit}>
                  <div className='input'>
                     <label htmlFor='register-name'>Name</label>
                     <input
                        id='register-name'
                        name='username'
                        autoComplete='name'
                        value={values.username}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                     />
                  </div>

                  <div className='input'>
                     <label htmlFor='register-email'>Email</label>
                     <input
                        id='register-email'
                        type='email'
                        name='email'
                        autoComplete='email'
                        value={values.email}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                     />
                  </div>

                  <div className='input'>
                     <label htmlFor='register-password'>Password</label>
                     <input
                        id='register-password'
                        type='password'
                        name='password'
                        autoComplete='new-password'
                        value={values.password}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                     />
                  </div>

                  <button className='btn success' type='submit'>Create account</button>
                  {err && <p className='error' role='alert'>{err}</p>}
               </form>
            </main>
         </div>
      </dialog>
   )
}
