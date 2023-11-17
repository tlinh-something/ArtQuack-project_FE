import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { Image, Table } from "antd";
// import { useForm } from "antd/es/form/Form";

const ViewSubmitDetail = () => {
  const params = useParams();
  const [submit, setSubmit] = useState([]);
  const account = JSON.parse(localStorage.getItem("accessToken"));

  const fetchSubmit = () => {
    api
      .get(`/api/Learner/${account.learnerID}/Item/${params.id}/complete`)
      .then((response) => {
        setSubmit(response.data.filter((item) => item.status));
        console.log(response.data);
      });
  };

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

  useEffect(() => {
    fetchSubmit();
  }, [params.id]);

  return (
    <div>
      <Table
        columns={[
          {
            title: "Instructor Name",
            dataIndex: "instructorName",
            key: "instructorName",
          },
          {
            title: "Homework",
            dataIndex: "homework",
            key: "homework",
            render: (value) => {
              return <Image width={200} src={value} />;
            },
          },
          {
            title: "Time",
            dataIndex: "date",
            key: "date",
            render: (value) => {
              return formatDate(value, "dd/MM/yyyy");
            },
          },
          {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
          },
          {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
          }
        ]}
        dataSource={submit}
      />
      <Link to='/user' className="link-back fw-5">Back to home</Link>
    </div>
  );
};

export default ViewSubmitDetail;
