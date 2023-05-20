/* 地图数据 */
const isFilter = {
   position:{
    longitude:0,
    latitude:0
   }
  }
  export default function mapPosition(preState = isFilter, action){
    switch (action.type) {
      case 'getposition':
          return {position:{longitude:action.data.longitude,latitude:action.data.latitude}}
      default:
        return preState
    }
  }