import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { formatDistanceToNow } from "date-fns";
import convertToCurrencyFormat from "../utils/currencyUtil";
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";

function TransactionPage() {
  const [transaction, setTransaction] = useState([]);
  const [bank, setBank] = useState([]);
  const [render, setRender] = useState(0);
  const [wallet, setWallet] = useState(0);

  const account = JSON.parse(localStorage.getItem("accessToken"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    api.post(
      `/api/${account.instructorID}/withdraw?stk=${values.acc}&bank=${values.bank}&amount=${values.money}`
      // instructorID: account.instructorID,
      // amount: values.money,
      // stk: values.acc,
      // Bank: values.bank,
      //}
    );
    swal("Success!", "Withdraw money successfully", "success");
    setRender(render + 1);
    setIsModalOpen(false);
  };

  const fetchWallet = () => {
    api
      .get(`/api/wallet-of-instructor/${account.instructorID}`)
      .then((response) => {
        setWallet(response.data);
      });
  };

  const fetchTransaction = () => {
    api
      .get(`/api/${account.instructorID}/transactions-of-instructor`)
      .then((response) => {
        console.log(response.data);
        setTransaction(response.data);
      });
  };

  const fetchBank = () => {
    api.get(`https://api.vietqr.io/v2/banks`).then((response) => {
      setBank(response.data);
      console.log(response.data.data);
    });
  };

  useEffect(() => {
    fetchTransaction();
    fetchBank();
    fetchWallet();
  }, [render]);

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
            + {convertToCurrencyFormat(num.toFixed(1))}
          </span>
        );
      },
    },
    // {
    //   title: 'Total',
    //   dataIndex: '',
    //   key: '',
    //   render: (_, __, index) => {
    //     let total = 0;
    //     for (let i = 0; i <= index; i++) {
    //       total = total + transaction[i].money;
    //     }
    //     return convertToCurrencyFormat(total.toFixed(1))
    //   },
    // }
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
      <p style={{ fontFamily: "monospace", marginLeft: 10 }}>
        {/* Total: {convertToCurrencyFormat(account.wallet.balance.toFixed(1))} */}
        Total: {convertToCurrencyFormat(wallet?.balance?.toFixed(1))}
      </p>
      <Button onClick={showModal}>Withdraw money</Button>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={transaction}
      />

      <Modal
        title="Money"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 24 }}>
          <Form.Item
            label="Account number"
            name={"acc"}
            rules={[{ required: true, message: "Please enter account number" }]}
          >
            <Input
              count={{
                show: true,
                max: 15,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Name of bank"
            name={"bank"}
            rules={[{ required: true, message: "Please enter bank name" }]}
          >
            <Select
              showSearch
              placeholder="Select bank"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={bank?.data?.map((item) => {
                return {
                  value: item.shortName,
                  label: item.shortName,
                };
              })}
            />
            {/* <select>
              {bank?.data?.map((item, i) => {
                return (
                  <option className="sidebar-link-item fw-5" key={i}>
                    {item.shortName}
                  </option>
                );
              })}
            </select> */}

            {/* <Select
              style={{ width: 120 }}
              options={bank?.data?.map((item) => {
                return {
                  value: item.id,
                  label: item.shortName,
                };
              })}
            /> */}
          </Form.Item>

          <Form.Item
            label="Enter money"
            name={"money"}
            rules={[
              { required: true, message: "How much you want to withdraw?" },
            ]}
          >
            <InputNumber
              defaultValue={10}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              // onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default TransactionPage;
