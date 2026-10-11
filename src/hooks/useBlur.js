import { useEffect, useRef } from 'react'

export function useBlur(callback, element) {
   const ref = useRef(null)

   useEffect(() => {
      const handleBlur = (event) => {
         if (event.target.localName === element) callback()
      }

      document.addEventListener('mousedown', handleBlur)
      return () => document.removeEventListener('mousedown', handleBlur)
   }, [callback, element])

   return ref
}
