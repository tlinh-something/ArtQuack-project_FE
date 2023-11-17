import "bootstrap/dist/css/bootstrap.min.css";
// import "./InstructorPage.css"
// import Footer from '../footer/Footer';
// import NavbarIns from '../navbar/NarbarIns';
import AllCourse from "../UserPage/AllCourse";

function InstructorPage() {
  return (
    <div className="all-course">
      <h2 style={{ textAlign: "center", color: "orange" }}>
        Discover more courses
      </h2>
      <AllCourse />
    </div>
  );
}

export default InstructorPage;
