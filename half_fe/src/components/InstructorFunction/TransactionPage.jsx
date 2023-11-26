import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Table } from "antd";
import { formatDistanceToNow } from "date-fns";
import convertToCurrencyFormat from "../utils/currencyUtil";

function TransactionPage() {
  const [transaction, setTransaction] = useState([]);

  const account = JSON.parse(localStorage.getItem("accessToken"));

  const fetchTransaction = () => {
    api
      .get(`/api/${account.instructorID}/transactions-of-instructor`)
      .then((response) => {
        console.log(response.data);
        setTransaction(response.data);
      });
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => {
        return date && <span>{formatDate(new Date(date), "dd/MM/yyyy")}</span>;
      },
    },
    {
      title: "From",
      dataIndex: "learnerName",
      key: "learnerName",
      align: "center",
    },
    {
      title: "Course",
      dataIndex: "courseName",
      key: "courseName",
      align: "center",
    },
    {
      title: "Money",
      dataIndex: "money",
      key: "money",
      align: "center",
      render: (num) => {
        return (
          <span style={{ color: "green", fontWeight: 600 }}>
            {convertToCurrencyFormat(num.toFixed(1))}
          </span>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: '',
      key: '',
      render: (_, __, index) => {
        let total = 0;
        for (let i = 0; i <= index; i++) {
          total = total + transaction[i].money;
        }
        return convertToCurrencyFormat(total.toFixed(1))
      },
    }
  ];

  function formatDate(timestamp, format) {
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleString("vi-VN", options);

    const formatMapping = {
      "dd/MM/yyyy": formattedDate,
      "MM/dd/yyyy": formattedDate,
      "yyyy-MM-dd": formattedDate,
      "HH:mm:ss": formattedDate.slice(11),
      // Add more formats if needed
    };
    return formatMapping[format] || "Invalid Format";
  }

  return (
    <>
      <h1
        className="mt-5"
        style={{
          fontFamily: "Times",
          fontSize: "38px",
          fontWeight: "600",
          marginLeft: 10,
          color: "#ff6e01",
        }}
      >
        Instructor's Transaction History
      </h1>
      <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={transaction} />
    </>
  );
}

export default TransactionPage;
