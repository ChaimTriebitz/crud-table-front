import { useState } from 'react'

export const SelectRow = () => {
   const [value, setValue] = useState(false)

   return (
      <input
         className='select-row'
         type='checkbox'
         onChange={e => setValue(e.target.checked)}
         checked={value}
      />
   )
}
