
/* 我的 界面返回 */
const mySelf = {
    isNews:'TabMain'
  }
  export default function NewsStatus(preState = mySelf, action){
    switch (action.type) {
      case 'isTabMain':
          return {isNews:action.payload}
      case 'isTabNews':
        return {isNews:action.payload}
      default:
        return preState
    }
  }