import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal, Switch, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";
import Dragger from "antd/es/upload/Dragger";
import uploadVideo from "../../hooks/useUploadFileFirebase";
import TextArea from "antd/es/input/TextArea";

const AddChapterNew = () => {
  const params = useParams();
  const [chapters, setChapters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [render, setRender] = useState(0);
  const [course, setCourse] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleSubmitForm = async (values) => {
    const response = await api.post(`/api/course/${params.id}/chapter`, values);
    console.log(response.data);
    form.resetFields();
    swal("Good Job", "Create chapter success!", "success");
    handleCancel();
    setRender(render + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchChapter = async () => {
    const response = await api.get(`/api/course/${params.id}/chapters`);
    setChapters(
      response.data.map((item) => {
        return {
          ...item,
          key: item.chapterID,
        };
      })
    );
  };

  const fetchCourse = async () => {
    const response = await api.get(`/api/course/${params.id}`);
    setCourse(response.data);
  };

  useEffect(() => {
    fetchChapter();
  }, [render]);

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>
        {course?.name} - {course?.cateName}
      </h1>
      <h3>Level: {course?.levelName}</h3>
      <p>{course?.description}</p>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        Add Chapter
      </Button>
      <Table
        columns={[
          {
            title: "Chapter name",
            dataIndex: "chapterName",
            key: "chapterName",
          },
        ]}
        dataSource={chapters}
        expandable={{
          expandedRowRender: (record) => (
            <TableItem chapterID={record.chapterID} />
          ),
          rowExpandable: () => true,
        }}
      />

      <Modal
        title="Add New Chapter"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmitForm}
        >
          <Form.Item
            label="Chapter name"
            name="chapterName"
            rules={[
              {
                required: true,
                message: "Enter chapter name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const TableItem = ({ chapterID }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [file, setFile] = useState();
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("file");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    const data = {
      ...values,
      content: contentType === "file" ? file : values.content,
    };

    const response = await api.post(
      `/api/chapter/${chapterID}/createitem`,
      data
    );
    form.resetFields();
    swal("Good Job!", "Successfully create new item", "success");
    handleCancel();
    setRender(render + 1);
  };

  const fetchItem = async () => {
    const response = await api.get(`/api/chapter/${chapterID}/items`);
    setItems(response.data.filter((item) => item.status));
  };

  useEffect(() => {
    fetchItem();
  }, [render]);

  const props = {
    name: "file",
    file: file,
    onChange: async (info) => {
      setLoading(true);
      const file = await uploadVideo(info.file.originFileObj);
      console.log(file);
      setFile(file);
      setLoading(false);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleDelete = async (id) => {
    const response = await api.delete(`/api/deleteitem/${id}`);
    setRender(render + 1);
  };
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: 20,
      }}
    >
      <Button
        style={{
          marginBottom: 10,
        }}
        type="primary"
        onClick={showModal}
      >
        Add Item
      </Button>

      <Table
        pagination={false}
        columns={[
          {
            title: "Name",
            dataIndex: "itemName",
            key: "itemName",
          },
          {
            title: "Content",
            dataIndex: "content",
            key: "content",
            align: "center",
            render: (value) => {
              return value?.startsWith("http") ? (
                <video src={value} controls width="50%" height="auto" />
              ) : (
                <>{value}</>
              );
            },
          },
          {
            title: "Action",
            dataIndex: "itemID",
            key: "itemID",
            align: "center",
            render: (value) => {
              return (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    handleDelete(value);
                  }}
                >
                  Delete Item
                </Button>
              );
            },
          },
        ]}
        dataSource={items}
      />
      <Modal
        title="Add new item"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Item name"
            name={"itemName"}
            rules={[
              {
                required: true,
                message: "Enter item name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Switch
            defaultChecked
            checkedChildren="File"
            unCheckedChildren="Text"
            style={{ marginBottom: 10 }}
            onChange={(value) => {
              if (value === false) {
                setContentType("text");
              } else {
                setContentType("file");
              }
            }}
          />
          {contentType === "file" ? (
            <Form.Item
              label="Content"
              name={"content"}
              rules={[
                {
                  required: true,
                  message: "Enter link",
                },
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon"></p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          ) : (
            <Form.Item
              label="Content"
              name={"content"}
              rules={[
                {
                  required: true,
                  message: "Enter link",
                },
              ]}
            >
              <Input placeholder="Enter your content..." />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AddChapterNew;
