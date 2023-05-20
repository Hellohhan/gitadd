/* 消息组件 实现不同状态切换 */
const isiNews = {
  isNews:false
}
export default function NewsStatus(preState = isiNews, action){
  switch (action.type) {
    case 'NewsHeaderFalse':
        return {isNews:false}
    case 'NewsHeaderTrue':
      return {isNews:true}
    default:
      return preState
  }
}
