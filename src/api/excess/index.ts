// 仅示例
import request from '@/utils/request'

export default {
    /** 获取轮播图 */
    getWalkCharts: async () => {
        const { data } = await request.post(
          '/excess/getWalkCharts',{})
        return data
    },
}
