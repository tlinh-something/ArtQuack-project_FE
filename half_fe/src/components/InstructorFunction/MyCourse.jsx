import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import "./AddCourse.css";
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Upload,
  message,
} from "antd";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert";
import uploadImage from "../../hooks/useUploadImage";
import { FaQuestionCircle } from "react-icons/fa";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function MyCourse() {
  const [course, setCourse] = useState([]);
  const [selectCourse, setSelectCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [render, setRender] = useState(0);
  const [price, setPrice] = useState(0);
  const [form] = useForm();
  const [file, setFile] = useState([]);
  // const [form2] = useForm();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState();
  const [active, setActive] = useState("ACTIVE");

  const WORD_REGEX = /^[a-zA-Z]+(([a-z A-Z,.&/:0-9])?[a-zA-Z]*)*$/;
  // const handleDelete = (courseID) => {
  //   api.delete(`/api/deletecourse/${courseID}`);
  //   message.success("Deleted course successfully");
  //   setRender(render + 1);
  // };

  // useEffect(() => {});

  // const cancel = () => {
  //   message.error("This course cancel to delete");
  // };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "courseID",
    //   key: "courseID",
    // },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (image) => (
        <img
          src={
            image ||
            "https://th.bing.com/th/id/R.d84f37a5b4e943152abc3baa7bd23c82?rik=j01Fex7vq7e%2fNA&riu=http%3a%2f%2ftopalski.com%2fwp-content%2fuploads%2f2011%2f09%2fNa-kraj-Shume-m.jpg&ehk=wig0r%2bpjBHeo01%2f8R%2fzwOBbcC9LnSXd44qFGiX6ps%2bA%3d&risl=&pid=ImgRaw&r=0"
          }
          alt=""
          style={{
            width: 200,
            margin: "0 auto",
          }}
        />
      ),
    },
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      render: (courseName, record) => (
        <Link to={`/instructor/chapter/${record.courseID}`}>{courseName}</Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "courseStatus",
      key: "courseStatus",
      align: "center",
      filters: [
        {
          text: "Verify",
          value: "VERIFY",
        },
        {
          text: "Active",
          value: "ACTIVE",
        },
        {
          text: "Deactive",
          value: "DEACTIVE",
        },
        {
          text: "Reject",
          value: "REJECT",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record?.courseStatus.startsWith(value),
      render: (_, record) => {
        return record.courseStatus === "VERIFY" ? (
          <Tag color="warning">Verifying</Tag>
        ) : record.courseStatus === "UPDATING" ? (
          <Tag color="blue">Updating</Tag>
        ) : record.courseStatus === "REJECT" ? (
          <Tag color="red">Reject</Tag>
        ) : (
          <ActiveButton
            courseID={record.courseID}
            fetch={fetch}
            status={record.courseStatus}
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
                navigate(`/instructor/chapter/${record.courseID}`);
              }}
            >
              Add/Modify chapter
            </Button>
            <Button
              onClick={() => {
                setSelectCourse(record.courseID);
              }}
              type="primary"
            >
              Update
            </Button>

            <Popconfirm
              title="Delete the course"
              description="Are you sure to delete this course"
              onConfirm={() => {
                api.delete(`/api/deletecourse/${record.courseID}`);
                message.success("Deleted course successfully");
                setRender(render + 1);
                // handleDelete(record.courseID)
              }}
              icon={
                <FaQuestionCircle
                  style={{
                    color: "red",
                  }}
                />
              }
              onCancel={() => {
                message.error("Can not delete this course");
              }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const data = {
      courseID: selectCourse,
      name: values.name,
      description: values.description,
      upload_date: new Date().toISOString(),
      // picture: values.picture,
      viewer: 0,
      rate: 0,
      status: true,
      avatar: img,
      price: price,
    };

    if (!selectCourse) {
      const account = JSON.parse(localStorage.getItem(`accessToken`));
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(
        `/api/instructor/${account.instructorID}/category/${values.category}/level/${values.level}/course`,
        data
      );
      setRender(render + 1);
      form.resetFields();
      handleCancel();
      Swal("Success!", "You create a new course success!", "success");
    } else {
      // eslint-disable-next-line no-unused-vars
      const res = api.put(`/api/course/${selectCourse}/updatecourse`, data);
      form.resetFields();
      handleCancel();
      Swal("Success!", "You update course success!", "success");
      setRender(render + 1);
    }
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setSelectCourse(null);
  };

  const fetchCategory = async () => {
    const response = await api.get("/api/levels");
    setLevels(response.data);
    console.log(response.data);
  };

  const fetchLevel = async () => {
    const response = await api.get("/api/categories");
    setCategories(response.data);
    console.log(response.data);
  };

  const fetch = () => {
    const account = JSON.parse(localStorage.getItem(`accessToken`));
    api
      .get(`/api/instructor/${account.instructorID}/courses-chapters-items`)
      // .get(`/api/instructor/${account.instructorID}/coursesOfInstructor`)
      .then((response) => {
        setCourse(
          response.data.map((item, index) => {
            return {
              ...item,
              key: index,
            };
          })
        );
        console.log(response.data);
      });
  };

  useEffect(() => {
    fetch();
  }, [render]);

  useEffect(() => {
    fetch();
    fetchCategory();
    fetchLevel();
  }, []);

  const handleUploadCourseImg = async (file) => {
    console.log(file);
    setLoading(true);
    const url = await uploadImage(file.originFileObj);
    setImg(url);
    setFile([
      {
        status: "done",
        url: url,
        name: file.name,
      },
    ]);
    setLoading(false);
  };

  const fetchCourse = async () => {
    const account = JSON.parse(localStorage.getItem(`accessToken`));
    const response = await api.get(
      // `/api/instructor/${account.instructorID}/coursesOfInstructor`
      `/api/instructor/${account.instructorID}/courses-chapters-items`
    );
    setCourse(response.data.filter((item) => item.status));
  };

  useEffect(() => {
    fetchCourse();
  }, [render]);

  useEffect(() => {
    if (selectCourse && selectCourse !== 0) {
      api.get(`/api/course/${selectCourse}`).then((response) => {
        console.log(response.data);
        form.setFieldsValue({
          ...response.data,
          level: response.data.levelID,
          category: response.data.cateID,
        });
        setImg(response.data.avatar);

        setFile([
          {
            status: "done",
            url: response.data.avatar,
            name: "Old Image",
          },
        ]);
      });
    } else {
      setImg(null);
      form.resetFields();
    }
  }, [selectCourse]);

  return (
    <div className="display-form-add">
      <Card className="w-50 add-form">
        <Row>
          <Col span={12} style={{ fontSize: "16px" }}>
            Create more courses?
          </Col>

          <Col span={12} className="flex flex-end">
            <Button
              type="primary"
              onClick={() => {
                setSelectCourse(0);
              }}
            >
              Add course
            </Button>
          </Col>
        </Row>
      </Card>

      <div className="table-responsive mx-auto" style={{ width: "80%" }}>
        <Table columns={columns} dataSource={course} />
      </div>

      <Modal
        title={`${selectCourse === 0 ? "Add" : "Update"}`}
        open={selectCourse !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                // pattern: WORD_REGEX,
                message: "Enter name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descript"
            rules={[
              {
                required: true,
                message: "Enter descript!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Enter price!",
              },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => {
                setPrice(value);
              }}
            />
          </Form.Item>

          <Row
            style={{
              width: "100%",
            }}
            gutter={12}
          >
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Choose category!",
                  },
                ]}
              >
                <Select
                  options={categories.map((item) => {
                    return {
                      value: item.cateID,
                      label: item.cateName,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="level"
                label="Level"
                rules={[
                  {
                    required: true,
                    message: "Choose level!",
                  },
                ]}
              >
                <Select
                  options={levels.map((item) => {
                    return {
                      value: item.levelID,
                      label: item.levelName,
                    };
                  })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Upload.Dragger
              name="picture"
              accept=".png, .jpg"
              fileList={file}
              onChange={(info) => handleUploadCourseImg(info.file)}
            >
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MyCourse;

const ActiveButton = ({ status, courseID, fetch }) => {
  const [active, setActive] = useState(status === "ACTIVE");
  return (
    <Switch
      checked={active}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      onChange={async (value) => {
        setActive(value);
        console.log(value);
        if (value === false) {
          await api.patch(
            `/api/${courseID}/change-course-status?state=DEACTIVE`
          );
        } else {
          await api.patch(`/api/${courseID}/change-course-status?state=ACTIVE`);
        }
        // fetch();
      }}
      // checkedChildren="Active"
      // unCheckedChildren="Deactive"
      defaultChecked
    />
  );
};
