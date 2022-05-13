import request from '@/utils/request'
export default {
    /** 添加文件夹 */
    setPortfolio:async (payload: any) => {
        const { data } = await request({
            url: '/upload/setPortfolio',
            data: {...payload}
        })
        return data
    },
    /** 获取目录下文件夹 */
	getPortfolio:async (payload: any) => {
        const { data } = await request({
            url: '/upload/getPortfolio',
            data: {...payload}
        })
        return data
    },
    /** 删除目录下文件夹 */
	delPortfolio:async (payload: any) => {
        const { data } = await request({
            url: '/upload/delPortfolio',
            data: {...payload}
        })
        return data
    },
    /** 添加文件 */
	setPackages:async (payload: any) => {
        const { data } = await request({
            url: '/upload/setPackages',
            data: {...payload}
        })
        return data
    },
    /** 获取目录下文件 */
	getPackages:async (payload: any) => {
		console.log(payload);

        const { data } = await request({
            url: '/upload/getPackages',
            data: {...payload}
        })
        return data
    },
    /** 删除文件 */
	delPackages:async (payload: any) => {
        const { data } = await request({
            url: '/upload/delPackages',
            data: {...payload}
        })
        return data
    }
}
