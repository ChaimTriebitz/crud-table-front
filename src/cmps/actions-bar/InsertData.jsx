import React, { useState } from "react"
import * as XLSX from "xlsx"
import { strings } from '../../functions'
import { create } from '../../controllers/create'
import { useGlobalState } from '../../hooks'

export const InsertData = () => {
   const { page } = useGlobalState()
   const [data, setData] = useState([])



   const handleFileUpload = (e) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
         const binaryStr = event.target.result
         const workbook = XLSX.read(binaryStr, { type: "binary" })
         const sheetName = workbook.SheetNames[0]
         const worksheet = workbook.Sheets[sheetName]
         const jsonData = XLSX.utils.sheet_to_json(worksheet)
         setData(jsonData)
      }

      if (file) {
         reader.readAsBinaryString(file)
      }
   }

   const handleClick = () => {
      const t1 = data.map(obj => 
         Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [strings.toSnakeCase(key), value])
         )
      );

      const  t2 = t1.map(t=>({...t,type:t.type?.split(',')?.map(str => str?.trim())}))

      create.manyData(t2,page).catch(err => console.log(err))

      console.log(t2.map(t=>t.type));
      
   }

   return (
      <div>
         <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
         />
         <button className='btn by' onClick={handleClick}>Insert</button>
      </div>
   )
}

