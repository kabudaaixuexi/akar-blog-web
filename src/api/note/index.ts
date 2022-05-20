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
    cover: string,
    tags?: any,
    drawe: number
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
    tags?: any
    drawe: number
}
export interface removeNoteReq {
    uid: string
    noteid: string
}
export default {
    /** 获取全部笔记列表 */
    getNoteListAll:async (payload) => {
        const { data } = await request.post(
          '/note/getNoteListAll',
          {
            ...payload
          }
        )
        return data
    },
    /**
     * 筛选发布的文章
     * type -- explain -- params -- resultType
     * 0 -- 某人发布的文章 -- {uid} -- []
     * 1 -- 某个分类的文章 -- {drawe} -- []
     * 2 -- 某一篇文章 -- {noteid} -- {}
     * 3 -- 某人点赞的文章 -- {uid} -- []
     * 4 -- 某人收藏的文章 -- {uid} -- []
     * 5 -- 某人浏览的文章 -- {uid} -- []
     * 6 -- 点赞量前二十 -- {} -- []
     * 7 -- 收藏量前二十 -- {} -- []
     * 8 -- 浏览量前二十 -- {} -- []
     * 9 -- 随机抽取二十篇文章 -- {} -- []
     */
    /** 获取发布的文章 */
    getNoteListPublished:async (payload) => {
      const { data } = await request.post(
        '/note/getNoteListPublished',
        {
          ...payload
        }
      )
      return data
    },
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
    editNote: async (payload:any) => {
        const { data } = await request.post(
          '/note/editNote',
          {
            ...payload
          }
        )
        return data
    },
    /** 笔记添加状态 */
    adornNote: async (payload:any) => {
      const { data } = await request.post(
        '/note/adornNote',
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
