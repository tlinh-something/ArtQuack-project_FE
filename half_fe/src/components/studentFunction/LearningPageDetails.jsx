import {
  Button,
  Card,
  Form,
  Image,
  Table,
  Typography,
  Upload,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import uploadImage from "../../hooks/useUploadImage";

function LearningPageDetail() {
  const params = useParams();
  const [content, setContent] = useState([]);
  const [image, setImage] = useState(null);
  const fetchContent = () => {
    api.get(`/api/item/${params.itemID}`).then((response) => {
      setContent(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchContent();
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
        `/api/Item/${content}/Learner/${account.learnerID}/complete`,
        data
      );
      console.log(respone.data);
      message.success("File submitted successfully!");
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

  return (
    <Card title={`${content.itemName}`} bordered={false}>
      {content.content && generateContent(content.content)}
      
      {/* {content.itemName.includes("Peer") && (
        <Card style={{ marginTop: 16 }}>
          <Form layout="vertical">
            <Form.Item label="Upload File">
              <Upload.Dragger
                name="file"
                accept=".pdf,.png, .jpg"
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
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card> */}
      {/* )} */}
    </Card>
  );
}

export default LearningPageDetail;
