import { useState } from 'react'
import { svgs } from '../../assets'
import { useDebounce, useGlobalState } from '../../hooks'
import { ACTIONS } from '../../state'

export const Search = () => {
   const { page, dispatch } = useGlobalState()
   const [value, setValue] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   useDebounce(() => {
      dispatch({ type: ACTIONS.SET, entity: 'search', payload: value.toLowerCase() })
      setIsLoading(false)
   }, 500, [value])

   const handleChange = (e) => {
      setValue(e.target.value)
      setIsLoading(true)
   }

   const clearSearch = () => {
      setValue('')
      setIsLoading(false)
   }

   return (
      <div className='search'>
         <span className='search-icon' aria-hidden='true'>
            {svgs.search}
         </span>

         <input
            id={`search-${page}`}
            value={value}
            onChange={handleChange}
            placeholder={`Search ${page}`}
            aria-label={`Search ${page}`}
         />

         {isLoading && <span className='search-loader' aria-hidden='true' />}

         {!isLoading && value && (
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
