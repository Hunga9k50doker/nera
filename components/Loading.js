import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = ({ title = "Đang tải dữ liệu" }) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 24 }} spin title={title} />
      }
    />
  );
};

export default Loading;
