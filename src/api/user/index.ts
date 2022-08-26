// 仅示例
import request from '@/utils/request'

export interface postRegisterReq {
    userName: string
    passWord: string
    photo: string
}
export interface postLoginReq {
    userName: any
    passWord: any
}
export default {
    /** 获取全部用户 */
    getUserList: async () => {
        const { data } = await request.post(
          '/user/getUserList',{})
        return data
    },
    /** 获取某个用户信息 */
    getUser: async (payload) => {
      const { data } = await request.post(
        '/user/getUser',{ ...payload })
      return data
  },
    /** 注册 */
    postRegister: async (payload: postRegisterReq) => {
        const { data } = await request.post(
          '/user/register',
        {
          ...payload,
          extData: JSON.stringify({})
        })
        return data
    },
    /** 登录 */
    postLogin: async (payload: postLoginReq) => {
        const { data } = await request.post(
            '/user/login',
            {
                ...payload
            }
        )
        return data
    },
    /** 修改账户信息 */
    postModify: async (payload: any) => {
        const { data } = await request.post(
          '/user/modify',
          {
            ...payload
          }
        )
        return data
    },
    /** 装饰账户信息 */
    postDecorate: async (payload: any) => {
      const { data } = await request.post(
        '/user/decorate',
        {
          ...payload
        }
      )
      return data
  }
}
