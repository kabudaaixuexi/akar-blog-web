// 仅示例
import request from '@/utils/request'

export interface postRegisterReq {
    userName: string
    passWord: string
    nickName?: string
    photo: string
    extData?: object
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
    /** 注册 */
    postRegister: async (payload: postRegisterReq) => {
        const { data } = await request({
            url: '/user/register',
            data: { ...payload }
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
        const { data } = await request({
            url: '/user/modify',
            data: { ...payload }
        })
        return data
    }
}
