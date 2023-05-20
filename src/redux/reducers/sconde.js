
/* 设备搜索按钮 */
const code = {
    mycode:""
  }
  export default function NewsStatus(preState = code, action){
    switch (action.type) {
      case 'getcodeData':
          return {mycode:action.payload}
      case 'changecode':
          return {mycode:action.payload}
      case "clearCode":
      return {mycode:""}    
      default:
        return preState
    }
  }