// import request from './request.js'
interface postCommentInterface {
  nickName: string
  email: string
  url: string
  text: string
  cid: string
  parentId?: string
}
interface postMessageInterface {
  nickName: string
  text: string
  parentId?: string
}
interface getCommentInterface {
  cid: string
  parentId?: string
}
interface getBlogsListInterface {
  tag?: string
  pageNum?: number
}
interface pagingInterface {
  Skip: number
  Limit: number
}
interface searchBlogInterface {
  text: string
}

const explore = {
  //文章列表
  getBlogsList(body: getBlogsListInterface) {
    return getFetchData({
      url: `/blogs/getBlogsList`,
      method: 'post',
      body: {
        body
      }
    })
  },
  //热门文章列表
  getHotList() {
    return getFetchData({
      url: `/blogs/getHotList`,
      method: 'post'
    })
  },
  getBlogsDetail(id: string) {
    console.log(id)

    return getFetchData({
      url: `/blogs/detail`,
      method: 'post',
      body: {
        id
      }
    })
  },
  // 点击量
  addLook(id: string) {
    return getFetchData({
      url: `/blogs/addLook`,
      method: 'post',
      body: {
        id
      }
    })
  },
  // 博文，评论，点击总数
  blogsSum() {
    return getFetchData({
      url: `/blogs/blogsSum`,
      method: 'post'
    })
  },
  // 发布评论 文章内
  postComment(comment: postCommentInterface) {
    return getFetchData({
      url: `/blogs/postComment`,
      method: 'post',
      body: comment
    })
  },
  // 获取评论 文章内
  getComment(comment: getCommentInterface) {
    return getFetchData({
      url: `/blogs/getComment`,
      method: 'post',
      body: comment
    })
  },
  // 发布评论
  postMessage(comment: postMessageInterface) {
    return getFetchData({
      url: `/comment/postComment`,
      method: 'post',
      body: comment
    })
  },
  // 留言
  getMessageList() {
    return getFetchData({
      url: `/comment/getCommentList`,
      method: 'post'
    })
  },
  // 留言 有层级
  getMessageListTiert(comment: pagingInterface) {
    return getFetchData({
      url: `/comment/getCommentListTier`,
      method: 'post',
      body: comment
    })
  },
  // 获取评论
  // getMessage(comment: postMessageInterface) {
  //   return request({
  //     url: `/comment/postComment`,
  //     method: 'post',
  //     data: comment
  //   })
  // },
  // 获取标签类型
  getTypeList() {
    return getFetchData({
      url: `/types/typeListHome`,
      method: 'post'
    })
  },
  // 模糊查询
  searchBlog(body: searchBlogInterface) {
    return getFetchData({
      url: `/blogs/searchBlog`,
      method: 'post',
      body
    })
  },
  // 随机文章
  getBlogsRandom() {
    return getFetchData({
      url: `/blogs/getBlogsRandom`,
      method: 'post'
    })
  }
}
export default explore
