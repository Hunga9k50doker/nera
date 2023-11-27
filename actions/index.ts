"use server";
import { getPrivacy, getPrivacyDetail } from "@/apis/common";
import { API_USER_DETAIL } from "@/apis/endpoint/user";
import { getMothlyDeals } from "@/apis/finance.api";
import {
  getNewDetail,
  getNews,
  getNotificationDetail,
  getNotifications,
} from "@/apis/notification.api";
import { changePassword, login, logout } from "@/apis/user.api";
import { cookies } from "next/headers";

export const loginAction = async (formdata: any) => {
  const data = await login(formdata)
    .then((res) => {
      cookies().set("access_token", res.data.access_token);
      cookies().set("refresh_token", res.data.refresh_token);
      return res;
    })
    .catch((err) => err);
  return data;
};

export const clearCookieAction = async () => {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
};

export const logoutAction = async () => {
  const data = await logout({
    access_token: cookies().get("access_token")?.value,
    refresh_token: cookies().get("refresh_token")?.value,
  })
    .then((res) => {
      clearCookieAction();
      return res;
    })
    .catch((err) => err);
  return data;
};

export const getMonthlyProfitAction = async (prs: any) => {
  const data = await getMothlyDeals(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const getNewDetailAction = async (prs: any) => {
  const data = await getNewDetail(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const getNewsAction = async (prs: any) => {
  const data = await getNews(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const getNotificationDetailAction = async (prs: any) => {
  const data = await getNotificationDetail(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const getNotificationAction = async (prs: any) => {
  const data = await getNotifications(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const getPrivacyAction = async (prs?: any) => {
  const data = await getPrivacy(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const getPrivacyDetailAction = async (prs: any) => {
  const data = await getPrivacyDetail(prs)
    .then((r) => r)
    .catch((err) => err);
  return data;
};

export const updatePasswordAcction = async (formdata: any) => {
  const data = await changePassword(formdata)
    .then((res) => res)
    .catch((err) => err);
  return data;
};
