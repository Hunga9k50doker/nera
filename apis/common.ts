import API from "@/apis/config";
import { common } from "@/apis/endpoint";

export const getPrivacy = (params?: any) => {
  return API(`${common.API_GET_PRIVACY}`, params);
};
export const getPrivacyDetail = (id: string) => {
  return API(`${common.API_GET_PRIVACY_DETAIL}${id}/`);
};
