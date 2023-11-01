import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Input, Modal, Row, Select, Upload } from "antd";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert";
import uploadImage from "../hooks/useUploadImage";

function MyCourse() {
  const [course, setCourse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [render, setRender] = useState();
  const [form] = useForm();

  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(null);

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      courseID: 0,
      name: values.name,
      description: values.description,
      upload_date: new Date().toISOString(),
      picture: values.picture,
      viewer: 0,
      rate: 0,
      status: true,
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        setCourse(response.data);
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
    setImg(await uploadImage(file.originFileObj));
  };

  return (
    <div className="display-form-add">
      {/* <Navbar /> */}
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

      {/* {displayForm && <Outlet />} */}

      <div className="table-responsive mx-auto" style={{ width: "80%" }}>
        <table className="display-page-course table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Course Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {course.map((data, i) => (
              <tr key={i}>
                <td scope="row">{i + 1}</td>
                <td>
                  <Link to={`/instructor/chapter/${data.courseID}`}>
                    {data.name}
                  </Link>
                </td>
                {/* <td>{data.description}</td> */}

                <td>
                  <Link
                    to={`/instructor/addchapter/${data.courseID}`}
                    className="btn btn-primary"
                  >
                    Add chapter
                  </Link>
                  <Link
                    to={`/instructor/update/${data.courseID}`}
                    className="btn btn-success ms-1"
                  >
                    Update
                  </Link>
                  {/* <Link to={`/delete/${data.id}`} className='btn btn-danger ms-1'>Delete</Link> */}
                  <button
                    onClick={async () => {
                      console.log(data);
                      const response = await axios.delete(
                        `http://167.172.92.40:8080/api/deletecourse/${data.courseID}`
                      );
                      console.log(response);
                    }}
                    className="btn btn-danger ms-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Add new course"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
                    message: "Enter descript!",
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
                    message: "Enter descript!",
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
              accept=".png"
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
