import soc from './soc'
import file from './file'
import noteApi from './note'
import userApi from './user'
import touchApi from './touch'
export default Object.assign(
    soc,
    file,
    noteApi,
    userApi,
    touchApi
)
