import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


const UserForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/users", user);
    alert("User created successfully!");
    setUser({ name: "", email: "", password: "" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px",backgroundColor:'lightskyblue',width:'450px',height:"500px" }}><br/><br/>
      <h2>User Registration</h2><br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
        <br /><br/>
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <br /><br/>
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
        <br /><br/>
        <button type="submit" style={{backgroundColor:"lightgreen"}}>Register</button>
      </form>
    </div>
  );
};

export default UserForm;
