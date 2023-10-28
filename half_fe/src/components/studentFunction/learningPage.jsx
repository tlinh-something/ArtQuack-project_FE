import { Typography, Card, Layout, Menu, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const { Sider, Content } = Layout;

function LearningPage() {
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:3000/item")
      .then((response) => {
        setContent(response.data);
        setSelectedContent(response.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSidebarClick = (content) => {
    setSelectedContent(content);
  };

  const handleNextButtonClick = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < content.length) {
      setSelectedContent(content[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const VideoSidebar = ({ id, name, content }) => {
    return (
      <Menu.Item key={id} onClick={() => handleSidebarClick({ name, content })}>
        <Typography.Text>{name}</Typography.Text>
      </Menu.Item>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={200}>
        <Menu mode="vertical">
          {content.map((data) => (
            <VideoSidebar key={data.id} id={data.id} name={data.name} content={data.content} />
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "16px" }}>
          {selectedContent ? (
            <Card style={{ marginBottom: 16, borderRadius: 8, boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}>
              <Typography.Title level={4}>{selectedContent && selectedContent.name}</Typography.Title>
              {selectedContent && selectedContent.content && selectedContent.content.startsWith("https") ? (
                <ReactPlayer url={selectedContent.content} controls={true} width="100%" />
              ) : (
                <Typography.Text>{selectedContent && selectedContent.content}</Typography.Text>
              )}
            </Card>
          ) : (
            <Typography.Text>Please select a sidebar item to display the content.</Typography.Text>
          )}
          <Button type="primary" onClick={handleNextButtonClick} disabled={currentIndex === content.length - 1}>Next</Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LearningPage;