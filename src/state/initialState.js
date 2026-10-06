export const initialState = {
   refreshCount: 0,
   isDataLoading: true,
   serverConnected: false,
   page: 'banks',
   loggedInUser: null,
   dialogs: {},
   selectedIds: [],
   filters: {
      category: '',
   },
   banks: [],
   lenders: [],
   search: '',
   sort: {
      by: '',
      dir: 'asc'
   }
}
