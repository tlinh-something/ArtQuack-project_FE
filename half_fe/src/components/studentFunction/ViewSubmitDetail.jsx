import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { Button, Form, Image, Space, Table, Upload } from "antd";
import { Modal } from "antd";
import uploadImage from "../../hooks/useUploadImage";
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";
// import { useForm } from "antd/es/form/Form";

const ViewSubmitDetail = () => {
  const params = useParams();
  const [submit, setSubmit] = useState([]);
  const account = JSON.parse(localStorage.getItem("accessToken"));
  const [image, setImage] = useState("");
  const [current, setCurrent] = useState(null);
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

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
    };
    return formatMapping[format] || "Invalid Format";
  }

  const updateGrade = async (values) => {
    const data = {
      grade: null,
      comment: null,
      date: new Date().toISOString(),
      completeID: current,
      homework: image,
      status: true,
    };
    console.log(data);
    console.log(current);
    api.put(`/api/complete/${current}/updatecomplete`, data);
    form.resetFields();
    setRender(render + 1);
    swal("Success!", "Re-submit artwork success!", "success");
    setLoading(false);
    handleCancel();
  };

  const handleOk = () => {
    form.submit();
    console.log(current);
  };
  const handleCancel = () => {
    setCurrent(null);
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    console.log(file);
    setImage(await uploadImage(file.originFileObj));
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmit();
  }, [params.id, render]);

  return (
    <div>
      <Table
        pagination={{ pageSize: 3 }}
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
              return <Image width={200} height={125} src={value} />;
            },
          },
          {
            title: "Time",
            dataIndex: "date",
            key: "date",
            render: (value) => {
              return formatDate(value, "dd/MM/yyyy");
            },
            defaultSortOrder: "descend",
            sorter: (a, b) => a.date - b.date,
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
          {
            title: "Action",
            key: "action",
            align: "center",
            render: (record) => {
              return (
                <Space>
                  <Button
                    onClick={() => {
                      setCurrent(record.completeID);
                    }}
                    type="primary"
                  >
                    Re-submit
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={submit}
      />
      <Link to="/user" className="link-back fw-5">
        Back to home
      </Link>

      <Modal
        title="Re-submit peer grade"
        open={current !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          title="Re-submit peer grade"
          labelCol={{ span: 24 }}
          form={form}
          onFinish={updateGrade}
        >
          <Form.Item label="Upload File">
            <Upload.Dragger
              name="file"
              accept=".png, .jpg"
              beforeUpload={false}
              onChange={(info) => {
                console.log(info);
                if (info.fileList.length > 0) {
                  handleFileUpload(info.file);
                }
              }}
              onRemove={() => {
                console.log("a");
                setImage(null);
              }}
            >
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
          {image && <Image src={image} style={{ height: "200px" }} />}
        </Form>
      </Modal>
    </div>
  );
};

export default ViewSubmitDetail;
