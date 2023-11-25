import React from "react";
import Table from "@/components/pages/Tables";
import { getProfits } from "@/apis/finance.api";
const Page = async () => {
  const profits = await getProfits()
    .then((r) => r.data)
    .catch((err) => err);
  return <Table profits={profits} />;
};

export default Page;
