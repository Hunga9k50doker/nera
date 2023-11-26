"use client";
import React from "react";
import { Row, Col, Card, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useModalContext } from "@/context/ModalContext";
import { formatDefault, numberWithCommas } from "@/utils";
import ModalDetail from "@/components/modal/ModalDetail";
import TableProfit from "@/components/TableProfit";
const { Text } = Typography;

// table code start
const columns = [
  {
    title: "Tháng",
    dataIndex: "time",
    key: "time",
    width: "32%",
  },
  {
    title: "% Pool nắm giữ",
    dataIndex: "pool_percent",
    key: "pool_percent",
  },

  {
    title: "Lợi nhuận pool",
    key: "profit",
    dataIndex: "profit",
  },
  {
    title: "Lợi nhuận",
    key: "profit_user",
    dataIndex: "profit_user",
  },
  {
    title: "",
    key: "detail",
    dataIndex: "detail",
  },
];

function Tables({ profits = null }: any) {
  const { showModal } = useModalContext();
  const [itemSelected, setItemSelected] = React.useState();
  const modalId = "modal-detail";
  const onViewDetail = (data: any) => {
    setItemSelected(data);
    showModal(modalId);
  };

  const data = React.useMemo(
    () =>
      Boolean(profits?.data?.length)
        ? profits.data.map((profit: any, key: any) => ({
            key: key,
            time: (
              <div className="semibold">
                {dayjs(new Date(profit.created_at)).format("MM/YYYY")}
              </div>
            ),
            pool_percent: (
              <>
                <div className="semibold">
                  {formatDefault(profit.user_ticket_percent * 100)}
                </div>
              </>
            ),
            profit: (
              <>
                <div className="semibold">
                  {numberWithCommas(profit.pool_total_profit)}
                </div>
              </>
            ),
            profit_user: (
              <div className="semibold">
                {numberWithCommas(profit.user_profit_deal)}
              </div>
            ),
            detail: (
              <Text
                onClick={() => onViewDetail(profit.created_at)}
                className="semibold text-blue"
                type="success"
                style={{
                  cursor: "pointer",
                }}
              >
                chi tiết
              </Text>
            ),
          }))
        : [],
    [profits]
  );

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Lịch sử lợi nhuận"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
        <ModalDetail modalId={modalId}>
          {itemSelected && <TableProfit item={itemSelected} />}
        </ModalDetail>
      </div>
    </>
  );
}

export default React.memo(Tables);
