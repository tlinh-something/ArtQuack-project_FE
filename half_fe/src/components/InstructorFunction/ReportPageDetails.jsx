import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Table } from "antd";

function ReportDetails() {
  const params = useParams();
  const [reportContent, setReportContent] = useState([]);

  console.log(params.id);

  useEffect(() => {
    api.get(`/api/enrollment/course/${params.id}`).then((response) => {
      console.log(response.data);
      setReportContent(response.data);
    });
  }, []);

  return (
    <Table
      columns={[
        {
          title: "Name",
          dataIndex: "learnerName",
          key: "learnerName",
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
  );
}
export default ReportDetails;
