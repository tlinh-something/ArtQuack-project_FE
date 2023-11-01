// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";

function ViewCourse() {
  const [chapter, setChapter] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  // const params = useParams()
  // const tp = params.courseId

  useEffect(() => {
    api.get(`/api/course/${id}/chapters`).then((response) => {
      setChapter(response.data);
    });
  }, []);

  return (
    <div>
      <form>
        <table className="table table-striped">
          <thead>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Chapter Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {chapter?.map((data, i) => (
              <tr key={i}>
                <td scope="row">{data.id}</td>
                <td>
                  <a href={`/instructor/item/${data.id}`}>{data.chapterName}</a>
                </td>
                <td>
                  <Link to={`/instructor/additem/${data.id}`}>Add item</Link>
                </td>
                <td>
                  <Link onClick={() => handleDelete(data.chapterID)}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <Link to={"/instructor/mycourse"}>Back</Link>
    </div>
  );

  function handleDelete(id) {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      api
        .delete("api/deletechapter/" + id)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          alert("Chapter has deleted");
          navigate("/instructor/mycourse");
        })
        .catch((error) => console.log(error));
    }
  }
}
export default ViewCourse;
