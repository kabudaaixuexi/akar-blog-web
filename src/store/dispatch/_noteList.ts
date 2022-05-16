import Store from '@/store'
import { cloneDeep } from 'lodash'
/**
 * 筛选文章
 * type -- explain -- params -- resultType
 * 0 -- 某一篇文章 -- {noteid} -- {}
 * 1 -- 某个分类的文章 -- {drawe} -- []
 * 2 -- 已发布的文章 -- {} -- []
 * 3 -- 某人点赞的文章 -- {uid} -- []
 * 4 -- 某人收藏的文章 -- {uid} -- []
 * 5 -- 某人浏览的文章 -- {uid} -- []
 * 6 -- 点赞量前二十 -- {} -- []
 * 7 -- 收藏量前二十 -- {} -- []
 * 8 -- 浏览量前二十 -- {} -- []
 * 9 -- 随机抽取二十篇文章 -- {} -- []
 */
export default (p) => {
  const list: any = Store.getState('allNoteList')
  if(!p) {
    return list
  }
  const { type = 1, payload = {} } = p
  const pulishList = cloneDeep(list.filter(ev => !!ev.published))
  let result: any = []
  switch (type) {
    case 0:
      result = list.find((ev) => ev.noteid == payload.noteId) || {};
      break;
    case 1:
      result = pulishList.filter(ev => ev.drawe == payload.drawe)
      break;
    case 2:
      result = pulishList
      break;
    case 3:
      result = pulishList.filter(ev => {
        const stars = ev.extData?.star || []
        return stars.incluse(payload.uid)
      });
      break;
    case 4:
      result = pulishList.filter(ev => {
        const takes = ev.extData?.take || []
        return takes.incluse(payload.uid)
      });
      break;
    case 5:
      result = pulishList.filter(ev => {
        const skims = ev.extData?.skim || []
        return skims.incluse(payload.uid)
      });
      break;
    case 6:
      result = pulishList.sort((a, b) => {
        (b.extData?.star || []).length - (a.extData?.star || []).length
      }).slice(0, 20)
      break;
    case 7:
      result = pulishList.sort((a, b) => {
        (b.extData?.take || []).length - (a.extData?.take || []).length
      }).slice(0, 20)
      break;
    case 8:
      result = pulishList.sort((a, b) => {
        (b.extData?.skim || []).length - (a.extData?.skim || []).length
      }).slice(0, 20)
      break;
    case 9:
      result = getRandomArrayElements(pulishList, 20)
      break;
  }
  return result
}



function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
