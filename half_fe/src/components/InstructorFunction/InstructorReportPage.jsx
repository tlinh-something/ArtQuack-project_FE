import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Layout, Menu, Table, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { formatDistanceToNow } from "date-fns";
import { Outlet } from "react-router-dom";
import ReactPlayer from "react-player";
import {Button,Form,Modal,Switch,Upload,Input} from "antd"
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

function ReportPage() {
  const [reports, setReports] = useState([]);
  const account = JSON.parse(localStorage.getItem("accessToken"));
  const [InsCourse, setInsCourse] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [currentItemID, setCurrentItemID] = useState(null);
  const WORD_REGEX = /^[a-zA-Z]+(([a-z A-Z])?[a-zA-Z]*)*$/;
  const [contentType, setContentType] = useState("file");
  const [form] = useForm();
  const [render, setRender] = useState(0);
  const [itemNameExist,setItemNameExist]=useState(" ");
  const { TextArea } = Input;
  const handleOk = () => {

    form.submit();
  };

  const handleCancel = () => {
    setCurrentItemID(null);
  };
  let itemList = [];
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const fetchInsCourse = () => {
    api
      .get(`api/instructor/${account.instructorID}/coursesOfInstructor`)
      .then((res) => {
        setInsCourse(res.data);
      });
  };
  const fetchCourseChapter = () => {};
  const [items, setItems] = useState([]);
  const [report, setReport] = useState([]);
  const [course, setCourse] = useState([]);
  const [solvedReports, setSolvedReports] = useState([]);
  
  const handleSolve = (reportId) => {
    setSolvedReports([...solvedReports, reportId]);
  };
  useEffect(() => {
    api
      .get(`/api/instructor/${account.instructorID}/courses-chapters-items`)
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
        // Assuming you have the courseList with the courses fetched from the API
        const courseList = response.data;

        // Extract chapters into a separate list
        const chaptersList = courseList.flatMap(
          (course) => course.chaptersList
        );

        // Now you have a list of chapters from all courses

        // Example: Logging the chaptersList
        setItems(
          chaptersList.flatMap((chapter) =>
            chapter.itemsList.map((item) => Number(item.itemID))
          )
        );

        // Now you have an array containing all the itemIDs from the itemsList

        // Example: Logging the itemList
      });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log(items);
        const itemPromises = items.map((itemID) =>
          api.get(`/api/item/${itemID}`)
        );
        const itemResponses = await Promise.all(itemPromises);
        setReport(itemResponses.map((response) => response.data));
        // Do something with the fetched items
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [items]);

  const [reportContent, setReportContent] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const onClick = (e) => {
  //   console.log("click ", e);
  //   console.log(e.key);
  //   {
  //     report.filter(
  //       (item) =>
  //         item.report !== null &&
  //         item.typeofreport !== null &&
  //         item.courseID == e
  //     );
  //   }
  // };
  useEffect(() => {
    const filteredReport = report.filter((item) => item.report !== null);
    setReport(filteredReport);
  }, []);
  console.log(report);
  const handleFinish = async (values) => {
    const data = {
      ...values,
      
      itemID: currentItemID,
      content: contentType === "file" ? file : values.content,
      itemName: values.itemName,
      report: null,
      typeofreport:null,
    };
    console.log(data);
    console.log(currentItemID);
      const response = await api.put(
        `/api/item/${currentItemID}/updateitem`,
        data
      );
      form.resetFields();
      swal("Success!", "Successfully update item", "success");
      handleCancel();
      setRender(render + 1);
    
  };
  // setItemNameExist(report.find((item) => item.id === currentItemID));
  
  return (
    <Layout
      style={{
        padding: "24px 0",
        background: colorBgContainer,
        width:"1650px",
        margin:"0 auto"
      }}
    >
      {/* <Sider
        style={{
          background: colorBgContainer,
        }}
        width={300}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          onClick={onClick}
          style={{
            height: "100%",
          }}
        >
          {course.map((courseItem) => {
            if (courseItem.courseStatus === "ACTIVE") {
              return (
                <Menu.Item key={courseItem.courseID}>
                  {courseItem.name}
                </Menu.Item>
              );
            }
            return null;
          })}
        </Menu>
      </Sider> */}
      <Content
        style={{
          padding: "0 24px",
          minHeight: 280,
        }}
      >
        {/* <Outlet /> */}
        <Table
          columns={[
            {
              title: "Item name",
              dataIndex: "itemName",
              key: "itemName",
            },
            {
              title: "Content",
              dataIndex: "content",
              key: "content",
              render: (content) => {
                return (
                  <ReactPlayer
                    url={content}
                    controls={true}
                    width="100%"
                    height="250px"
                  />
                );
              },
            },
            {
              title: "Type of issue",
              dataIndex: "report",
              key: "report",
            },
            {
              title: "Report description",
              dataIndex: "typeofreport",
              key: "typeofreport",
            },
            {
              title: "Chapter",
              dataIndex: "chapterName",
              key: "chapterName",
            },
            {
              title: "Course",
              dataIndex: "courseName",
              key: "courseName",
            },
            {
              title: "Solving",
              dataIndex: "date",
              key: "date",
              render: (text, record) => (
                <Button onClick={() => setCurrentItemID(record.itemID)}>
                  Solve
                </Button>
              ),
            },
            {},
          ]}
          dataSource={report.filter(
            (item) =>
              item.report !== null &&
              item.typeofreport !== null &&
              item.report !== "NULL"
          )}
          onRow={(record) => ({
            onClick: () => console.log(record.itemID),
          })}
        />
      </Content>
      <Modal
        title={"Update"}
        open={currentItemID !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={null}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleFinish}
        >
          

          <Form.Item
            label="Item Name"
            name={"itemName"}
            rules={[
              {
                required: true,
                pattern: WORD_REGEX,
                message: "Enter item name",
              },
            ]}
          >
           <Input/>
          </Form.Item>

       

          <Switch
            defaultChecked
            checkedChildren="File"
            unCheckedChildren="Text"
            style={{ marginBottom: 10 }}
            onChange={(value) => {
              if (value === false) {
                setContentType("text");
              } else {
                setContentType("file");
              }
            }}
          />
          {contentType === "file" ? (
            <Form.Item
              label="Content"
              name={"content"}
              rules={[
                {
                  required: true,
                  message: "Enter video",
                },
              ]}
            >
              <Upload.Dragger
                name="file"
                accept=".mp4"
                beforeUpload={false}
                // onChange={(info) => handleFileUpload(info.file)}
              >
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
              {/* <Dragger {...props}>
                <p className="ant-upload-drag-icon"></p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger> */}
            </Form.Item>
          ) : (
            <Form.Item
              label="Content"
              name={"content"}
              rules={[
                {
                  required: true,
                  // pattern: WORD_REGEX,
                  message: "Enter link video (such as youtube) or content",
                },
              ]}
            >
              <TextArea placeholder="Enter your content..." />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Layout>
  );
}

export default ReportPage;
