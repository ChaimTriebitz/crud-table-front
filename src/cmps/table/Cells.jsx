import { Date, Remove, SelectRow, Text, Details, Actions, Phone, Email, Notes, Source } from '..'

export const Cells = ({ row, header }) => {
   switch (header.cell_type) {
      case 'remove': return <Remove row={row} header={header} />
      case 'details': return <Details row={row} header={header} />
      case 'select': return <SelectRow row={row} header={header} />
      case 'phone': return <Phone row={row} header={header} />
      case 'email': return <Email row={row} header={header} />
      case 'text': return <Text row={row} header={header} />
      case 'date': return <Date row={row} header={header} />
      case 'actions': return <Actions row={row} header={header} />
      case 'notes': return <Notes row={row} header={header} />
      case 'source': return <Source row={row} header={header} />
      default: return <Text row={row} header={header} />
   }
}
