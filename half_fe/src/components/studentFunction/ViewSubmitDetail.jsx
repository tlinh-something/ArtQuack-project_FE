import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import {
  Image,
  Table,
} from "antd";
// import { useForm } from "antd/es/form/Form";

const ViewSubmitDetail = () => {
  const params = useParams();
  const [submit, setSubmit] = useState([]);
  const account = JSON.parse(localStorage.getItem('accessToken'))
//   const [currentID, setCurrentID] = useState(null);
//   const [current, setCurrent] = useState({});
//   const [form] = useForm();

  const fetchSubmit = () => {
    // api.get(`/api/Item/${params.id}/completes`).then((response) => {
    api.get(`/api/Learner/${account.learnerID}/Item/${params.id}/complete`).then((response) => {
      setSubmit(response.data);
      console.log(response.data);
    });
  };

//   useEffect(() => {
//     console.log(currentID);
//     if (currentID && currentID !== 0) {
//       api.get(`/api/complete/${currentID}`).then((response) => {
//         form.setFieldsValue(response.data);
//         setCurrent(response.data);
//       });
//     } else {
//       setCurrent(null);
//     }
//   }, [currentID]);

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
          },
        ]}
        dataSource={submit}
      />
    </div>
  );
};

export default ViewSubmitDetail;
