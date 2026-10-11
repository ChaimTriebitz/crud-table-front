/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

/**
 * Runs an effect after the initial render.
 * @param {Function} callback
 * @param {Array} dependencies
 */
export function useUpdateEffect(callback, dependencies) {
   const firstRenderRef = useRef(true)

   // Dynamic dependencies are intentional for this custom hook; callers supply the list.
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
      if (firstRenderRef.current) {
         firstRenderRef.current = false
         return
      }
      return callback()
   }, dependencies)
}
