/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";
import Dragger from "antd/es/upload/Dragger";
import uploadVideo from "../../hooks/useUploadFileFirebase";
import ReactPlayer from "react-player";
import { FaQuestionCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TextArea from "antd/es/input/TextArea";
// import TextArea from "antd/es/input/TextArea";

const AddChapterNew = () => {
  const params = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectChapter, setSelectChapter] = useState([]);
  const [currentChapterID, setCurrentChapterID] = useState(null);

  const [form] = useForm();
  const [render, setRender] = useState(0);
  const [course, setCourse] = useState();

  const WORD_REGEX = /^[a-zA-Z]+(([a-z A-Z])?[a-zA-Z]*)*$/;

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
      swal("Success!", "Create chapter success!", "success");
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
      swal("Success!", "Update chapter success!", "success");
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
    swal("Success!", "You update course success!", "success");
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
    const response = api.delete(`/api/deletechapter/${chapterID}`);
    message.success("Deleted chapter successfully");
    setRender(render + 1);
  };

  const cancel = () => {
    message.error("This chapter cancel to delete");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ display: "flex", alignItems: "center" }}>
        {course?.name} - {course?.cateName}
        <Tag
          style={{ marginLeft: 20, padding: "2px 4px", borderRadius: 5 }}
          color={
            course?.courseStatus === "ACTIVE"
              ? "green"
              : course?.courseStatus === "DEACTIVE"
              ? "volcano"
              : course?.courseStatus === "UPDATING"
              ? "blue"
              : course?.courseStatus === "VERIFY"
              ? "warning"
              : "red"
          }
        >
          {course?.courseStatus}
        </Tag>
      </h1>
      <h3>Level: {course?.levelName}</h3>
      <p>{course?.description}</p>
      {course?.courseStatus === "REJECT" ? (
        <Alert
          message="Reject reason"
          description={course?.reason}
          type="error"
          showIcon
          style={{ marginBottom: 20, whiteSpace: "pre-line" }}
        />
      ) : null}

      {/* <p style={{ color: "red", fontSize: 15 }}><ExclamationOutlined />{course?.reason}</p> */}
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          onClick={() => {
            setCurrentChapterID(0);
          }}
        >
          Add Chapter
        </Button>

        {course?.courseStatus === "UPDATING" ? (
          <Button
            onClick={async () => {
              await api.put(`/api/${course.courseID}/verify`);
            }}
          >
            Done
          </Button>
        ) : course?.courseStatus === "REJECT" ? (
          <Button
            onClick={async () => {
              await api.put(`/api/${course.courseID}/verify`);
              fetchCourse();
            }}
          >
            Re-submit
          </Button>
        ) : null}
      </Space>
      <Table
        pagination={false}
        columns={[
          {
            title: "Chapter name",
            dataIndex: "chapterName",
            key: "chapterName",
          },
          {
            title: "Free Trial",
            dataIndex: "chapterID",
            key: "chapterID",
            align: "center",
            render: (chapterID) => {
              return (
                <Switch
                  // checked={active}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={async (value) => {
                    // setActive(value);
                    console.log(value);
                    if (value === false) {
                      await api.put(
                        `/api/chapter/${chapterID}/update-freetrial`,
                        {
                          chapterID: chapterID,
                          seevideo: value,
                        }
                      );
                    } else {
                      console.log(value);
                      await api.put(
                        `/api/chapter/${chapterID}/update-freetrial`,
                        {
                          chapterID: chapterID,
                          seevideo: value,
                        }
                      );
                    }
                    // fetch();
                  }}
                  // checkedChildren="Active"
                  // unCheckedChildren="Deactive"
                  defaultChecked
                />
              );
            },
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
                    onConfirm={
                      () => {
                        const response = api.delete(
                          `/api/deletechapter/${record.chapterID}`
                        );
                        message.success("Deleted chapter successfully");
                        setRender(render + 1);
                      }
                      // handleDeleteChapter(record.chapterID)
                    }
                    icon={
                      <FaQuestionCircle
                        style={{
                          color: "red",
                        }}
                      />
                    }
                    onCancel={cancel}
                  >
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

      <div className="navigate-link">
        <ArrowLeftOutlined />
        <Link to="/instructor"> Back</Link>
      </div>

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
                pattern: WORD_REGEX,
                message: "Enter new chapter name",
              },
              {
                whitespace: true,
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
  const [itemType, setItemType] = useState("normal");

  const WORD_REGEX = /^[a-zA-Z]+(([a-z A-Z])?[a-zA-Z]*)*$/;

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
      console.log(chapterID);
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(
        `/api/chapter/${chapterID}/createitem`,
        data
      );
      form.resetFields();
      swal("Success!", "Successfully create new item", "success");
      handleCancel();
      setRender(render + 1);
    } else {
      // eslint-disable-next-line no-unused-vars
      const response = await api.put(
        `/api/item/${currentItemID}/updateitem`,
        data
      );
      form.resetFields();
      swal("Success!", "Successfully update item", "success");
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
    message.success("Delete item successfully");
    setRender(render + 1);
  };

  const cancel = () => {
    message.error("This item cancel to delete");
  };

  const { TextArea } = Input;

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

                  <Popconfirm
                    title="Delete the chapter"
                    description="Are you sure to delete this chapter"
                    onConfirm={() => handleDelete(value)}
                    icon={
                      <FaQuestionCircle
                        style={{
                          color: "red",
                        }}
                      />
                    }
                    onCancel={cancel}
                  >
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
          <Switch
            defaultChecked
            checkedChildren="Item Normal"
            unCheckedChildren="Peer Grade"
            style={{ marginBottom: 10 }}
            onChange={(value) => {
              console.log(value);
              if (value === false) {
                form.setFieldValue("itemName", "Peer Graded");
                setItemType("peer");
              } else {
                form.setFieldValue("itemName", "");
                setItemType("normal");
              }
              console.log(itemType);
            }}
          />

          <Form.Item
            label="Item Name"
            name={"itemName"}
            rules={[
              {
                required: true,
                pattern: WORD_REGEX,
                message: "Enter item name",
              },
            ]}
          >
            <Input disabled={itemType === "peer"} />
          </Form.Item>

          {/* {itemType === "normal" ? (
            <Form.Item
              label="Item Name"
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
          ) : (
            <Form.Item
              label="Item Name"
              name={"itemName"}
              rules={[
                {
                  required: true,
                  message: "Enter item name",
                },
              ]}
            >
              <Input defaultValue="Peer Graded" />
            </Form.Item>
          )} */}

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
                  message: "Enter video",
                },
              ]}
            >
              <Upload.Dragger
                name="file"
                accept=".mp4"
                beforeUpload={false}
                // onChange={(info) => handleFileUpload(info.file)}
              >
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
              {/* <Dragger {...props}>
                <p className="ant-upload-drag-icon"></p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger> */}
            </Form.Item>
          ) : (
            <Form.Item
              label="Content"
              name={"content"}
              rules={[
                {
                  required: true,
                  pattern: WORD_REGEX,
                  message: "Enter link video (such as youtube) or content",
                },
              ]}
            >
              <TextArea placeholder="Enter your content..." />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AddChapterNew;
