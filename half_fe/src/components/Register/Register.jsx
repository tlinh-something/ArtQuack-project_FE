import "./Register.css";
// import HomePage from "../pages/HomePage";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, message } from "antd";
import { useState } from "react";
import api from "../../config/axios";
import Login from "../Login signup/Login";

const NAME_REGEX = /^[a-zA-Z]+(([a-z A-Z])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^[\w-]+@[\w-]+\.[a-z]{3}$/;
// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,15}$/;

function Register() {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role: values.role,
      status: true,
    };
    console.log(data);
    api
      .post(`/api/register/role/${values.role}`, data)
      .then((response) => {
        message.success("Registration Successfully");
        navigate("/login/v2");
        // toast.success("Registration Successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
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
                pattern: NAME_REGEX,
                message: "This field can not empty!!!",
              },
              {
                min: 5,
              },
              {
                whitespace: true,
              },
            ]}
            hasFeedback
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
              {
                min: 5,
              },
              {
                type: "email",
              },
            ]}
            hasFeedback
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
                  "Must be 6 to 15 characters, include at least one lowercase letter, one uppercase letter and at least one number.",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="flex flex-end" />
          </Form.Item>

          <Form.Item
            className="w-50 mx-auto"
            label="Confirm Password"
            name="confirmpassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                pattern: PWD_REGEX,
                message: "Please enter this field to confirm your password.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "This confirm password is not match with password above!"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="w-50 mx-auto"
            label="Role"
            name="role"
            initialValue={"learner"}
            rules={[{ required: true, message: "Choose role to identify" }]}
          >
            <Radio.Group>
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
    </>
  );
}

export default Register;
