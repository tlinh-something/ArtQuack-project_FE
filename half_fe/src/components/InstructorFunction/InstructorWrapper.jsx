import { Tabs } from "antd";
import InstructorPage from "./InstructorPage";
import MyCourse from "./MyCourse";
import SubmissionPageNew from "./SubmissionPageNew";

const InstructorWrapper = () => {
    // const account = JSON.parse(localStorage.getItem('accessToken'))
  const items = [
    {
      key: "1",
      label: "All Course",
      children: <InstructorPage />,
    },
    {
      key: "2",
      label: "My Course",
      children: <MyCourse />,
    },
    {
      key: "3",
      label: "Submission",
      children: <SubmissionPageNew />,
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

export default InstructorWrapper;
