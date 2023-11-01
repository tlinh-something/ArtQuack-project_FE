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
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../../hooks/useUploadImage";
import api from "../../config/axios";

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

  const handleSubmit = () => {
    if (image) {
      // Perform file upload logic
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={200}>
        <VideoSidebar />
      </Sider>
      <Layout>
        <Content>
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
              {selectedItem.content &&
              selectedItem.content.startsWith("https") ? (
                // <ReactPlayer
                //   muted
                //   autoplay
                //   url={selectedItem.content}
                //   controls={true}
                //   width="100%"
                // />
                <video
                  width={"100%"}
                  autoPlay
                  muted
                  src={selectedItem.content}
                  controls
                />
              ) : (
                <Typography.Text>{selectedItem.content}</Typography.Text>
              )}
              {selectedItem.itemName.toLowerCase().startsWith("peer") && (
                <Card style={{ marginTop: 16 }}>
                  <Form layout="vertical">
                    <Form.Item label="Upload File">
                      <Upload.Dragger
                        name="file"
                        // listType="picture-card"
                        accept=".pdf,.doc,.docx, .png"
                        // fileList={image ? [image] : []}
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

          <Button type="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LearningPage;
