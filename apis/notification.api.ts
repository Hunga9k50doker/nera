import API from "@/apis/config";
import { nofication } from "@/apis/endpoint";

export const getNotifications = (url?: string, params?: any) => {
  return API(url || `${nofication.API_GET_NOTIFICATIONS}`, params);
};
export const getNotificationDetail = (id: string) => {
  return API(`${nofication.API_GET_NOTIFICATION_DETAIL}${id}/`);
};
export const getNews = (url?: string, params?: any) => {
  return API(url || `${nofication.API_GET_NEWS}`, params);
};
export const getNewDetail = (id: string) => {
  return API(`${nofication.API_GET_NEW_DETAIL}${id}/`);
};
