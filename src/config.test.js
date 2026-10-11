import { urls } from './config'

describe('API URL configuration', () => {
   test('uses consistent API paths for bulk inserts', () => {
      expect(urls.banks.createMany).toMatch(/\/api\/banks\/createMany$/)
      expect(urls.lenders.createMany).toMatch(/\/api\/lenders\/createMany$/)
   })

   test('does not duplicate the API path', () => {
      Object.values(urls).forEach(group => {
         Object.values(group).forEach(url => {
            expect(url).not.toContain('/api/api/')
         })
      })
   })
})
