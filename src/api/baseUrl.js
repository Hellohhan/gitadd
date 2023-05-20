/*
 * @Author: Hellohhan yj425hh@163.com
 * @Date: 2023-05-17 18:39:58
 * @LastEditors: Hellohhan yj425hh@163.com
 * @LastEditTime: 2023-05-18 08:51:24
 * @FilePath: \landssky517\src\api\baseUrl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * 发送网络请求的基本路径 （根据开发环境和生产环境自动切换）
 * */

//开发环境
const devPath = {
  /* 生产局域网 */
  // TOKEN_URL: 'http://192.168.0.16:8000/api/v3',
  // AUTH_TOKEN_URL: 'http://192.168.0.16:8000/api/v3/auth',
  // GATEWAY_URL: 'http://192.168.0.16:8000',
  // RTMP_URL: 'http://192.168.0.16:8000/api/v3',
  // DEVICE_URL: 'http://192.168.0.16:8000/api/v3',
  // POINT_URL: 'http://192.168.0.16:8000/api/v3',
  // SHOW_IMGS: 'http://192.168.0.16:8000/api/v3/manager/upload/file/show',
  // DOWNLOAD_APP:'http://192.168.0.16:8000/api/v3/manager/upload/file/app?file='

  /* 开发局域网 */
  TOKEN_URL: 'http://192.168.0.15:8300/auth',
  AUTH_TOKEN_URL: 'http://192.168.0.15:8300/auth',
  GATEWAY_URL: 'http://192.168.0.15:8000',
  RTMP_URL: 'http://192.168.0.15:8803',
  DEVICE_URL: 'http://192.168.0.15:8400',
  POINT_URL: 'http://192.168.0.16:8500',
  SHOW_IMGS: 'http://192.168.0.15:8400/manager/upload/file/show',

  //生产公网
  // TOKEN_URL: 'http://60.2.98.108:8888/api/v3',
  // AUTH_TOKEN_URL: 'http://60.2.98.108:8888/api/v3/auth',
  // GATEWAY_URL: 'http://60.2.98.108:8888',
  // RTMP_URL: 'http://60.2.98.108:8888/api/v3',
  // DEVICE_URL: 'http://60.2.98.108:8888/api/v3',
  // POINT_URL: 'http://60.2.98.108:8888/api/v3',
  // SHOW_IMGS: 'http://60.2.98.108:8888/api/v3/manager/upload/file/show',
  // DOWNLOAD_APP: 'http://60.2.98.108:8888/api/v3/manager/upload/file/app?file=',
};
//生产环境
const proPath = {
  TOKEN_URL: 'http://60.2.98.108:8888/api/v3',
  AUTH_TOKEN_URL: 'http://60.2.98.108:8888/api/v3/auth',
  GATEWAY_URL: 'http://60.2.98.108:8888',
  RTMP_URL: 'http://60.2.98.108:8888/api/v3',
  DEVICE_URL: 'http://60.2.98.108:8888/api/v3',
  POINT_URL: 'http://60.2.98.108:8888/api/v3',
  SHOW_IMGS: 'http://60.2.98.108:8888/api/v3/manager/upload/file/show',
  DOWNLOAD_APP: 'http://60.2.98.108:8888/api/v3/manager/upload/file/app?file=',
};
let baseUrl = {};
if (__DEV__) {
  //开发
  baseUrl = devPath;
} else {
  //生产
  baseUrl = proPath;
}
export default baseUrl;
