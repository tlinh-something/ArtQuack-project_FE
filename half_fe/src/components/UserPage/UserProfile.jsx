import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import api from "../../config/axios";
import "./UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/learner/${id}`);
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
      const res = await api.put(`/api/learner/${id}/updatelearner`, values);
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
        layout="vertical"
        onFinish={handleSubmit}
        className="container-profile"
        style={{margin:"0 auto"}}
      >
        <Form.Item style={{margin:"0 auto"}} label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item style={{margin:"0 auto"}} label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item style={{margin:"0 auto"}} label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item style={{margin:"0 auto"}}>
          <Button  type="primary" htmlType="submit" style={{ margin: "0 auto" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;