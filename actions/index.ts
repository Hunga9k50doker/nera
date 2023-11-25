"use server";
import { API_USER_DETAIL } from "@/apis/endpoint/user";
import { getMothlyDeals } from "@/apis/finance.api";
import { getNewDetail } from "@/apis/notification.api";
import { changePassword, login, logout } from "@/apis/user.api";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (formdata: any) => {
  const data = await login(formdata)
    .then((res) => res)
    .catch((err) => err);
  cookies().set("access_token", data.data.access_token);
  cookies().set("refresh_token", data.data.refresh_token);
  revalidateTag(API_USER_DETAIL);
  revalidatePath("/");
  redirect("/");
};

export const logoutAction = async () => {
  const data = await logout({
    access_token: cookies().get("access_token"),
    refresh_token: cookies().get("refresh_token"),
  })
    .then((res) => {
      //    cookies().delete("access_token");
      // cookies().delete("refresh_token")
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

export const updatePasswordAcction = async (formdata: any) => {
  const data = await changePassword(formdata)
    .then((res) => res)
    .catch((err) => err);
  return data;
};
