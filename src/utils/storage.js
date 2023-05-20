/*
* 持久化存储模块
* */
import AsyncStorage from '@react-native-async-storage/async-storage';
//默认存储大小 总:6M 每个小条目:2M
export const USER = 'user'


/**
 * 保存
 * @param value string
 * @returns {Promise<void>}
 */
export const saveStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log('持久化存储出错了',e);
  }
}
/**
 * 获取
 * @returns {Promise<void>}
 */
export const getStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch(e) {
    // error reading value
    console.log('获取持久化数据出错',e);
  }
}
/**
 * 删除
 *  @returns {Promise<void>}
 */
export const removeStorage = async (key) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch(e) {
    // error reading value
    console.log('获取持久化数据出错',e);
  }
}