"use client";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import dayjs from "dayjs";
function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Thống kê</Title>
          <Paragraph className="lastweek">
            Dữ liệu được tính qua các năm
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>
              {<MinusOutlined />} {new Date().getFullYear()}
            </li>
            <li>
              {<MinusOutlined />} {new Date().getFullYear() - 1}
            </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
