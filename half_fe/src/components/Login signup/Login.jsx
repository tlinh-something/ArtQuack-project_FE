import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio } from "antd";
import api from "../../config/axios";
import "./LoginSignup.css";
function Login() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const role = Form.useWatch("role", form);

  const onLogin = (values) => {
    console.log(values);
    console.log(email, password, role);
    api
      .get(`/api/login/email/${email}/password/${password}/role/${role}`)
      .then((res) => {
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-form">
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
          <Link to={"/register"} style={{ color: "#fc4a1a" }}>
            Create account
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default Login;
