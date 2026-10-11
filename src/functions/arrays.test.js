import { arrays } from './arrays'

describe('table array helpers', () => {
   test('filters text case-insensitively across selected fields', () => {
      const rows = [
         { bank: 'First Bank', contact: 'Ari Cohen' },
         { bank: 'Community Credit', contact: 'Miriam Levy' },
         { bank: 'North Bank', contact: 'David Green' }
      ]

      expect(arrays.filterObjects(rows, ['bank', 'contact'], 'ARI')).toEqual([
         { bank: 'First Bank', contact: 'Ari Cohen' }
      ])
   })

   test('treats an empty search as no filter', () => {
      const rows = [{ lender: 'Example Lender' }]
      expect(arrays.filterObjects(rows, ['lender'], '')).toEqual(rows)
   })

   test('handles missing and non-string field values safely', () => {
      const rows = [{ lender: null }, { lender: 123 }, { lender: 'Community' }]
      expect(arrays.filterObjects(rows, ['lender'], '123')).toEqual([{ lender: 123 }])
   })

   test('sorts ascending without mutating the original array', () => {
      const rows = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }]
      const sorted = arrays.sortBy(rows, 'name', 'asc')

      expect(sorted.map(row => row.name)).toEqual(['Alice', 'Bob', 'Charlie'])
      expect(rows.map(row => row.name)).toEqual(['Charlie', 'Alice', 'Bob'])
   })

   test('sorts descending', () => {
      const rows = [{ amount: 10 }, { amount: 30 }, { amount: 20 }]
      expect(arrays.sortBy(rows, 'amount', 'desc').map(row => row.amount)).toEqual([30, 20, 10])
   })
})
