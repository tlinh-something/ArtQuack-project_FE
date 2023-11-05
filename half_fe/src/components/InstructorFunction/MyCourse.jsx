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
  Row,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert";
import uploadImage from "../../hooks/useUploadImage";

function MyCourse() {
  const [course, setCourse] = useState([]);
  const [selectCourse, setSelectCourse] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [render, setRender] = useState();
  const [price, setPrice] = useState(0);
  const [form] = useForm();
  // const [form2] = useForm();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState();

  const columns = [
    {
      title: "ID",
      dataIndex: "courseID",
      key: "courseID",
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (image) => (
        <img
          src={
            image ||
            "https://www.analyticssteps.com/backend/media/thumbnail/2435072/1339082_1630931780_Use%20of%20AI%20in%20Language%20LearningArtboard%201.jpg"
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
              Add chapter
            </Button>
            <Button
              onClick={() => {
                showModal2(`${record.courseID}`);
                setRender(render + 1)
              }}
              type="primary"
            >
              Update
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                const response = api.delete(`/api/deletecourse/${record.courseID}`);
                setRender(render + 1);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      courseID: 0,
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

    const account = JSON.parse(localStorage.getItem(`accessToken`));
    // eslint-disable-next-line no-unused-vars
    const response = await api.post(
      `/api/instructor/${account.instructorID}/category/${values.category}/level/${values.level}/course`,
      data
    );
    setRender(render + 1);
    form.resetFields();
    handleCancel();
    Swal("Good job!", "You clicked the button!", "success");
  };

  const handleUpdate = (values) => {
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

    const res = api.put(`/api/course/${selectCourse}/updatecourse`, data);
    form.resetFields();
    handleCancel();
    Swal("Good Job!", "You update course success!", "success");
    setRender(render + 1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModal2 = (selectCourse) => {
    setIsModalOpen2(true);
    setSelectCourse(selectCourse);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
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
      .get(`/api/instructor/${account.instructorID}/coursesOfInstructor`)
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
    setLoading(false);
  };

  const fetchCourse = async () => {
    const account = JSON.parse(localStorage.getItem(`accessToken`));
    const response = await api.get(
      `/api/instructor/${account.instructorID}/coursesOfInstructor`
    );
    setCourse(response.data.filter((item) => item.status));
  };

  useEffect(() => {
    fetchCourse();
  }, [render]);

  return (
    <div className="display-form-add">
      <Card className="w-50 add-form">
        <Row>
          <Col span={12} style={{ fontSize: "16px" }}>
            Create more course?
          </Col>

          <Col span={12} className="flex flex-end">
            <Button
              type="primary"
              onClick={() => {
                showModal();
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
        title="Add new course"
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
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
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
              onChange={(info) => handleUploadCourseImg(info.file)}
            >
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update course"
        open={isModalOpen2}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleUpdate}
        >
          <Form.Item
            name="name"
            label="New Course name"
            rules={[
              {
                required: true,
                message: "Enter new course name",
              },
            ]}
          >
            <Input value={course.name}
            onChange={(e) =>  setCourse(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="description"
            label="Descript"
            rules={[
              {
                required: true,
                message: "Enter new  descript!",
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
                message: "Enter new price!",
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
                    message: "Choose new  category!",
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
                    message: "Choose new level!",
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

          <Form.Item
            name="avatar"
            label="New avatar for course"
            rules={[
              {
                required: true,
                message: "Choose new picture",
              },
            ]}
          >
            <Upload.Dragger
              name="picture"
              accept=".png, .jpg"
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
