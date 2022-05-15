import request from '@/utils/request'
export interface getNoteListReq {
    uid: string // 用户id
}
export interface addNoteReq {
    uid: string
    subtitle: string
    vNode: any
    lock: boolean
    lockValue: string | number,
    published?: boolean,
    cover: string
}
export interface editNoteReq {
    uid: string
    subtitle: string
    noteid: string
    vNode: any
    lock: boolean
    lockValue: string | number
    published: boolean,
    cover: string
}
export interface removeNoteReq {
    uid: string
    noteid: string
}
export default {
    /** 获取笔记列表 */
    getNoteList:async (payload:getNoteListReq) => {
        const { data } = await request.post(
          '/note/getNoteList',
          {
            ...payload
          }
        )
        return data
    },
    /** 添加笔记 */
    addNote: async (payload:addNoteReq) => {
        const { data } = await request.post(
          '/note/addNote',
          {
            ...payload
          }
        )
        return data
    },
    /** 编辑笔记 */
    editNote: async (payload:editNoteReq) => {
        const { data } = await request.post(
          '/note/editNote',
          {
            ...payload
          }
        )
        return data
    },
    /** 删除笔记 */
    removeNote: async (payload:removeNoteReq) => {
        const { data } = await request.post(
          '/note/removeNote',
          {
            ...payload
          }
        )
        return data
    }
}
