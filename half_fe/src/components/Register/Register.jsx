import "./Register.css";
// import HomePage from "../pages/HomePage";
import { Link } from "react-router-dom";
import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";
import api from "../../config/axios";
import Login from "../Login signup/Login";

const EMAIL_REGEX = /^[\w-]+@[\w-]+\.[a-z]{2,3}/;
const PWD_REGEX = /^(?=(.*[0-9]))(?=(.*[A-Z]))(?=(.*[a-z])).{8,24}$/;

function Register() {
  const [success, setSuccess] = useState(false);

  // const navigate = useNavigate();
  const handleSubmit = (values) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role: values.role,
      status: true,
    };
    api
      .post(`/api/register/role/${values.role}`, data)
      .then((response) => {
        alert("Registration Successfully");
        // navigate('/login/v2')
        // toast.success("Registration Successfully");
      })
      .catch((error) => console.log(error));
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <Login />
        </section>
      ) : (
        <div className="login-form">
        <Form
          onFinish={handleSubmit}
          className="text-center w-100"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <div className="animation-title-regis mt-5">
            <span></span>
          </div>
          <Form.Item
            className="w-50 mx-auto"
            label="Fullname"
            name="fullName"
            rules={[
              {
                required: true,
                message: "This field can not empty!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="w-50 mx-auto"
            label="Email"
            name="email"
            type="email"
            rules={[
              {
                required: true,
                pattern: EMAIL_REGEX,
                message:
                  "Email must include @. Letters, numbers, special characters allowed.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="w-50 mx-auto"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                pattern: PWD_REGEX,
                message:
                  "8 to 24 characters. Must include uppercase and lowercase letters, a number.",
              },
            ]}
          >
            <Input.Password className="flex flex-end"/>
          </Form.Item>

          <Form.Item
            className="w-50 mx-auto"
            label="Role"
            name="role"
            initialValue={"learner"}
            rules={[{ required: true, message: "Choose role to identify" }]}
          >
            <Radio.Group >
              <Radio value="learner">Learner</Radio>
              <Radio value="instructor">Instructor</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="btn-signup">
              Sign up
            </Button>
          </Form.Item>

          <div className="link">
            <p>
              Already have account?{" "}
              <Link to="/login/v2" className="link-signup">
                Login
              </Link>
            </p>
          </div>
        </Form>
        </div>
      )}
    </>
  );
}

export default Register;
