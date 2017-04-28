export default {
  basicForm: {},
  adminForms: [],
  categories: [],
  expectationForms: [],

  //职位列表
  jobList: {
    datas: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 20
    }
  },

  jobId: '',
  //匹配出的人的列表
  matchPeopleList: {
    datas: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 30
    }
  },

  //已收藏，已投递的那些列表页的人
  jobPeopleList: [],
  menuBadge: 0, //已收藏，已投递的那些列表页的更新回复数
  jobPeopleMore: true //列表页中能否滚动加载更多
};