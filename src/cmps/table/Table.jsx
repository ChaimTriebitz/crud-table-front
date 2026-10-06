import React from 'react'
import { Cells } from './Cells'
import { useGlobalState } from '../../hooks'
import { SortHeader } from '..'

export const Table = ({ headers = [], rows = [] }) => {
   const { isDataLoading } = useGlobalState()

   return (
      <div className='table-container'>
         {isDataLoading && (
            <div className='table-loading' role='status' aria-label='Loading data'>
               <span className='loader' />
            </div>
         )}

         <table>
            <thead>
               <tr>
                  {headers.map((header) => (
                     <th key={header.name} scope='col'>
                        <div className='th-container'>
                           <p>{header.name}</p>
                           {header.sort_by && <SortHeader header={header} />}
                        </div>
                     </th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {rows.map((row, index) => (
                  <tr key={row._id || `row-${index}`}>
                     {headers.map((header) => (
                        <td key={header.name} className={header.cell_type}>
                           <span className='mobile-header'>{header.name}</span>
                           <Cells header={header} row={row} />
                        </td>
                     ))}
                  </tr>
               ))}

               {!rows.length && !isDataLoading && (
                  <tr>
                     <td className='no-match' colSpan={headers.length || 1}>
                        <div className='empty-state'>
                           <strong>No records found</strong>
                           <span>Try a different search or add a new record.</span>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   )
}
