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
    }
}
