export const Source = ({ row }) => (
   <span className={`row-source ${row._source === 'local' ? 'local' : 'database'}`}>
      {row._source === 'local' ? 'LOCAL' : 'DB'}
   </span>
)
