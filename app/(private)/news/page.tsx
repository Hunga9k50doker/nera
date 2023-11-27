import React from "react";
import News from "@/components/pages/News";
import { getNewDetail, getNews } from "@/apis/notification.api";
import { notFound } from "next/navigation";
const Page = async () => {
  let newDetail;
  const data = await getNews()
    .then((r) => r)
    .catch((err) => err);
  if (data.status === 200) {
    newDetail = await getNewDetail(data.data.data[0].id)
      .then((r) => r)
      .catch((err) => err);
  }
  if (!data?.data) return notFound();
  return <News data={data} intialNew={newDetail} />;
};

export default Page;
