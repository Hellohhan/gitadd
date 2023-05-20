/*
* action的user模块
* */
import {  LOGIN_SUCCESS } from "../constant";
import axios from "../../api";
import { GETUSERINFO, TOKENCHECK, TOKENGENERATE, TOKENSALT,newsPush } from "../../api/requestPath";
import md5 from "blueimp-md5";
import { saveStorage, USER } from "../../utils/storage";
import JPush from 'jpush-react-native';
export const loginSuccess = (userInfo) => ({ type: LOGIN_SUCCESS, data: userInfo });

export const asyncLogin = (user) => {
  //1.前端校验
  let { username, password } = user;
  if (!username.trim() || !password.trim()) {
    return async () => {
      throw "用户名或者密码不能为空！";
    };
  }
  return dispatch => {
    return new Promise(async (resolve, reject) => {
       try {
         //获取盐
         let result = await axios.get(TOKENSALT, { params: { username } });
         //获取令牌
         password = md5(md5(password) + result.data);
         result = await axios.post(TOKENGENERATE, { name: username, password });
         const token = result.data;
         //验证令牌
         result = await axios.get(TOKENCHECK, { params: { username, token } });
         if (result.ok) {
           //登录成功
           result = await axios.get(GETUSERINFO.replace(":username", username), {
             headers: {
               "x-auth-user": username,
               "x-auth-token": token,
             },
           });
           if (result.ok) {
             const { id, groupId, imToUser, imUserType } = result.data;
             let userInfo = {
               id,
               groupId,
               imToUser,
               imUserType,
               username,
               token,
             };
             //持久化保存(异步)
             await saveStorage(USER, JSON.stringify(userInfo));
             //注册消息推送
             //将用户信息存入redux
             dispatch(loginSuccess(userInfo));
             resolve()



              // 注册消息推送
             const __PROD__ = true;
              if(__PROD__){
              let cid
             JPush.getRegistrationID((registrationID) => {
               cid=registrationID
               console.log(cid.registerID);
             });
             const News=await newsPush(userInfo.id, cid)
             //将用户信息存入redux
             dispatch(loginSuccess(userInfo));
             resolve()
           }
           }
         }
       }catch (e) {
         console.log(e);
         reject("登录失败请重新尝试,或联系管理员!")
       }
    });
  };
};
