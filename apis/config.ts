import { user } from "./endpoint";
import { contentError } from "./error";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import queryString from "query-string";
import { toast } from "react-toastify";

const listApiNoneToken = [
  user.API_USER_CHECK_USER,
  user.API_USER_LOGIN,
  user.API_USER_LOGIN_QR,
];
export default async function fetchAPI(
  url: string,
  params = {},
  //@ts-ignore
  options: RequestInfo = {},
  method = "GET"
) {
  let message;
  const token = cookies().get("access_token")?.value || "";
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  const fullUrl = queryString.stringifyUrl({
    url: `${process.env.BASE_API_URL}${url}`,
    query: params,
  });
  try {
    if (!listApiNoneToken.includes(url || "") && !token)
      return Promise.reject({
        message: "Token is required",
        type: "warning",
        status: 401,
      });
    //update token header when api private
    if (!listApiNoneToken.includes(url || "") && token)
      headers.append("Authorization", `Bearer ${token}`);
    // console.log(fullUrl, url);

    const response = await fetch(fullUrl, {
      method: method,
      headers: headers,
      next: {
        tags: url,
      },
      body: method === "POST" ? JSON.stringify(params) : undefined,
      //@ts-ignore
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        message = {
          message: "Hết hạn đăng nhập, vui lòng đăng nhập lại!",
          type: "warning",
          status: response.status,
        };
        cookies().delete("access_token");
        cookies().delete("refresh_token");
        redirect("/sign-in");
      } else if (response.status >= 500 && response.status <= 600) {
        message = {
          message: contentError(response.statusText),
          type: "error",
          status: response.status,
        };
      } else {
        message = {
          message: response.statusText,
          type: "error",
          status: response.status,
        };
      }
      return Promise.reject(JSON.parse(JSON.stringify(message)));
    }
    const data = await response.json();
    if (data.status >= 300)
      return Promise.reject({
        ...data,
        type: "warning",
      });
    return Promise.resolve({
      ...data,
      type: "success",
    });
  } catch (error: any) {
    return error;
  }
}
