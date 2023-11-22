import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Layout, Menu, Table, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { formatDistanceToNow } from "date-fns";
import { Outlet } from "react-router-dom";

function ReportPage() {
  const [reports, setReports] = useState([]);
  const account = JSON.parse(localStorage.getItem("accessToken"));

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const [items, setItems] = useState([
    getItem("Option 1", "1", null),
    getItem("Option 2", "2", null),
    getItem("Option 3", "3", null),
  ]);

  useEffect(() => {
    api
      .get(`/api/get-course-report/${account.instructorID}`)
      .then((response) => {
        setReports(response.data.filter((report) => report.report !== null));
        const reportList = response.data;
        console.log(reportList);
        console.log(reports.courseID);

        setItems(
          reportList
            .filter((report) => report.report !== null)
            .map((report) => {
              console.log(report);
              return getItem(report.name, `${report.courseID}`, null);
            })
        );

        console.log(
          reportList
            .filter((report) => report.report !== null)
            .map((report) => {
              return getItem(report.name, `${report.courseID}`, null);
            })
        );
      });
  }, []);

  const [reportContent, setReportContent] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    console.log("click ", e);
    console.log(e.key);
    api.get(`/api/get-reports-of-course/${e.key}`).then((response) => {
      console.log(response.data);
      setReportContent(response.data);
    });
  };

  return (
    <Layout
      style={{
        padding: "24px 0",
        background: colorBgContainer,
      }}
    >
      <Sider
        style={{
          background: colorBgContainer,
        }}
        width={200}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          onClick={onClick}
          style={{
            height: "100%",
          }}
          items={items}
        />
      </Sider>
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
              title: "Name",
              dataIndex: "learnerName",
              key: "learnerName",
              render: (text) => {
                return text.slice(0,3) 

              }
              
            },
            {
              title: "Type of issue",
              dataIndex: "typeOfReport",
              key: "typeOfReport",
            },
            {
              title: "Report description",
              dataIndex: "report",
              key: "report",
            },
            {
              title: "Date",
              dataIndex: "date",
              key: "date",
              render: (date) => {
                return (
                  date && (
                    <span>
                      {formatDistanceToNow(new Date(date), {
                        addSuffix: true,
                      })}
                    </span>
                  )
                );
              },
            },
          ]}
          dataSource={reportContent}
        />
      </Content>
    </Layout>
  );
}

export default ReportPage;
