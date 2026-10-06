import React, { useEffect, useState } from 'react'

export const MultiSelect = ({ field = {}, value = [], handleChange = () => {}, options = [], disabled = false }) => {
   const [values, setValues] = useState(value || [])
   useEffect(() => { setValues(value || []) }, [value])
   useEffect(() => { if (!disabled) handleChange(field.internal_name, values) }, [values, disabled, field.internal_name])
   const handleCheckboxChange = (optionValue) => {
      if (disabled) return
      setValues(prev => prev.includes(optionValue) ? prev.filter(v => v !== optionValue) : [...prev, optionValue])
   }
   return (
      <div className='input-item multi-select'>
         {options.map(option => (
            <div key={option.id} className='multi-select-item'>
               <input type='checkbox' id={option.id} value={option.option_value} checked={values.includes(option.option_value)} onChange={() => handleCheckboxChange(option.option_value)} disabled={disabled} />
               <label htmlFor={option.id}>{option.option_display}</label>
            </div>
         ))}
      </div>
   )
}
