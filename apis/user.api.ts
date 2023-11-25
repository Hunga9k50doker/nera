import API from "@/apis/config";
import { user } from "@/apis/endpoint";

export const checkUID = (params?: any) => {
  return API(user.API_USER_CHECK_USER, params, "", "POST");
};
export const login = (params?: any) => {
  return API(user.API_USER_LOGIN, params, "", "POST");
};
export const loginQr = (params?: any) => {
  return API(user.API_USER_LOGIN_QR, params, "", "POST");
};
export const logout = (params: any) => {
  return API(user.API_USER_LOGOUT, params, "", "POST");
};
export const getUserDetail = () => {
  return API(`${user.API_USER_DETAIL}`);
};
export const getBankAccount = () => {
  return API(`${user.API_USER_BANK_ACCOUNT}`);
};
export const registerFcmToken = (params: any) => {
  return API(`${user.API_USER_FCM_TOKEN}`, params, "", "POST");
};
export const changePassword = (params?: any) => {
  return API(`${user.API_USER_CHANGE_PASSWORD}`, params, "", "POST");
};
