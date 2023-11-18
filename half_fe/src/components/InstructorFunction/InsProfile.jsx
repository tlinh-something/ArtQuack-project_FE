import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import api from "../../config/axios";
import "../UserPage/UserProfile.css";

const InsProfile = () => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const NAME_REGEX = /^[a-zA-Z]+(([a-z A-Z])?[a-zA-Z]*)*$/;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/instructor/${id}`);
        const userData = res.data;
        form.setFieldsValue(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [form, id]);

  const handleSubmit = async (values) => {
    try {
      const updatedValues = {
        ...values,
        instructorID: id,
        role: "instructor",
        status: true,
      };
      const res = await api.put(
        `/api/instructor/${id}/updateinstructor`,
        updatedValues
      );
      console.log(res);
      window.alert("Update successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <Form
        form={form}
        className="container-profile"
        onFinish={handleSubmit}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 900,
        }}
      >
        <Form.Item
          className="w-50 mx-auto"
          label="Name"
          name="name"
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
          rules={[
            {
              required: true,
              message: "The email should not empty",
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
              message: "The password should not empty",
            },
            {
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input.Password className="flex flex-start stretch" />
        </Form.Item>

        <Form.Item style={{ margin: "0 auto" }}>
          <Button type="primary" htmlType="submit" style={{ margin: "0 auto" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InsProfile;
