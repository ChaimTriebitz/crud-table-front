import { Input, MultiSelect, Select, Textarea } from '../../cmps'

export const Inputs = ({ field = {}, value, options = [], handleChange = () => {}, handleBlur = () => {}, disabled = false }) => {
   const { internal_name, name, element_type, className } = field
   return (
      <div className={`input-field ${className || ''}`}>
         <label htmlFor={internal_name}>{name}</label>
         {element_type === 'input' && <Input field={field} value={value} handleBlur={handleBlur} handleChange={handleChange} disabled={disabled} />}
         {element_type === 'textarea' && <Textarea field={field} value={value} handleBlur={handleBlur} handleChange={handleChange} disabled={disabled} />}
         {element_type === 'select' && <Select field={field} value={value} options={options} handleChange={handleChange} disabled={disabled} />}
         {element_type === 'multi_select' && <MultiSelect field={field} value={value} handleChange={handleChange} options={options} disabled={disabled} />}
      </div>
   )
}
