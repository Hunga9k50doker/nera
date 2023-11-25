import React from "react";
import Home from "@/components/pages/Home";
import { getProfits } from "@/apis/finance.api";
const Page = async () => {
  const profits = await getProfits()
    .then((r) => r.data)
    .catch((err) => err);
  return <Home profits={profits} />;
};

export default Page;
