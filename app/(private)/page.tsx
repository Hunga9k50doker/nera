import React from "react";
import Home from "@/components/pages/Home";
import { getProfits } from "@/apis/finance.api";
import { notFound } from "next/navigation";
const Page = async () => {
  const profits = await getProfits()
    .then((r) => r.data)
    .catch((err) => err);
  if (!profits?.data) return notFound();
  return <Home profits={profits} />;
};

export default Page;
