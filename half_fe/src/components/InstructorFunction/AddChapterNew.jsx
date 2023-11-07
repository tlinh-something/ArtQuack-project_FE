/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";
import Dragger from "antd/es/upload/Dragger";
import uploadVideo from "../../hooks/useUploadFileFirebase";
import ReactPlayer from "react-player";
// import TextArea from "antd/es/input/TextArea";

const AddChapterNew = () => {
  const params = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectChapter, setSelectChapter] = useState([]);
  const [currentChapterID, setCurrentChapterID] = useState(null);

  const [form] = useForm();
  const [render, setRender] = useState(0);
  const [course, setCourse] = useState();

  const handleOk = () => {
    form.submit();
  };

  const handleSubmitForm = async (values) => {
    if (currentChapterID === 0) {
      const response = await api.post(
        `/api/course/${params.id}/chapter`,
        values
      );
      console.log(response.data);
      form.resetFields();
      swal("Good Job", "Create chapter success!", "success");
      handleCancel();
      setRender(render + 1);
    } else {
      const response = await api.put(
        `/api/chapter/${currentChapterID}/updatechapter`,
        {
          ...values,
          chapterID: currentChapterID,
          status: true,
        }
      );
      console.log(response.data);
      form.resetFields();
      swal("Good Job", "Update chapter success!", "success");
      handleCancel();
      setRender(render + 1);
    }
  };

  const handleUpdateChapter = async (values) => {
    const data = {
      chapterID: selectChapter,
      chapterName: values.chapterName,
    };

    const response = await api.put(
      `/api/chapter/${selectChapter}/updatechapter`,
      data
    );
    form.resetFields();
    handleCancel();
    swal("Good Job!", "You update course success!", "success");
    setRender(render + 1);
  };

  const handleCancel = () => {
    setCurrentChapterID(null);
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

  const filterChapter = async () => {
    const respone = await api.get(`/api/course/${params.id}/chapters`);
    setChapters(
      respone.data
        .filter((item) => item.status)
        .map((item) => {
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
    console.log(course);
  };

  useEffect(() => {
    fetchChapter();
  }, [render]);

  useEffect(() => {
    filterChapter();
  }, [render]);

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (currentChapterID && currentChapterID !== 0) {
      api.get(`/api/chapter/${currentChapterID}`).then((response) => {
        form.setFieldsValue(response.data);
      });
    } else {
      form.resetFields();
    }
  }, [currentChapterID]);

  const handleDeleteChapter = (chapterID) => {
    console.log(chapterID);
    const response = api.delete(
      `/api/deletechapter/${chapterID}`
    );
    message.success('Deleted chapter successfully')
    setRender(render + 1);
  }
  
  const cancel = () => {
    message.error('This chapter cancel to delete')
  }

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
          setCurrentChapterID(0);
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
          {
            title: "Action",
            key: "action",
            align: "center",
            render: (record) => {
              return (
                <Space>
                  <Button
                    onClick={() => {
                      setCurrentChapterID(record.chapterID);
                    }}
                    type="primary"
                  >
                    Update
                  </Button>

                  <Popconfirm
                  title="Delete the chapter"
                  description="Are you sure to delete this chapter"
                  onConfirm={() => handleDeleteChapter(record.chapterID)}
                  onCancel={cancel}>
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </Space>
              );
            },
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
        title={`${currentChapterID === 0 ? "Add" : "Update"}`}
        open={currentChapterID != null}
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
            label="New chapter name"
            name="chapterName"
            rules={[
              {
                required: true,
                message: "Enter new chapter name",
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
  const [currentItemID, setCurrentItemID] = useState(null);
  const [form] = useForm();
  const [file, setFile] = useState();
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("file");

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setCurrentItemID(null);
  };

  const handleFinish = async (values) => {
    const data = {
      ...values,
      itemID: currentItemID,
      content: contentType === "file" ? file : values.content,
    };
    if (!currentItemID) {
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(
        `/api/chapter/${chapterID}/createitem`,
        data
      );
      form.resetFields();
      swal("Good Job!", "Successfully create new item", "success");
      handleCancel();
      setRender(render + 1);
    } else {
      // eslint-disable-next-line no-unused-vars
      const response = await api.put(
        `/api/item/${currentItemID}/updateitem`,
        data
      );
      form.resetFields();
      swal("Good Job!", "Successfully update item", "success");
      handleCancel();
      setRender(render + 1);
    }
  };

  const fetchItem = async () => {
    const response = await api.get(`/api/chapter/${chapterID}/items`);
    setItems(response.data.filter((item) => item.status));
  };

  useEffect(() => {
    fetchItem();
  }, [render]);

  useEffect(() => {
    console.log(currentItemID);
    if (currentItemID && currentItemID !== 0) {
      api.get(`/api/item/${currentItemID}`).then((response) => {
        form.setFieldsValue(response.data);
      });
    } else {
      form.resetFields();
    }
  }, [currentItemID]);

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
    message.success('Delete item successfully')
    setRender(render + 1);
  };

  const cancel = () => {
    message.error('This item cancel to delete')
  }

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
        onClick={() => setCurrentItemID(0)}
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
                value?.includes("youtu") ? (
                  <ReactPlayer
                    url={value}
                    width={"90%"}
                    height={300}
                    style={{
                      height: 1000,
                    }}
                  />
                ) : (
                  <video src={value} controls width="50%" height="auto" />
                )
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
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      setCurrentItemID(value);
                    }}
                  >
                    Update Item
                  </Button>

                  {/* <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleDelete(value);
                    }}
                  >
                    Delete Item
                  </Button> */}

                  <Popconfirm
                  title="Delete the chapter"
                  description="Are you sure to delete this chapter"
                  onConfirm={() => handleDelete(value)}
                  onCancel={cancel}>
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
        dataSource={items}
      />
      <Modal
        title={`${currentItemID === 0 ? "Add" : "Update"}`}
        open={currentItemID !== null}
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
