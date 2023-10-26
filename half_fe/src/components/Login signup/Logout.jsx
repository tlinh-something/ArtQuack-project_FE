import { Link } from "react-router-dom"

function Logout(){
    localStorage.removeItem("accessToken")
    return <Link to="/" />
}
export default Logout