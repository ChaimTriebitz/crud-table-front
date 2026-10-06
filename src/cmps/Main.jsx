import { Navigate, Route, Routes } from 'react-router-dom'
import { Banks, Lenders } from '../pages'

export const Main = () => (
   <Routes>
      <Route path='/' element={<Navigate to='/banks' replace />} />
      <Route path='/banks' element={<Banks />} />
      <Route path='/lenders' element={<Lenders />} />
      <Route path='*' element={<Navigate to='/banks' replace />} />
   </Routes>
)
