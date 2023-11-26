import numeral from "numeral";
import dayjs from "./dayjs";

export const formatDefault = (amount: any) => {
  let textResult = ``;
  try {
    if (isNaN(parseFloat(amount))) {
      textResult += numeral(parseFloat(amount.replace(",", ""))).format(
        "0,0.00"
      );
    } else {
      textResult += numeral(parseFloat(amount)).format("0,0.00");
    }
  } catch (e) {
    console.log(e);
  }
  return textResult;
};

export const numberWithCommas = (num: number) =>
  num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const totalRaised = (data: any[]) => {
  return data.reduce((pre, cur) => pre + cur.amounts.amount, 0);
};

export const timeFormat = (time: any, showHrs?: boolean) => {
  return dayjs(time).format(`DD/MM/YYYY ${showHrs ? "HH:mm" : ""}`);
};

export const calcularRoi = (val1: number, val2: number) => {
  if (val1 > val2) return 0;
  const roi = ((val2 - val1) / val1) * 100;
  return roi.toFixed(1);
};

export const isEmailValid = (email: string): boolean => {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const getFromNowShort = (
  datetimeStr: any,
  showSuffix?: boolean,
  exact?: boolean
) => {
  const strings = {
    prefixAgo: "",
    prefixFromNow: null,
    suffixAgo: "",
    suffixFromNow: "",
    seconds: "mới đây",
    minute: "1 phút",
    minutes: "%d phút",
    hour: "1 giờ",
    hours: "%d giờ",
    day: "1 ngày",
    days: "%d ngày",
    month: "1 tháng",
    months: "%d tháng",
    year: "1 năm",
    years: "%d năm",
    wordSeparator: " ",
  };
  if (showSuffix) {
    strings.suffixAgo = "trước";
    strings.suffixFromNow = "trước";
  }
  if (exact) return dayjs(datetimeStr).format("DD/MM/YYYY");
  const timeAgo = dayjs(datetimeStr).fromNow();
  return timeAgo;
};
