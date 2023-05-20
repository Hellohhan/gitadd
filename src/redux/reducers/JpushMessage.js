/* 用于接收 推送过来的消息 */
const data = {
    JpushMessage: []
  }
  export default function NewsStatus(preState = data, action) {
    switch (action.type) {
      case 'getJpush':
        // 检查消息是否已经存在
        const exists = preState.JpushMessage.some(
          message => message.content === action.payload.content
        )
  
        // 不存在添加 
        if (!exists) {
          return {
            JpushMessage: [...preState.JpushMessage, action.payload]
          }
        }
        // 存在不添加
        return preState
        
        case 'deleteMessae':
          const filteredMessages = preState.JpushMessage.filter(
            message => message.content !== action.payload
          )
          return {JpushMessage: filteredMessages}
      default:
        return preState
    }
  
  }