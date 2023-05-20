/* 判断筛选页面是否弹出 */

const isFilter = {
    Filter:false
  }
  export default function NewsStatus(preState = isFilter, action){
    switch (action.type) {
      case 'changeFilter':
          return {Filter:!preState.Filter}
    //   case '':
    //     return {isNews:true}
      default:
        return preState
    }
  }
  

//   isFilters