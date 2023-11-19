import { Tabs } from "antd";
import UserHomePage from "./UserHomePage";
import UserCourse from "./UserCourse";
import ViewSubmission from "../studentFunction/ViewSubmission";

const UserWrapper = () => {
  // const account = JSON.parse(localStorage.getItem('accessToken'))
  const items = [
    {
      key: "1",
      label: "All Courses",
      children: <UserHomePage />,
    },
    {
      key: "2",
      label: "My Learning",
      children: <UserCourse />,
    },
    {
      key: "3",
      label: "Submissions",
      children: <ViewSubmission />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      indicatorSize={(origin) => origin - 16}
    />
  );
};

export default UserWrapper;
