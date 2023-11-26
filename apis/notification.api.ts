import API from "@/apis/config";
import { nofication } from "@/apis/endpoint";

export const getNotifications = (params?: any) => {
  return API(`${nofication.API_GET_NOTIFICATIONS}`, params);
};
export const getNotificationDetail = (id: string) => {
  return API(`${nofication.API_GET_NOTIFICATION_DETAIL}${id}/`);
};
export const getNews = (params?: any) => {
  return API(`${nofication.API_GET_NEWS}`, params);
};
export const getNewDetail = (id: string) => {
  return API(`${nofication.API_GET_NEW_DETAIL}${id}/`);
};
