import Store from '@/store'
import Api from '@/api'

const initialStore = async () => {
  const { data } = await Api.getNoteListAll({});
  Store.setState(data, "allNoteList");
}
export default initialStore
