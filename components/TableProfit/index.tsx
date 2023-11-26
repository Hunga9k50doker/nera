"use client";
import React, { useState } from "react";
import { Tooltip, Space, Table } from "antd";
import { numberWithCommas, timeFormat } from "@/utils";
import dayjs from "dayjs";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getMonthlyProfitAction } from "@/actions";
import { toast } from "react-toastify";
function TableProfit({ profits = null, item = null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setpageData] = useState<any>(profits);
  const time = React.useMemo(() => {
    if (item) {
      const date = new Date(item);
      return {
        format: dayjs(date).format("MM/YYYY"),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    } else {
      return {
        format: dayjs(new Date()).format("MM/YYYY"),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      };
    }
  }, [item]);

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

  const dataSource = React.useMemo(() => {
    return pageData
      ? pageData.map((d: any, key: any) => ({
          key: key,
          time: timeFormat(d.created_at),
          profit: numberWithCommas(d.profit),
          profit_amount: numberWithCommas(d.profit_amount),
        }))
      : [];
  }, [pageData]);

  const getProfitMonth = React.useCallback(async () => {
    const data = await getMonthlyProfitAction({
      month: time.month,
      year: time.year,
    });
    if (data.status >= 300 && !data?.data) {
      return toast(data?.message, {
        type: data?.type,
      });
    } else {
      return setpageData(data.data.deals);
    }
  }, [time]);

  React.useEffect(() => {
    if (item) getProfitMonth();
  }, [getProfitMonth, item]);

  React.useEffect(() => {
    if (profits) setpageData(profits);
  }, [profits]);

  return (
    <Table
      style={{
        minHeight: 600,
      }}
      columns={columns}
      dataSource={dataSource}
    />
  );
}

export default React.memo(TableProfit);
