import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import '../UserProfile.css'

const UserProfile = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userEdit, setUserEdit] = useState({
    learnerID: "",
    name: "",
    email: "",
    password: "",
    status:"",
    role:"",
  });

  useEffect(() => {
    const fetchUser = () => {
      api.get(`/api/learner/${id}`).then((res) => {
        const userData = res.data;

        setUserEdit({
            learnerID:userData.learnerID,
          name: userData.name,
          email: userData.email,
          password: userData.password,
        status:userData.status,
        role:userData.role
        });
      });
    };

    fetchUser();
  }, [id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userEdit);
   
      const updateUser = async() => {
        const res =await api.put(`/api/learner/${id}/updatelearner`, userEdit);
        console.log(res);
      };

      updateUser();
      window.alert("Update successful!");
   
  };

  const handleEdit = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="container-profile">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userEdit.name}
              onChange={handleEdit}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userEdit.email}
              onChange={handleEdit}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={userEdit.password}
              onChange={(e) => handleEdit(e)}
              
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </label>
        <br></br>
          <button type="submit" style={{margin: '0 auto'}}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;