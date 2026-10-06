import React from 'react'
import { Cells } from './Cells'
import { useGlobalState } from '../../hooks';
import { SEARCH } from '../../data';
import { SortHeader } from '..';

export const Table = ({ headers = [], rows = [] }) => {

   const { isDataLoading } = useGlobalState()

   return (
      <div className="table-container">
         {isDataLoading && < div className='loader' id='sandwatchloader' />}

         <table>
            <thead>
               <tr>
                  {
                     headers.map(header =>
                        <th key={header.name}>
                           <div className="th-container">
                              <p>{header.name}</p>
                              {header.sort_by && <SortHeader header={header} />}
                           </div>
                        </th>
                     )
                  }
               </tr>
            </thead>
            <tbody>
               {
                  rows.map((row) => (
                     <tr key={row._id || Math.random()}>
                        {
                           headers.map((header) =>
                              <td key={header.name} className={header.cell_type}>
                                 <span className='mobile-header'>{header.name}</span>
                                 <Cells header={header} row={row} />
                              </td>
                           )
                        }

                     </tr>
                  ))
               }
               {
                  !rows.length &&
                  <tr>
                     <td
                        className='no-match'
                        colSpan={100}
                     >
                        No matches found
                     </td>
                  </tr>
               }
            </tbody>
         </table>
      </div>
   )
}
