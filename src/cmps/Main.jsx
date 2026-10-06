import { Route, Routes } from 'react-router-dom'
import { Banks, Lenders } from '../pages'

export const Main = () => (
   <Routes>
      <Route path='/banks' element={<Banks />} />
      <Route path='/lenders' element={<Lenders />} />
   </Routes>
)
