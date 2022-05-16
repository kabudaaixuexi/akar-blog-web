import createStore from '@akar/proxy-property'

export default createStore({
  default: 'akar',
  myNoteList: [],
  allNoteList: [],
  allUserList: []
}, {
    usePersisted: true
})
