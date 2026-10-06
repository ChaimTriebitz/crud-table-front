import { ACTIONS } from './actions';

export const reducer = (state, action) => {
   switch (action.type) {
      case ACTIONS.REFRESH_DATA:
         return { ...state, refreshCount: state.refreshCount + 1, }
      case ACTIONS.SET:
         return { ...state, [action.entity]: action.payload }
      case ACTIONS.OPEN_DIALOG:
         return { ...state, dialogs: { ...state.dialogs, [action.entity]: { ...action.payload, isOpen: true } } }
      case ACTIONS.CLOSE_DIALOG:
         return { ...state, dialogs: { ...state.dialogs, [action.entity]: { isOpen: false } } }
      case ACTIONS.PUSH:
         return { ...state, [action.entity]: [...state[action.entity], ...action.payload] }
      case ACTIONS.POP:
         return { ...state, [action.entity]: state[action.entity]?.filter((id) => !action.payload.includes(id)) }
      case ACTIONS.LOCAL_CREATE:
         return {
            ...state,
            [action.entity]: [...(state[action.entity] || []), action.payload],
         }
      case ACTIONS.LOCAL_UPDATE:
         return {
            ...state,
            [action.entity]: (state[action.entity] || []).map(row =>
               row._id === action.payload.id
                  ? { ...row, ...action.payload.values }
                  : row
            ),
         }
      case ACTIONS.LOCAL_REMOVE:
         return {
            ...state,
            [action.entity]: (state[action.entity] || []).filter(row => row._id !== action.payload),
         }
      default:
         return state
   }
};
