// 仅示例
import request from '@/utils/request'

interface DepNew {
  formUid: number; // id
  formUserId: string; //
  groupId: string; //
  message: string; //
  msgId: number;
  msgType: number;
  sendTime: string;
  needFeedBack: boolean;
  sid: string
}

export default {
    /** 获取全部用户 */
    getNewsUserList: async () => {
        const { data } = await request.post(
          '/soc/getNewsUserList',{})
        return data
    },
    /** 获取全部沸点 */
    getForumAll: async () => {
      const { data } = await request.post(
        '/soc/getForumAll',{})
      return data
    },
    editForum: async (params) => {
      const { data } = await request.post(
        '/soc/editForum',{...params})
      return data
    },
    deleteForum: async (params) => {
      const { data } = await request.post(
        '/soc/deleteForum',{...params})
      return data
    },
}
