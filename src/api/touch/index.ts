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
    },
    /** 获取属地信息 */
    getRegion:async (payload: any) => {
          const res = await axios.get(`http://pv.sohu.com/cityjson?ie=utf-8`, {
              params: {
              }
          })
          const info = res.data.substring(19, res.data.length - 1)
          return {
              data: {
                ip:  JSON.parse(info).cip,
                address: JSON.parse(info).cname
              }
          }
      }
}
