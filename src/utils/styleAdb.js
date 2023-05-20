/**
 * 屏幕工具类
 * ui设计基准
 * width:1080
 * height:1920
 */
import { Dimensions, PixelRatio } from 'react-native';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

let fontScale = PixelRatio.getFontScale();//返回字体大小缩放比例
let pixelRatio = PixelRatio.get();//返回设备的像素密度
// 设计图的宽高
const designWidth = 1080;
const designHeight = 1920;

// 根据dp获取屏幕的px
export let screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenWidth);
export let screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenHeight);

/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export function setText(size) {
  let scaleWidth = screenWidth / designWidth;
  let scaleHeight = screenHeight / designHeight;
  let scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round(size * scale/fontScale + 0.5);
  return size;
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export function setHeight(size) {
  let scaleHeight = (size / designHeight)* screenPxH;
  size = Math.round((scaleHeight / pixelRatio + 0.5));
  return size;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export function setWidth(size) {
  let scaleWidth = (size / designWidth)* screenPxW;
  size = Math.round((scaleWidth / pixelRatio + 0.5));
  return size;
}

export function px2DpW(size){
  return Math.round((size / designWidth)*screenWidth)
}

export function px2DpH(size){
  return Math.round((size / designHeight)*screenHeight)
}
