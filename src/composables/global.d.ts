// 博客内容
declare interface Blog {
  _id: string
  Title: string
  order: string
  Content: string
  Summary: string
  CreateDate: string
  ArticleTag: string
  ArticleCover: string
  CommentNum: number
  render: string
  TagName: string
  hits: number
  number: number
}

declare interface Document {
  documentMode?: any
  attachEvent?: any
}
declare interface Window {
  chrome: any
}
declare interface BlogTag {
  TagId: string
  TagName: string
  TagNo: string
  blogs: number
  __v: number
  _id: string
}
declare interface Comment {
  city: string
  commentNum: number
  content: string
  head: string
  publishdate: string
  thumbup: string
  userId: string
  __v: number
  _id: string
}

declare interface CommentF extends Comment {
  son: Comment[]
}
declare interface Wather {
  adcode: string
  casts: any[]
  city: string
  province: string
  reporttime: string
}
declare interface FriendLink {
  _id: string
  author_name: string
  author_link: string
  author_avatar: string
  author_descr: string
  author_siteshot: string
  __v: number
  type: string
}

declare interface TitleMessage {
  dom: any
  title: string
  indent: number
  height: number
}
