import {
  Button,
  Card,
  Form,
  Image,
  Modal,
  Typography,
  Upload,
  message,
  Radio,
  Space,
} from "antd";
import { LuFlagTriangleRight } from "react-icons/lu";
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import uploadImage from "../../hooks/useUploadImage";
import { useForm } from "antd/es/form/Form";
function LearningPageDetail() {
  const REGEX = /^[a-zA-Z]+(([a-z A-Z,.!?])?[a-zA-Z]*)*$/;
  const params = useParams();
  const [content, setContent] = useState([]);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [listChapter, setChapters] = useState([]);
  const [report, setReport] = useState(false);
  const [form] = useForm();
  const [modal2, setModal2] = useState(false);
  const [form2] = useForm();
  const [render, setRender] = useState(0);
  const handleOk2 = () => {
    form2.submit();
  };

  const [editReport, setEditReport] = useState(
    {
      typeofreport: " ",
      report: " ",
    },
    []
  );
  const handleReportDetail = (e) => {
    setEditReport({
      ...editReport,
      typeofreport: e.target.value,
      report: e.target.value,
    });
  };
  const [modalReport, setModalReport] = useState(false);
  const handleReportOk = () => {
    form.submit();
  };

  const handleReportCancel = () => {
    setReport(false);
  };
  const fetchContent = () => {
    api.get(`/api/item/${params.itemID}`).then((response) => {
      setContent(response.data);
      console.log(response.data);
    });
  };

  // const fetchAppChapter = async () => {
  //   const respsonse = await api.get(`/api/all-of-course/${params.id}`);
  //   setChapters(respsonse.data);
  // };

  useEffect(() => {
    fetchContent();
    // fetchAppChapter();
  }, [params.itemID]);

  const handleFileUpload = async (file) => {
    setImage(await uploadImage(file.originFileObj));
  };

  const handleSubmit = async () => {
    if (image) {
      const data = {
        date: new Date().toISOString(),
        status: true,
        homework: image,
      };

      const account = JSON.parse(localStorage.getItem("accessToken"));
      const respone = await api.post(
        `/api/Item/${params.itemID}/Learner/${account.learnerID}/complete`,
        data
      );
      console.log(respone.data);
      console.log(data);
      message.success("File submitted successfully!");
      setIsModalOpen(false);
    } else {
      message.error("Please select a file to submit.");
    }
  };

  const generateContent = (content) => {
    if (content.startsWith("https")) {
      if (content.includes("youtu")) {
        return (
          <ReactPlayer
            url={content}
            width={"100%"}
            height={800}
            style={{
              height: 1000,
            }}
          />
        );
      } else {
        return (
          <video width={"100%"} autoPlay muted src={content.content} controls />
        );
      }
    } else {
      return <Typography.Text>{content}</Typography.Text>;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReport = (values) => {
    const data = {
      report: values.reportTitle,
      typeofreport: values.reportDetails,
      itemID: Number(content?.itemID),
      status: true,
      itemName: content?.itemName,
      content: content?.content,
    };
    api.put(
      `/api/item/${content?.itemID}/updateitem`,
      data
    );
    console.log(data);
    message.success("You report successfully");
    setRender(render + 1);
    setModal2(false);
    console.log(values.reportTitle);
    console.log(values.reportDetails);
  };
  
  console.log(content.report);
  useEffect(()=>{

  },[render]);
  return (
    <>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
            }}
          >
            {content.itemName}{" "}
            {content?.report !== null && content?.typeofreport !== null ? (
              <Link
                onClick={() => {
                  setModalReport(true);
                }}
                className="add-to-cart-btn d-inline-block fw-7 "
                style={{
                 
                  marginLeft: 20,
                }}
              >
                <LuFlagTriangleRight /> View Report
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setModal2(true);
                }}
                className="add-to-cart-btn d-inline-block fw-7 "
                style={{
                  
                  marginLeft: 20,
                }}
              >
                <LuFlagTriangleRight /> Report this video
              </Link>
            )}
            <Link to="/user" className="link-back">
              Back to home
            </Link>
            {/* <NextOrPrevButton list={listChapter} /> */}
          </div>
        }
        bordered={false}
      >
        {content.content && generateContent(content.content)}

        {content.itemName &&
          content.itemName.toLowerCase().startsWith("peer") && (
            <Card style={{ marginTop: 16 }}>
              <Form layout="vertical">
                <Form.Item label="Upload File">
                  <Upload.Dragger
                    name="file"
                    accept=".png, .jpg"
                    beforeUpload={false}
                    onChange={(info) => handleFileUpload(info.file)}
                  >
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>

                {image && <Image src={image} style={{ height: "400px" }} />}
                <Form.Item>
                  <Button type="primary" onClick={showModal}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
      </Card>
      <Modal
    title="View your report about this course"
    onOk={() => setModalReport(false)}
    open={modalReport}
    onCancel={() => setModalReport(false)}
  >
    <Form form={form} labelCol={{ span: 24 }} onFinish={handleReport}>
      <Form.Item
        label="Select issue you'd like to report"
        name="reportTitle"
        rules={[
          {
            required: true,
            message: "Select issue to know what type issue you want report",
          },
        ]}
      >
        <Radio.Group value={content?.typeofreport} disabled>
          <Space direction="vertical">
            <Radio value="Content Improvement"> Content improvement</Radio>
            <Radio value="Video Issues"> Video issues</Radio>
            <Radio value="Audio Issues"> Audio issues</Radio>
            <Radio value="Offensive Content"> Offensive content</Radio>
            <Radio value="Spammy Content"> Spammy content</Radio>
            <Radio value="Other"> Other</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Describe the issue"
        name={"reportDetails"}
        rules={[
          {
            pattern: REGEX,
            whitespace: true,
            message:
              "This description do not include space and special characters",
          },
        ]}
      >
        <TextArea rows={3} disabled />
      </Form.Item>
    </Form>
  </Modal>;
  <Modal
    title="Report an issue"
    onOk={handleOk2}
    open={modal2}
    onCancel={() => setModal2(false)}
  >
    <Form form={form2} labelCol={{ span: 24 }} onFinish={handleReport}>
      <Form.Item
        label="Select issue you'd like to report"
        name="reportTitle"
        rules={[
          {
            required: true,
            message: "Select issue to know what type issue you want report",
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="Content Improvement"> Content improvement</Radio>
            <Radio value="Video Issues"> Video issues</Radio>
            <Radio value="Audio Issues"> Audio issues</Radio>
            <Radio value="Offensive Content"> Offensive content</Radio>
            <Radio value="Spammy Content"> Spammy content</Radio>
            <Radio value="Other"> Other</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Describe the issue"
        name={"reportDetails"}
        rules={[
          {
            //   pattern: REGEX,
            //   whitespace: true,
            required: true,
            message:
              "This description do not include space and special characters",
          },
        ]}
      >
        <TextArea rows={3} value={content.typeofreport}/>
      </Form.Item>
    </Form>
  </Modal>;
      <Modal
        title="Ready to submit?"
        onOk={handleSubmit}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <p>
          You will not be able to make changes after submitting. Do you still
          want to submit this assessment?
        </p>
      </Modal>
    </>
  );
}

export default LearningPageDetail;

// const NextOrPrevButton = ({ list }) => {
//   const params = useParams();
//   const [index, setIndex] = useState(0);
//   const chapterID = params.id;
//   const itemId = params.itemID;

//   // check in chapter
//   useEffect(() => {
//     if (list) {
//       list.forEach((element, index) => {
//         console.log(chapterID);
//         if (Number(chapterID) === element.chapterID) {

//           element.items.forEach((item, index) => {
//             if (item.itemID === Number(itemId) && element.items[index + 1]) {
//               console.log(element.items[index + 1].itemID);
//               setIndex(element.items[index + 1].itemID);
//             }
//           });
//         }
//       });
//     }
//   }, [list]);

//   return <Link to={`/learning/${chapterID}/${index}`}>Next</Link>;
// };
