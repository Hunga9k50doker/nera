import API from "@/apis/config";
import { finance } from "@/apis/endpoint";
export const getProfits = (url?: string, params?: any) => {
  return API(url || finance.API_PROFITS, params);
};
export const getMothlyDeals = (params?: any) => {
  return API(finance.API_MONTHLY_DEALS, params);
};
