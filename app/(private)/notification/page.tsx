import React from "react";
import Notification from "@/components/pages/Notification";
import {
  getNotificationDetail,
  getNotifications,
} from "@/apis/notification.api";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  let newDetail;
  const { id } = searchParams;
  const notification = await getNotifications()
    .then((res) => res)
    .catch((err) => err);
  if (notification?.status === 401) {
    redirect("/error/401");
  }
  if (notification.status === 200) {
    newDetail = await getNotificationDetail(id || notification.data.data[0].id)
      .then((r) => r)
      .catch((err) => err);
  }
  return <Notification data={notification} intialNew={newDetail} />;
};

export default Page;
