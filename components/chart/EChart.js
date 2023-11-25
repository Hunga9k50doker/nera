"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography, Space } from "antd";
import eChart from "./configs/eChart";
import dayjs from "dayjs";
import { MainContext } from "@/context/MainContext";
import { formatDefault, numberWithCommas } from "@/utils";
function EChart() {
  const { Title, Paragraph } = Typography;
  const { user } = React.useContext(MainContext);
  const items = React.useMemo(
    () => [
      {
        Title: user.deals.length,
        user: "Số deal đã hoàn thành",
      },
      {
        Title: numberWithCommas(user.month_profit),
        user: "Lợi nhuận Pool",
      },
      {
        Title: numberWithCommas(user.user_profit),
        user: "Lợi nhuận",
      },
    ],
    [user]
  );

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Lợi nhuận </Title>
        <Paragraph className="lastweek">
          Tháng {dayjs(new Date()).format("MM/YYYY")}{" "}
          <span className="bnb2">
            +{formatDefault(user.user.ticket_percent * 100)}%
          </span>
        </Paragraph>
        <Paragraph className="lastweek">
          Dữ liệu chỉ được tính trong tháng hiện tại
        </Paragraph>
        <Row gutter justify={"space-between"}>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={5}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
