import { useState } from 'react'
import { svgs } from '../../assets'
import { useDebounce, useGlobalState } from '../../hooks'
import { ACTIONS } from '../../state'

export const Search = () => {
   const { page, dispatch } = useGlobalState()
   const [isLoading, setIsLoading] = useState(false)
   const [value, setValue] = useState('')

   useDebounce(() => {
      dispatch({
         type: ACTIONS.SET,
         entity: 'search',
         payload: value.toLowerCase().trim(),
      })
      setIsLoading(false)
   }, 350, [value])

   const handleChange = (e) => {
      setIsLoading(true)
      setValue(e.target.value)
   }

   const clearSearch = () => {
      setValue('')
      setIsLoading(false)
   }

   return (
      <div className='search'>
         <span className='search-icon' aria-hidden='true'>
            {!isLoading && !value && svgs.search}
            {isLoading && <span className='search-loader' />}
         </span>

         <input
            id={`search-${page}`}
            value={value}
            onChange={handleChange}
            placeholder={`Search ${page}...`}
            aria-label={`Search ${page}`}
            autoComplete='off'
         />

         {value && !isLoading && (
            <button
               type='button'
               className='clear-search'
               onClick={clearSearch}
               aria-label='Clear search'
            >
               {svgs.clearBlack}
            </button>
         )}
      </div>
   )
}
