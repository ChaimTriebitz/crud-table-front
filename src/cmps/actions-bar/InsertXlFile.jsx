import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { strings } from '../../functions';
import { svgs } from '../../assets';

export const InsertXlFile = () => {
   const [data, setData] = useState([]);
   const imageRef = useRef(null)


   const handleFileUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
         const binaryStr = event.target.result;
         const workbook = XLSX.read(binaryStr, { type: "binary" });
         const sheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[sheetName];
         const jsonData = XLSX.utils.sheet_to_json(worksheet);
         setData(jsonData);
      };

      if (file) {
         reader.readAsBinaryString(file);
      }
   };


   return (
      <div className='insert-xl-file'>
         <button onClick={() => imageRef.current.click()} className={data ? 'filled' : ''}>
            <input
               type="file"
               accept=".xlsx, .xls"
               onChange={handleFileUpload}
               name='xlsx'
               ref={imageRef}
               hidden
            />
            {svgs.xlxs}
            <label>Upload New</label>
         </button>
      </div>
   );
}

