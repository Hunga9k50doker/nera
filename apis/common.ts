import API from "@/apis/config";
import { common } from "@/apis/endpoint";

export const getPrivacy = (url?: string, params?: any) => {
  return API(url || `${common.API_GET_PRIVACY}`, params);
};
export const getPrivacyDetail = (id: string) => {
  return API(`${common.API_GET_PRIVACY_DETAIL}${id}/`);
};
