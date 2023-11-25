import { getUserDetail } from "@/apis/user.api";
import Auth from "@/components/pages/Auth";
export default async function Default() {
  const userData = await getUserDetail()
    .then((res) => res)
    .catch((err) => err);
  return <Auth userData={userData} />;
}
