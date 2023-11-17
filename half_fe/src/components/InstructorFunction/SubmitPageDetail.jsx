import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Slider,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import swal from "sweetalert";

const SubmitPageDetail = () => {
  const params = useParams();
  const [submit, setSubmit] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [current, setCurrent] = useState({});
  const [render, setRender] = useState(0);
  const [form] = useForm();

  const fetchSubmit = () => {
    api.get(`/api/Item/${params.id}/completes`).then((response) => {
      setSubmit(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log(currentID);
    if (currentID && currentID !== 0) {
      api.get(`/api/complete/${currentID}`).then((response) => {
        form.setFieldsValue(response.data);
        setCurrent(response.data);
        console.log(response.data);
      });
    } else {
      setCurrent(null);
    }
  }, [currentID]);

  const showModal = (id) => {
    setCurrentID(id);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setCurrentID(null);
  };

  const handleGarde = async (values) => {
    const data = {
      ...current,
      grade: values.grade,
      comment: values.comment,
      date: new Date().toISOString(),
      completeID: currentID,
    };

    api.put(`/api/complete/${currentID}/updatecomplete`, data);
    form.resetFields();
    handleCancel();
    swal("Success!", "You graded successfully!", "success");
    setRender(render + 1);
  };

  useEffect(() => {
    handleGarde();
  }, [render]);

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
  }, [params.id, render]);

  const IntegerStep = ({ value, onChange }) => {
    const onChangeInput = (newValue) => {
      onChange(newValue);
    };
    
    return (
      <Row>
        <Col span={12}>
          <Slider min={1} max={10} onChange={onChange} value={value} />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={10}
            style={{
              margin: "0 16px",
            }}
            value={value}
            onChange={onChangeInput}
          />
        </Col>
      </Row>
    );
  };

  return (
    <div>
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
          {
            title: "Action",
            key: "completeID",
            dataIndex: "completeID",
            render: (value) => {
              return (
                <Button type="primary" onClick={() => showModal(value)} >
                  Grade
                </Button>
              );
            },
          },
        ]}
        dataSource={submit}
      />

      <Modal
        title="Grade the artwork"
        open={currentID !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleGarde}
          
        >
          <Form.Item
            label="Grade"
            name={"grade"}
            rules={[
              {
                required: true,
                message: "Please grade for this artwork",
              },
            ]}
          >
            <IntegerStep
              onChange={(value) => {
                form.setFieldValue("grade", value);
              }}
            />
          </Form.Item>

          <Form.Item label="Comment" name={"comment"}>
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubmitPageDetail;