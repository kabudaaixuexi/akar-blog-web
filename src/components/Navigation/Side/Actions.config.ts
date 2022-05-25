
const getEntrances = (ident: string) => {
  const list = [
    {
      path: '/storage',
      explain: '文件中心',
      owners: ['user']
    },
    {
      path: '/project',
      explain: '创作中心',
      owners: ['user']
    },
    {
      path: '/common',
      explain: '社区文章',
      owners: ['user', 'tourist']
    },
    {
      path: '/notice/0',
      explain: '消息',
      owners: ['user']
    },
  ]
  return list.filter(item => !ident || item.owners.indexOf(ident) !== -1)
}

export {
  getEntrances
}
