import {
  Button,
  Card,
  Form,
  Image,
  Modal,
  Radio,
  Space,
  Table,
  Typography,
  Upload,
  message,
} from "antd";
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import uploadImage from "../../hooks/useUploadImage";
import { LuFlagTriangleRight } from "react-icons/lu";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

function LearningPageDetail() {
  const params = useParams();
  const [content, setContent] = useState([]);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [listChapter, setChapters] = useState([]);

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

        {/* <hr className="mt-5" />
        <Button className="link-report" onClick={() => setModal(true)}>
          <LuFlagTriangleRight />
          <span style={{ fontSize: "16px" }}>{""}Report an issue</span>
        </Button> */}
      </Card>

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
