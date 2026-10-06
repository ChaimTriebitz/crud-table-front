export const Select = ({ field, options = [], value, handleChange, disabled = false }) => {
   const { name, internal_name, id, required = false } = field
   return (
      <select className='input-item' name={internal_name} id={id} onChange={(e) => handleChange(e.target.name, e.target.value)} value={value || ''} required={required} disabled={disabled}>
         <option value='' disabled>{name}</option>
         {options.map((option, optionIdx) => <option key={option.id || optionIdx} value={option.option_value || ''}>{option.option_display}</option>)}
      </select>
   )
}
