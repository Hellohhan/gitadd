/* 用户端 聊天模块 */
const newChat = {
    myChat:[]
  }
  export default function NewsStatus(preState = newChat, action){
    switch (action.type) {
      case 'getHistoryChat':
        return {myChat:action.historys}
      case 'getChat':
          return {myChat:[...preState.myChat,action.payload]}
      default:
        return preState
    }
  }
  