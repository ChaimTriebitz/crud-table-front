import { useEffect } from 'react'
import { Dialogs, Footer, Header, Main, Msg } from './cmps'
import { useLogInUser } from './hooks'

function App() {
   document.title = 'Vito'
   const login = useLogInUser()

   useEffect(() => {
      if (localStorage.getItem('vito')) login()
   }, [])

   return (
      <div className='App'>
         <Msg />
         <Dialogs />
         <Header />
         <Main />
      </div>
   )
}

export default App
