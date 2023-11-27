import { clearCookieAction } from "@/actions";
import { getNotifications } from "@/apis/notification.api";
import { getUserDetail } from "@/apis/user.api";
import Auth from "@/components/pages/Auth";
import Notification from "@/components/pages/Notification";
import { notFound, redirect } from "next/navigation";

export default async function Default() {
  const userData = await getUserDetail()
    .then((res) => res)
    .catch((err) => err);
  if (userData?.status === 401) {
    clearCookieAction();
    redirect("/sign-in");
  }
  const notification = await getNotifications()
    .then((res) => res)
    .catch((err) => err);
  if (!userData?.data) return notFound();
  return (
    <>
      <Auth userData={userData} />
      <Notification data={notification} shortView={true} />
    </>
  );
}
