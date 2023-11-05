import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { Image, Table } from "antd";

const SubmitPageDetail = () => {
  const params = useParams();
  const [submit, setSubmit] = useState([]);

  const fetchSubmit = () => {
    api.get(`/api/Item/${params.id}/completes`).then((response) => {
      setSubmit(response.data);
    });
  };
  useEffect(() => {
    fetchSubmit();
  }, []);

  return (
    <div>
      <h1>{params.id}</h1>

      {/* {submit.map((sb) => {
        return <img width={100} key={sb.completeID} src={sb.homework} alt="" />;
        // console.log(sb);
      })} */}

      <Table
        columns={[
          {
            title: "Learner Name",
            dataIndex: "learnerName",
            key: "learnerName",
          },
          {
            title: "Homework",
            dataIndex: "homework",
            key: "homework",
            render: (value) => {
              return <Image width={200} src={value} />;
            },
          },
        ]}
        dataSource={submit}
      />
    </div>
  );
};

export default SubmitPageDetail;
