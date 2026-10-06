export const arrays = {
   filterObjects,
   sortBy,
}

function filterObjects(data = [], fields = [], search = '') {
   const query = String(search).toLowerCase().trim()

   if (!query) return data

   return data.filter((item) =>
      fields.some((field) =>
         String(item[field] ?? '').toLowerCase().includes(query)
      )
   )
}

function sortBy(data = [], by = '', dir = '') {
   if (!by || !dir) return data

   return [...data].sort((a, b) => {
      const first = String(a[by] ?? '').toLowerCase()
      const second = String(b[by] ?? '').toLowerCase()

      if (first === second) return 0

      const result = first < second ? -1 : 1
      return dir === 'asc' ? result : -result
   })
}
