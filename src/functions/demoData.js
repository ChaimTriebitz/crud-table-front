const STORAGE_KEY = 'vito-demo-changes'

function readChanges() {
   try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function writeChanges(changes) { localStorage.setItem(STORAGE_KEY, JSON.stringify(changes)) }

export function applyDemoChanges(page, rows) {
   const changes = readChanges()[page]
   if (!changes) return rows
   const removed = new Set(changes.removed || [])
   const updated = changes.updated || {}
   const added = changes.added || []

   return [
      ...rows.filter(row => !removed.has(row._id)).map(row => updated[row._id] ? { ...row, ...updated[row._id] } : row),
      ...added.map(row => ({ ...row, _source: 'local', _canEdit: true })),
   ]
}
export function recordDemoCreate(page, row) {
   const changes = readChanges()
   const pageChanges = changes[page] || { added: [], updated: {}, removed: [] }
   pageChanges.added = [...(pageChanges.added || []), { ...row, _source: 'local' }]
   changes[page] = pageChanges
   writeChanges(changes)
}
export function recordDemoUpdate(page, id, values) {
   const changes = readChanges()
   const pageChanges = changes[page] || { added: [], updated: {}, removed: [] }
   const addedIndex = (pageChanges.added || []).findIndex(row => row._id === id)
   if (addedIndex !== -1) pageChanges.added[addedIndex] = { ...pageChanges.added[addedIndex], ...values, _source: 'local' }
   else pageChanges.updated = { ...(pageChanges.updated || {}), [id]: { ...(pageChanges.updated?.[id] || {}), ...values } }
   changes[page] = pageChanges
   writeChanges(changes)
}
export function recordDemoRemove(page, id) {
   const changes = readChanges()
   const pageChanges = changes[page] || { added: [], updated: {}, removed: [] }
   pageChanges.added = (pageChanges.added || []).filter(row => row._id !== id)
   if (pageChanges.updated) delete pageChanges.updated[id]
   if (!pageChanges.removed.includes(id)) pageChanges.removed = [...pageChanges.removed, id]
   changes[page] = pageChanges
   writeChanges(changes)
}
export function getDemoChangeCount() {
   const changes = readChanges()
   return Object.values(changes).reduce((total, page) => total + (page.added?.length || 0) + Object.keys(page.updated || {}).length + (page.removed?.length || 0), 0)
}
