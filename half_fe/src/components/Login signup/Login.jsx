import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, notification } from "antd";
import api from "../../config/axios";

import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [noti, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const role = Form.useWatch("role", form);

  const onLogin = async (values) => {
    console.log(values);
    console.log(email, password, role);

    try {
      const res = await api.get(
        // `/api/login/email/${email}/password/${password}/role/${role}`
        `/api/login?email=${email}&password=${password}`
      );
      const user = res.data;
      console.log(user);
      localStorage.setItem("accessToken", JSON.stringify(user));
      if (user.role === "learner") {
        window.location = "/user";
      } else if (user.role === "instructor") {
        window.location = "/instructor";
      } else if (user.role === "admin") {
        window.location.href = "http://localhost:3030";
      }
    } catch (e) {
      console.log(e);
      noti.error({
        message: e.response.data,
      });
    }
  };

  return (
    <div className="login-form">
      {contextHolder}
      <Form
        form={form}
        className="text-center"
        onFinish={onLogin}
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
        <div className="animation-title">
          <span></span>
        </div>

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

        {/* <Form.Item
          className="w-50 mx-auto"
          label="Role"
          name="role"
          initialValue={"learner"}
          rules={[{ required: true, message: "Choose role to identify" }]}
        >
          <Radio.Group>
            <Radio className="mx-auto" value="learner">
              Learner
            </Radio>
            <Radio className="mx-auto" value="instructor">
              Instructor
            </Radio>
          </Radio.Group>
        </Form.Item> */}

        <Button htmlType="submit">Login</Button>

        <div className="mt-5">
          <Link to={"/register"} style={{ color: "#fc8f1a" }}>
            Create account
          </Link>
        </div>
        {/* <div>
          <a href={"http://localhost:3030/login"} style={{ color: "#fc8f1a" }}>
            Login as ADMIN
          </a>
        </div> */}
      </Form>
    </div>
  );
}
export default Login;
