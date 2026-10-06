export const Notes = ({ header, row }) => (
   <div className='notes'>{row[header.internal_name] || row.notes || ''}</div>
)
