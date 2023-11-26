import { getNotifications } from "@/apis/notification.api";
import { getUserDetail } from "@/apis/user.api";
import Auth from "@/components/pages/Auth";
import Notification from "@/components/pages/Notification";

export default async function Default() {
  const userData = await getUserDetail()
    .then((res) => res)
    .catch((err) => err);
  const notification = await getNotifications()
    .then((res) => res)
    .catch((err) => err);
  return (
    <>
      <Auth userData={userData} />
      <Notification data={notification} shortView={true} />
    </>
  );
}
