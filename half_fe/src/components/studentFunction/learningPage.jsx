import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Layout,
  Menu,
  Button,
  Form,
  Upload,
  message,
  Image,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../../hooks/useUploadImage";
import api from "../../config/axios";
import ReactPlayer from "react-player";

const { Sider, Content } = Layout;

function LearningPage() {
  const [chapters, setChapters] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const params = useParams();

  const fetchCourse = async () => {
    const response = await api.get(`/api/courses/${params.id}`);
    console.log(response);
  };

  const fetchChapters = async () => {
    const response = await api.get(`/api/course/${params.id}/chapters`);
    setChapters(response.data);
    console.log(response.data);
  };

  const fetchItems = async () => {
    const response = await api.get(`/api/items`);
    setItems(response.data);
    setSelectedItemId(response.data[0]?.id);
    setSelectedChapterId(response.data[0]?.chapterID);
    console.log(response.data);
  };

  useEffect(() => {
    fetchChapters();
    fetchItems();
    fetchCourse();
  }, []);

  const handleChapterClick = (chapterId) => {
    setSelectedChapterId(chapterId);
    setSelectedItemId(null);
  };

  const handleItemSelect = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleFileUpload = async (file) => {
    setImage(await uploadImage(file.originFileObj));
    // setFile(file);
  };

  //submit peer graded take the link to db
  const handleSubmit = async () => {
    if (image) {
      const data = {
        date: new Date().toISOString(),
        status: true,
        homework: image,
      };

      const account = JSON.parse(localStorage.getItem("accessToken"));
      const respone = await api.post(
        `/api/Item/${selectedItemId}/Learner/${account.learnerID}/complete`,
        data
      );
      console.log(respone.data);
      message.success("File submitted successfully!");
    } else {
      message.error("Please select a file to submit.");
    }
  };

  const VideoSidebar = () => {
    return (
      <Menu
        mode="inline"
        selectedKeys={[selectedItemId?.toString()]}
        defaultOpenKeys={[selectedChapterId?.toString()]}
      >
        {chapters.map((chapter) => {
          const chapterItems = items.filter(
            (item) => item.chapterID === chapter.chapterID
          );
          return (
            <Menu.SubMenu
              key={chapter.chapterID}
              title={chapter.chapterName}
              onTitleClick={() => handleChapterClick(chapter.chapterID)}
              popupOffset={[0, -10]}
              popupClassName="submenu-popup"
            >
              {chapterItems.map((item) => (
                <Menu.Item
                  key={item.itemID}
                  onClick={() => handleItemSelect(item.itemID)}
                >
                  <Typography.Text>{item.itemName}</Typography.Text>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    );
  };

  const selectedItem = items.find((item) => item.itemID === selectedItemId);

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
          <video
            width={"100%"}
            autoPlay
            muted
            src={selectedItem.content}
            controls
          />
        );
      }
    } else {
      return <Typography.Text>{content}</Typography.Text>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={300}>
        <VideoSidebar />
      </Sider>
      <Layout>
        <Content
          style={{
            height: "100vh",
          }}
        >
          {selectedItem ? (
            <Card
              style={{
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography.Title level={4} style={{ paddingBottom: 0 }}>
                {selectedItem.itemName}
              </Typography.Title>
              {selectedItem.content && generateContent(selectedItem.content)}
              {selectedItem.itemName.toLowerCase().startsWith("peer") && (
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

                    {image && <Image src={image} />}
                    <Form.Item>
                      <Button type="primary" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              )}
            </Card>
          ) : (
            <Typography.Text>This chapter has no content yet.</Typography.Text>
          )}

          <Button type="primary" className="mt-4" onClick={() => navigate("/user/mycourse")}>
            Back to Home
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LearningPage;
