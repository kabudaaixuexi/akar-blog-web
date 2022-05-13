import common from './common'
import noteApi from './note'
import userApi from './user'
import touchApi from './touch'
export default Object.assign(
    common,
    noteApi,
    userApi,
    touchApi
)
