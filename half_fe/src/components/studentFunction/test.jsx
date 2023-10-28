// import { Typography, Card, Layout, Menu, Button } from "antd";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";

// const { Sider, Content } = Layout;

// function LearningPage() {
//   const [chapters, setChapters] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedChapterId, setSelectedChapterId] = useState(null);
//   const [selectedItemId, setSelectedItemId] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/chapter")
//       .then((response) => {
//         setChapters(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .get("http://localhost:3000/item")
//       .then((response) => {
//         setItems(response.data);
//         setSelectedItemId(response.data[0].id);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleChapterClick = (chapterId) => {
//     setSelectedChapterId(chapterId);
//     setSelectedItemId(null);
//   };

//   const handleItemSelect = (itemId) => {
//     setSelectedItemId(itemId);
//   };

//   const handleNextItem = () => {
//     const currentIndex = items.findIndex((item) => item.id === selectedItemId);
//     const currentChapterIndex = chapters.findIndex(
//       (chapter) => chapter.id === selectedChapterId
//     );

//     if (currentIndex === items.length - 1) {
//       // Last item in the current chapter
//       if (currentChapterIndex === chapters.length - 1) {
//         // Last chapter reached, reset to the first chapter and first item
//         setSelectedChapterId(chapters[0].id);
//         setSelectedItemId(items[0].id);
//       } else {
//         // Go to the next chapter's first item
//         setSelectedChapterId(chapters[currentChapterIndex + 1].id);
//         setSelectedItemId(
//           items.find((item) => item.chapterId === chapters[currentChapterIndex + 1].id).id
//         );
//       }
//     } else {
//       // Go to the next item in the current chapter
//       setSelectedItemId(items[currentIndex + 1].id);
//     }
//   };

//   const VideoSidebar = () => {
//     return (
//       <Menu
//         mode="inline"
//         selectedKeys={[selectedItemId?.toString()]}
//         defaultOpenKeys={[selectedChapterId?.toString()]}
//       >
//         {chapters.map((chapter) => {
//           const chapterItems = items.filter((item) => item.chapterId === chapter.id);
//           return (
//             <Menu.SubMenu
//               key={chapter.id}
//               title={chapter.name}
//               onTitleClick={() => handleChapterClick(chapter.id)}
//               popupOffset={[0, -10]}
//               popupClassName="submenu-popup"
//             >
//               {chapterItems.map((item) => (
//                 <Menu.Item
//                   key={item.id}
//                   onClick={() => handleItemSelect(item.id)}
//                 >
//                   <Typography.Text>{item.name}</Typography.Text>
//                 </Menu.Item>
//               ))}
//             </Menu.SubMenu>
//           );
//         })}
//       </Menu>
//     );
//   };

//   const selectedItem = items.find((item) => item.id === selectedItemId);

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider theme="light" width={200}>
//         <VideoSidebar />
//       </Sider>
//       <Layout>
//         <Content style={{ padding: "16px" }}>
//           {selectedItem ? (
//             <Card
//               style={{
//                 marginBottom: 16,
//                 borderRadius: 8,
//                 boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <Typography.Title level={4}>{selectedItem.name}</Typography.Title>
//               {selectedItem.content && selectedItem.content.startsWith("https") ? (
//                 <ReactPlayer url={selectedItem.content} controls={true} width="100%" />
//               ) : (
//                 <Typography.Text>{selectedItem.content}</Typography.Text>
//               )}
//             </Card>
//           ) : (
//             <Typography.Text>
//               Please select an item from the sidebar to display the content.
//             </Typography.Text>
//           )}
//           <Button type="primary" onClick={handleNextItem}>
//             Next
//           </Button>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default LearningPage;





// import { Typography, Card, Layout, Menu, Button, message } from "antd";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";

// const { Sider, Content } = Layout;

// function LearningPage() {
//   const [chapters, setChapters] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedChapterId, setSelectedChapterId] = useState(null);
//   const [selectedItemId, setSelectedItemId] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/chapter")
//       .then((response) => {
//         setChapters(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .get("http://localhost:3000/item")
//       .then((response) => {
//         setItems(response.data);
//         setSelectedItemId(response.data[0].id);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleChapterClick = (chapterId) => {
//     setSelectedChapterId(chapterId);
//     setSelectedItemId(null);
//   };

//   const handleItemSelect = (itemId) => {
//     setSelectedItemId(itemId);
//   };

//   const handleNextItem = () => {
//     const currentIndex = items.findIndex((item) => item.id === selectedItemId);
//     const currentChapterIndex = chapters.findIndex(
//       (chapter) => chapter.id === selectedChapterId
//     );
  
//     if (currentIndex === items.length - 1) {
//       // Last item in the current chapter
//       if (currentChapterIndex === chapters.length - 1) {
//         // Last chapter reached, reset to the first chapter and first item
//         setSelectedChapterId(chapters[0].id);
//         setSelectedItemId(items[0].id);
//       } else {
//         // Go to the next chapter's first item
//         setSelectedChapterId(chapters[currentChapterIndex + 1].id);
//         setSelectedItemId(
//           items.find((item) => item.chapterId === chapters[currentChapterIndex + 1].id).id
//         );
//       }
//     } else {
//       // Go to the next item in the current chapter
//       setSelectedItemId(items[currentIndex + 1].id);
//     }
  
//     if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
//       // Last item in the last chapter
//       alert('End of list');
//       const confirmNavigation = window.confirm('Do you want to navigate to the home page?');
//       if (confirmNavigation) {
//         history.push('/home');
//       }
//     }
//   };

//   const VideoSidebar = () => {
//     return (
//       <Menu
//         mode="inline"
//         selectedKeys={[selectedItemId?.toString()]}
//         defaultOpenKeys={[selectedChapterId?.toString()]}
//       >
//         {chapters.map((chapter) => {
//           const chapterItems = items.filter((item) => item.chapterId === chapter.id);
//           return (
//             <Menu.SubMenu
//               key={chapter.id}
//               title={chapter.name}
//               onTitleClick={() => handleChapterClick(chapter.id)}
//               popupOffset={[0, -10]}
//               popupClassName="submenu-popup"
//             >
//               {chapterItems.map((item) => (
//                 <Menu.Item
//                   key={item.id}
//                   onClick={() => handleItemSelect(item.id)}
//                 >
//                   <Typography.Text>{item.name}</Typography.Text>
//                 </Menu.Item>
//               ))}
//             </Menu.SubMenu>
//           );
//         })}
//       </Menu>
//     );
//   };

//   const selectedItem = items.find((item) => item.id === selectedItemId);

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider theme="light" width={200}>
//         <VideoSidebar />
//       </Sider>
//       <Layout>
//         <Content style={{ padding: "16px" }}>
//           {selectedItem ? (
//             <Card
//               style={{
//                 marginBottom: 16,
//                 borderRadius: 8,
//                 boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <Typography.Title level={4}>{selectedItem.name}</Typography.Title>
//               {selectedItem.content && selectedItem.content.startsWith("https") ? (
//                 <ReactPlayer url={selectedItem.content} controls={true} width="100%" />
//               ) : (
//                 <Typography.Text>{selectedItem.content}</Typography.Text>
//               )}
//             </Card>
//           ) : (
//             <Typography.Text>
//               Please select an item from the sidebar to display the content.
//             </Typography.Text>
//           )}
//           {selectedItem && (
//             <Button type="primary" onClick={handleNextItem}>
//               Next
//             </Button>
//           )}
//           {!selectedItem && (
//             <div>
//               <Typography.Text>
//                 End of list. Redirecting to home...
//               </Typography.Text>
//               {/* Redirect to home or render a specific component */}
//               {/* e.g., history.push("/home"); */}
//               {/* or set a state variable to render a different component */}
//               {/* e.g., setEndOfList(true); */}
//             </div>
//           )}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default LearningPage;




// import { useEffect, useState } from 'react';
// import { Typography, Card, Layout, Menu, Button, Modal } from 'antd';
// import axios from 'axios';
// import ReactPlayer from 'react-player';
// import { useNavigate } from 'react-router-dom';

// const { Sider, Content } = Layout;

// function LearningPage() {
//   const [chapters, setChapters] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedChapterId, setSelectedChapterId] = useState(null);
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [isEndOfListAlertVisible, setEndOfListAlertVisible] = useState(false);

//   const history = useNavigate()

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/chapter')
//       .then(response => {
//         setChapters(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });

//     axios
//       .get('http://localhost:3000/item')
//       .then(response => {
//         setItems(response.data);
//         setSelectedItemId(response.data[0].id);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const handleChapterClick = chapterId => {
//     setSelectedChapterId(chapterId);
//     setSelectedItemId(null);
//   };

//   const handleItemSelect = itemId => {
//     setSelectedItemId(itemId);
//   };

//   const handleNextItem = () => {
//     const currentIndex = items.findIndex(item => item.id === selectedItemId);
//     const currentChapterIndex = chapters.findIndex(chapter => chapter.id === selectedChapterId);
  
//     if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
//       // Last item in the last chapter
//       setEndOfListAlertVisible(true);
//     } else {
//       let nextChapterId = selectedChapterId;
//       let nextItemId = selectedItemId;
  
//       if (currentIndex === items.length - 1) {
//         // Last item in the current chapter
//         if (currentChapterIndex === chapters.length - 1) {
//           // Last chapter reached, reset to the first chapter and first item
//           nextChapterId = chapters[0].id;
//           nextItemId = items[0].id;
//         } else {
//           // Go to the next chapter's first item
//           nextChapterId = chapters[currentChapterIndex + 1].id;
//           nextItemId = items.find(item => item.chapterId === chapters[currentChapterIndex + 1].id).id;
//         }
//       } else {
//         // Go to the next item in the current chapter
//         nextItemId = items[currentIndex + 1].id;
//       }
  
//       setSelectedChapterId(nextChapterId);
//       setSelectedItemId(nextItemId);
  
//       if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
//         // Last item in the last chapter
//         setEndOfListAlertVisible(true);
//       }
//     }
//   };

//   const VideoSidebar = () => {
//     return (
//       <Menu mode="inline" selectedKeys={[selectedItemId?.toString()]} defaultOpenKeys={[selectedChapterId?.toString()]}>
//         {chapters.map(chapter => {
//           const chapterItems = items.filter(item => item.chapterId === chapter.id);
//           return (
//             <Menu.SubMenu
//               key={chapter.id}
//               title={chapter.name}
//               onTitleClick={() => handleChapterClick(chapter.id)}
//               popupOffset={[0, -10]}
//               popupClassName="submenu-popup"
//             >
//               {chapterItems.map(item => (
//                 <Menu.Item key={item.id} onClick={() => handleItemSelect(item.id)}>
//                   <Typography.Text>{item.name}</Typography.Text>
//                 </Menu.Item>
//               ))}
//             </Menu.SubMenu>
//           );
//         })}
//       </Menu>
//     );
//   };

//   const selectedItem = items.find(item => item.id === selectedItemId);

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider theme="light" width={200}>
//         <VideoSidebar />
//       </Sider>
//       <Layout>
//         <Content style={{ padding: 16 }}>
//           {selectedItem ? (
//             <Card
//               style={{
//                 marginBottom: 16,
//                 borderRadius: 8,
//                 boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
//               }}
//             >
//               <Typography.Title level={4}>{selectedItem.name}</Typography.Title>
//               {selectedItem.content && selectedItem.content.startsWith('https') ? (
//                 <ReactPlayer url={selectedItem.content} controls={true} width="100%" />
//               ) : (
//                 <Typography.Text>{selectedItem.content}</Typography.Text>
//               )}
//             </Card>
//           ) : (
//             <Typography.Text>Please select an item from the sidebar to display the content.</Typography.Text>
//           )}
//           <Button type="primary" onClick={handleNextItem}>
//             Next
//           </Button>
//           <Modal
//             title="End of List"
//             open={isEndOfListAlertVisible}
//             onCancel={() => setEndOfListAlertVisible(false)}
//             onOk={() => {
//                 setEndOfListAlertVisible(false);
//                 history('/');
//             }}
//             okText="Navigate to Home"
//             cancelText="Cancel"
//             >
//             <p>This is the end of the list. Do you want to navigate to the home page?</p>
//             </Modal>
//             </Content>
//             </Layout>
//             </Layout>
//   )
//         }
//         export default LearningPage




// import { useEffect, useState } from 'react';
// import { Typography, Card, Layout, Menu, Button, Modal } from 'antd';
// import axios from 'axios';
// import ReactPlayer from 'react-player';
// import { useNavigate } from 'react-router-dom';

// const { Sider, Content } = Layout;

// function LearningPage() {
//   const [chapters, setChapters] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedChapterId, setSelectedChapterId] = useState(null);
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [isEndOfListAlertVisible, setEndOfListAlertVisible] = useState(false);

//   const history = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/chapter')
//       .then(response => {
//         setChapters(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });

//     axios
//       .get('http://localhost:3000/item')
//       .then(response => {
//         setItems(response.data);
//         setSelectedItemId(response.data[0].id);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const handleChapterClick = chapterId => {
//     setSelectedChapterId(chapterId);
//     setSelectedItemId(null);
//   };

//   const handleItemSelect = itemId => {
//     setSelectedItemId(itemId);
//   };

//   const handleNextItem = () => {
//     const currentIndex = items.findIndex(item => item.id === selectedItemId);
//     const currentChapterIndex = chapters.findIndex(chapter => chapter.id === selectedChapterId);

//     if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
//       // Last item in the last chapter
//       setEndOfListAlertVisible(true);
//     } else {
//       let nextChapterId = selectedChapterId;
//       let nextItemId = selectedItemId;

//       if (currentIndex === items.length - 1) {
//         // Last item in the current chapter
//         if (currentChapterIndex === chapters.length - 1) {
//           // Last chapter reached, reset to the first chapter and first item
//           nextChapterId = chapters[0].id;
//           nextItemId = items.find(item => item.chapterId === chapters[0].id)?.id;
//         } else {
//           // Go to the next chapter's first item
//           nextChapterId = chapters[currentChapterIndex + 1].id;
//           nextItemId = items.find(item => item.chapterId === chapters[currentChapterIndex + 1].id)?.id;
//         }
//       } else {
//         // Go to the next item in the current chapter
//         nextItemId = items[currentIndex + 1].id;
//       }

//       setSelectedChapterId(nextChapterId);
//       setSelectedItemId(nextItemId);

//       if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
//         // Last item in the last chapter
//         setEndOfListAlertVisible(true);
//       }
//     }
//   };

//   const VideoSidebar = () => {
//     return (
//       <Menu mode="inline" selectedKeys={[selectedItemId?.toString()]} defaultOpenKeys={[selectedChapterId?.toString()]}>
//         {chapters.map(chapter => {
//           const chapterItems = items.filter(item => item.chapterId === chapter.id);
//           return (
//             <Menu.SubMenu
//               key={chapter.id}
//               title={chapter.name}
//               onTitleClick={() => handleChapterClick(chapter.id)}
//               popupOffset={[0, -10]}
//               popupClassName="submenu-popup"
//             >
//               {chapterItems.map(item => (
//                 <Menu.Item key={item.id} onClick={() => handleItemSelect(item.id)}>
//                   <Typography.Text>{item.name}</Typography.Text>
//                 </Menu.Item>
//               ))}
//             </Menu.SubMenu>
//           );
//         })}
//       </Menu>
//     );
//   };

//   const selectedItem = items.find(item => item.id === selectedItemId);

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider theme="light" width={200}>
//         <VideoSidebar />
//       </Sider>
//       <Layout>
//         <Content style={{ padding: 16 }}>
//           {selectedItem ? (
//             <Card
//               style={{
//                 marginBottom: 16,
//                 borderRadius: 8,
//                 boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
//               }}
//             >
//               <Typography.Title level={4}>{selectedItem.name}</Typography.Title>
//               {selectedItem.content && selectedItem.content.startsWith('https') ? (
//                 <ReactPlayer url={selectedItem.content} controls={true} width="100%" />

//               ) : (
//                 <Typography.Text>{selectedItem.content}</Typography.Text>
//               )}
//             </Card>
//           ) : (
//             <Typography.Text>Please select an item from the sidebar to display the content.</Typography.Text>
//           )}
//           <Button type="primary" onClick={handleNextItem}>
//             Next
//           </Button>
//           <Modal
//             title="End of List"
//             open={isEndOfListAlertVisible}
//             onCancel={() => setEndOfListAlertVisible(false)}
//             onOk={() => {
//                 setEndOfListAlertVisible(false);
//                 history('/home');
//             }}
//             okText="Navigate to Home"
//             cancelText="Cancel"
//             >
//             <p>This is the end of the list. Do you want to navigate to the home page?</p>
//             </Modal>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default LearningPage;



import { useEffect, useState } from 'react';
import { Typography, Card, Layout, Menu, Button, Modal } from 'antd';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

function LearningPage() {
  const [chapters, setChapters] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEndOfListAlertVisible, setEndOfListAlertVisible] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/chapter')
      .then(response => {
        setChapters(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('http://localhost:3000/item')
      .then(response => {
        setItems(response.data);
        setSelectedItemId(response.data[0]?.id);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChapterClick = chapterId => {
    setSelectedChapterId(chapterId);
    setSelectedItemId(null);
  };

  const handleItemSelect = itemId => {
    setSelectedItemId(itemId);
  };

  const handleNextItem = () => {
    const currentIndex = items.findIndex(item => item.id === selectedItemId);
    const currentChapterIndex = chapters.findIndex(chapter => chapter.id === selectedChapterId);

    if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
      // Last item in the last chapter
      setEndOfListAlertVisible(true);
      console.log('haha')
    } else {
      let nextChapterId = selectedChapterId;
      let nextItemId = selectedItemId;
      console.log('huhu')

      if (currentIndex === items.length - 1) {
        // Last item in the current chapter
        // if (currentChapterIndex === chapters.length - 1) {
        //   // Last chapter reached, reset to the first chapter and first item
        //   nextChapterId = chapters[0]?.id;
        //   nextItemId = items[0]?.id;
        //   console.log('huhi')
        // } 
        // else
        //  {
          // Go to the next chapter's first item
          nextChapterId = chapters[currentChapterIndex + 1]?.id;
          nextItemId = items.find(item => item.chapterId === chapters[currentChapterIndex + 1]?.id)?.id;
          console.log('huha')
        //}
        console.log('kaka')
      } else {
        // Go to the next item in the current chapter
        nextItemId = items[currentIndex + 1]?.id;
        console.log('wwhatt')
      }

      setSelectedChapterId(nextChapterId);
      setSelectedItemId(nextItemId);
      console.log('akaka')
      if (currentIndex === items.length - 1 && currentChapterIndex === chapters.length - 1) {
        console.log('hiih')
        // Last item in the last chapter
        setEndOfListAlertVisible(true);
      }
    }
  };

  const VideoSidebar = () => {
    return (
      <Menu mode="inline" selectedKeys={[selectedItemId?.toString()]} defaultOpenKeys={[selectedChapterId?.toString()]}>
        {chapters.map(chapter => {
          const chapterItems = items.filter(item => item.chapterId === chapter.id);
          return (
            <Menu.SubMenu
              key={chapter.id}
              title={chapter.name}
              onTitleClick={() => handleChapterClick(chapter.id)}
              popupOffset={[0, -10]}
              popupClassName="submenu-popup"
            >
              {chapterItems.map(item => (
                <Menu.Item key={item.id} onClick={() => handleItemSelect(item.id)}>
                  <Typography.Text>{item.name}</Typography.Text>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    );
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={200}>
        <VideoSidebar />
      </Sider>
      <Layout>
        <Content style={{ padding: 16 }}>
          {selectedItem ? (
            <Card
              style={{
                marginBottom: 16,
                borderRadius: 8,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Typography.Title level={4}>{selectedItem.name}</Typography.Title>
              {selectedItem.content && selectedItem.content.startsWith('https') ? (
                <ReactPlayer url={selectedItem.content} controls={true} width="100%" />
              ) : (
                <Typography.Text>{selectedItem.content}
                </Typography.Text>
              )}
            </Card>
          ) : (
            <Typography.Text>Please select an item from the sidebar to display the content.</Typography.Text>
          )}
          <Button type="primary" onClick={handleNextItem}>
            Next
          </Button>
          <Modal
            title="End of List"
            open={isEndOfListAlertVisible}
            onCancel={() => setEndOfListAlertVisible(false)}
            onOk={() => {
              setEndOfListAlertVisible(false);
              history('/');
            }}
            okText="Navigate to Home"
            cancelText="Cancel"
          >
            <p>This is the end of the list. Do you want to navigate to the home page?</p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LearningPage;