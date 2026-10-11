const BASE_URL = (process.env.REACT_APP_BASE_URL || '').replace(/\/+$/, '')
const apiUrl = (path) => `${BASE_URL}/api/${path}`

export const urls = {
   auth: {
      register: apiUrl('auth/register'),
      login: apiUrl('auth/login')
   },
   private: {
      get: apiUrl('private')
   },
   banks: {
      create: apiUrl('banks/create'),
      createMany: apiUrl('banks/createMany'),
      get: apiUrl('banks'),
      remove: apiUrl('banks/remove'),
      update: apiUrl('banks/update')
   },
   lenders: {
      create: apiUrl('lenders/create'),
      createMany: apiUrl('lenders/createMany'),
      get: apiUrl('lenders'),
      remove: apiUrl('lenders/remove'),
      update: apiUrl('lenders/update')
   }
}
