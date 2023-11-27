"use client";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import React from "react";
function LineChart({ data }) {
  const { Title, Paragraph } = Typography;

  const dataSeries = React.useMemo(() => {
    const res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
      const exits = data.find(
        (e) => new Date(e.created_at).getMonth() - 1 === item
      );
      return exits ? exits.user_profit_deal : 0;
    });
    return res;
  });

  const dataSeriesPool = React.useMemo(() => {
    const res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
      const exits = data.find(
        (e) => new Date(e.created_at).getMonth() - 1 === item
      );
      return exits ? exits.pool_total_profit : 0;
    });
    return res;
  });

  const series = React.useMemo(
    () => [
      {
        name: "Lợi nhuận Pool",
        data: dataSeriesPool,
        offsetY: 0,
      },
      {
        name: "Lợi nhuận cá nhân",
        data: dataSeries,
        offsetY: 0,
      },
    ],
    [dataSeries]
  );
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Thống kê</Title>
          <Paragraph className="lastweek">
            Dữ liệu được chỉ tính trong năm {new Date().getFullYear()}
          </Paragraph>
        </div>
        {/* <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Lợi nhuận Pool</li>
            <li>{<MinusOutlined />} Lợi nhuận cá nhân</li>
          </ul>
        </div> */}
      </div>

      <ReactApexChart
        className="full-width"
        options={{ ...lineChart.options, series }}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default React.memo(LineChart);
