import { Dialogs, Footer, Header, Main, Msg } from './cmps'

function App() {

   document.title = 'Vito'

   return (
      <div className="App" >
         <Msg />
         <Dialogs />
         <Header />
         <Main />
      </div>
   )
}

export default App


