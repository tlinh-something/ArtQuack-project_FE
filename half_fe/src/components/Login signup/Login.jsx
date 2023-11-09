import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, notification } from "antd";
import api from "../../config/axios";
import "./LoginSignup.css";
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
        `/api/login/email/${email}/password/${password}/role/${role}`
      );
      console.log(res);
      const user = res.data;
      localStorage.setItem("accessToken", JSON.stringify(user));
      if (
        localStorage.getItem("accessToken") &&
        JSON.parse(localStorage.getItem("accessToken")).role === "learner"
      ) {
        window.location = "/user";
      } else if (
        localStorage.getItem("accessToken") &&
        JSON.parse(localStorage.getItem("accessToken")).role === "instructor"
      ) {
        window.location = "/instructor/mycourse";
      } else if (
        localStorage.getItem("accessToken") &&
        JSON.parse(localStorage.getItem("accessToken")).role === "admin"
      ) {
        window.location = "/admin";
      }
    } catch (e) {
      console.log(e);
      noti.error({
        message: e.response.data,
      });
      // toast.error(e.response.data);
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
              message: "The password should not empty",
            },
          ]}
        >
          <Input.Password className="flex flex-end" />
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Button htmlType="submit">Login</Button>

        <div className="mt-5">
          <Link to={"/register"} style={{ color: "#fc8f1a" }}>
            Create account
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default Login;
