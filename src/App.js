import { Dialogs, Header, Main, Msg } from './cmps'

function App() {
   document.title = 'Vito | CRM'

   return (
      <div className="App">
         <Msg />
         <Dialogs />
         <Header />
         <Main />
      </div>
   )
}

export default App
