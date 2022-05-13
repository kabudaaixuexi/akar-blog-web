import axios from 'axios'
export default {
    /** 获取天气信息 */
    getWeather:async (payload: any) => {
		const { cityName = '杭州' } = payload
        const res = await axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${cityName}`, {
            params: {
            }
        })
        return {
            data: res.data?.data
        }
    }
}
