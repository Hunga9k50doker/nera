"use client";
import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Button,
  Timeline,
  Space,
} from "antd";
import TableProfit from "@/components/TableProfit";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import { numberWithCommas, formatDefault, timeFormat } from "@/utils";
import dayjs from "dayjs";
import { InfoCircleOutlined } from "@ant-design/icons";

const Echart = dynamic(() => import("@/components/chart/EChart"), {
  ssr: false,
});
const LineChart = dynamic(() => import("@/components/chart/LineChart"), {
  ssr: false,
});

function Home({ profits }) {
  const { Title, Text, Paragraph } = Typography;
  const { user } = useContext(MainContext);

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const count = React.useMemo(
    () => [
      {
        today: "Số dư",
        title: numberWithCommas(user.user.total_money),
        persent: `~ ${formatDefault(user.user.ticket_percent * 100)}%`,
        icon: dollor,
        bnb: "bnb2",
      },
      {
        today: "Lợi nhuận tháng",
        title: numberWithCommas(user.user_profit),
        persent: "VND",
        icon: dollor,
        bnb: "bnb2",
      },
      {
        today: "Tổng pool",
        title: numberWithCommas(user.pool.total_money),
        persent: "VND",
        icon: dollor,
        bnb: "bnb2",
      },
      {
        today: "Lợi nhuận pool",
        title: numberWithCommas(user.month_profit),
        persent: `VND`,
        icon: dollor,
        bnb: "bnb2",
      },
    ],
    [user]
  );

  const timelineList = React.useMemo(
    () =>
      Boolean(profits?.data?.length)
        ? profits.data.map((profit) => ({
            children: (
              <>
                <Title level={5}>
                  Tháng {dayjs(new Date(profit.created_at)).format("MM/YYYY")}
                </Title>
                <Space direction="vertical">
                  <Text>
                    Lợi nhuận pool: {numberWithCommas(profit.pool_total_profit)}
                  </Text>
                  <Text>
                    % Pool nắm giữ:&nbsp;
                    {formatDefault(profit.user_ticket_percent * 100)}%
                  </Text>
                  <Space>
                    <Text type="success">Lợi nhuận:</Text>
                    <Text strong type="success">
                      {numberWithCommas(profit.user_profit_deal)}
                    </Text>
                  </Space>
                </Space>
              </>
            ),
            color: "green",
          }))
        : [],
    [profits]
  );

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: (
        <Space>
          Lợi nhuận
          <Tooltip title="Lợi nhuận tháng">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "profit",
      key: "profit",
    },
    {
      title: (
        <Space>
          Tổng dư lãi
          <Tooltip title="Lợi nhuận lợi nhuận dược tính dựa trên lợi nhuận các deal trước đó và deal hiện tại trong cùng một tháng">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "profit_amount",
      key: "profit_amonut",
    },
  ];

  return (
    <div>
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {count.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>{c.today}</span>
                    <Title level={5}>
                      {c.title} <small className={c.bnb}>{c.persent}</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box flex justify-center items-center">
                      {c.icon}
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <Echart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <LineChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
          <Card bordered={false} className="criclebox cardbody h-full">
            <div className="project-ant">
              <div>
                <Title level={5}>Thống kê</Title>
                <Paragraph className="lastweek">
                  Tháng {dayjs(new Date()).format("MM/YYYY")}
                </Paragraph>
              </div>
            </div>
            <div className="ant-list-box table-responsive">
              <TableProfit profits={user.deals} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <div className="timeline-box">
              <Title level={5}>Lịch sử</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                Thống kê lợi nhuận các tháng
              </Paragraph>
              <Timeline
                className="timelinelist"
                items={timelineList}
              ></Timeline>
              {profits?.data ? (
                <Link href="/history">
                  <Button type="primary" className="width-100">
                    Xem thêm
                  </Button>
                </Link>
              ) : (
                <Paragraph>Chưa có dữ liệu</Paragraph>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(Home);
