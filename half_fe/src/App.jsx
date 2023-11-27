import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer/Footer";
import { Home, Courses, SingleCourse } from "./components/pages/index";
import Register from "./components/Register/Register";
// import RegisterIns from './components/Register/RegisterIns';
// import Add from "./components/InstructorFunction/AddCourse";
import MyCourse from "./components/InstructorFunction/MyCourse";
import Update from "./components/InstructorFunction/UpdateCourse";
// import ViewCourse from "./components/InstructorFunction/ViewCourse";
import AddItem from "./components/InstructorFunction/AddItem";
import AddChapter from "./components/InstructorFunction/AddChapter";
import ViewItem from "./components/InstructorFunction/ViewItem";
import BlogPage from "./components/Blog/BlogPage";
import LoginSignup from "./components/Login signup/LoginSignup";
import Login from "./components/Login signup/Login";
import LearningPage from "./components/studentFunction/learningPage";
import EnrollCourse from "./components/studentFunction/enrollCourse";
import BlogDetails from "./components/Blog/BlogDetails";
import AddChapterNew from "./components/InstructorFunction/AddChapterNew";
import UserHomePage from "./components/UserPage/UserHomePage";
import UserCourse from "./components/UserPage/UserCourse";
import NavBarNew from "./components/navbar/NewNav";
// import AllCourse from "./components/UserPage/AllCourse";
// import AllCourse from "./components/UserPage/AllCourse";
import SubmissionPageNew from "./components/InstructorFunction/SubmissionPageNew";
import SubmitPageDetail from "./components/InstructorFunction/SubmitPageDetail";
import ViewSubmission from "./components/studentFunction/ViewSubmission";
import ViewSubmitDetail from "./components/studentFunction/ViewSubmitDetail";
import InstructorPage from "./components/InstructorFunction/InstructorPage";
import UserRate from "./components/UserPage/UserRate";
import UserProfile from "./components/UserPage/UserProfile";
import { ConfigProvider } from "antd";
import LearningPageNew from "./components/studentFunction/learningPageNew";
import LearningPageDetail from "./components/studentFunction/LearningPageDetails";
import InsProfile from "./components/InstructorFunction/InsProfile";
import UserWrapper from "./components/UserPage/UserWrapper";
import InstructorWrapper from "./components/InstructorFunction/InstructorWrapper";

import GuestCoursePage from "./components/pages/GuestCoursePage";
import CoursesPage from "./components/pages/CoursePage";
import SearchPage from "./components/pages/SearchPage";
import ReportPage from "./components/InstructorFunction/InstructorReportPage";
import ReportDetails from "./components/InstructorFunction/ReportPageDetails";
import ViewStatusCourse from "./components/InstructorFunction/ViewStatusCourse";
import TransactionPage from "./components/InstructorFunction/TransactionPage";
import TransactionLearner from "./components/studentFunction/TransactionLearner";
import InstructorRoute from "./components/InstructorRoute";
import LearnerRoute from "./components/LearnerRoute";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#ff6e01",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#fff",
        },
      }}
    >
      <BrowserRouter>
        <Sidebar />
        <NavBarNew />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:id" element={<SingleCourse />} />
          <Route path="/guest/courses/:id" element={<SingleCourse />} />

          <Route path="/login/v2" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses/category/:id" element={<CoursesPage />} />
          <Route path="/search/:id" element={<SearchPage />} />
          <Route path="/guest/courses/:id" element={<GuestCoursePage/>}/>

          {/* <Route path="/category/:category" element={<Courses />} /> */}
          {/* <Route path = "/registerIns" element = {<RegisterIns />} /> */}
          {/* <Route path="/blog" element={<BlogPage />} /> */}
          {/* <Route path="/:postID" element={<BlogDetails />} /> */}
          {/* <Route path="/login" element={<LoginSignup />} /> */}
          <Route path="" element={<LearnerRoute />}>
            <Route path="/user" element={<UserWrapper />} />
            <Route path="/user/mycourse" element={<UserCourse />} />
            <Route path="user/rate/:id" element={<UserRate />} />
            <Route path="user/profile/:id" element={<UserProfile />} />
            <Route
              path="/learner/transaction"
              element={<TransactionLearner />}
            />
            <Route path="/enroll" element={<EnrollCourse />} />
            <Route path="/learning/:id" element={<LearningPageNew />}>
              <Route path=":itemID" element={<LearningPageDetail />} />
            </Route>
            <Route path="/user/submission" element={<ViewSubmission />}>
              <Route path=":id" element={<ViewSubmitDetail />} />
            </Route>
          </Route>

          {/* <Route path="/instructor" element={<AllCourse />} /> */}
          <Route path="" element={<InstructorRoute />}>
            <Route path="/instructor/mycourse" element={<MyCourse />} />
            <Route path="/instructor" element={<InstructorWrapper />} />
            <Route path="/instructor/profile/:id" element={<InsProfile />} />
            <Route path="/instructor/addchapter/:id" element={<AddChapter />} />
            <Route path="/instructor/update/:courseID" element={<Update />} />
            <Route path="/instructor/chapter/:id" element={<AddChapterNew />} />
            <Route path="/instructor/item/:id" element={<ViewItem />} />
            <Route path="/instructor/additem/:id" element={<AddItem />} />
            <Route
              path="/instructor/coursestatus"
              element={<ViewStatusCourse />}
            />
            <Route
              path="/instructor/transaction"
              element={<TransactionPage />}
            />
            <Route path="/instructor/report" element={<ReportPage />}>
              <Route path=":id" element={<ReportDetails />} />
            </Route>
            {/* <Route path="/learning/:id" element={<LearningPage />} /> */}
            <Route
              path="/instructor/submission"
              element={<SubmissionPageNew />}
            >
              <Route path=":id" element={<SubmitPageDetail />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
