import { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
  <Navbar data-bs-theme="dark" style={{height:'90px',backgroundColor:'lightgreen',borderRadius:"10px",marginBottom:'200px'}}>
        <Container>
          <img style={{width:'70px',height:'70px',borderRadius:'50px'}} src="https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/07/3b/5d/073b5d23-2122-c363-cddd-cffb4303870c/source/256x256bb.jpg" alt="" />
          <Nav className="me-auto">
            <Nav.Link href="/home" style={{marginLeft:"30px",color:'black'}}>Home</Nav.Link>
            <Nav.Link href="/scorecard" style={{marginLeft:"30px",color:'black'}}>New Match</Nav.Link>
            <Nav.Link href="/matches" style={{marginLeft:"30px",color:'black'}}>Match History</Nav.Link>
            <Nav.Link href="/register" style={{marginLeft:"30px",color:'black'}}>Add User</Nav.Link>
            <Button style={{marginLeft:'550px'}} variant="primary" href='/'>Log Out</Button>
          </Nav>
        </Container>
      </Navbar><br/>
    <div style={{ textAlign: "center", marginTop: "20px" }}><br/><br/>
      <h2>Admin Dashboard</h2><br/><br/>
      <table border="1" style={{ margin: "auto", width: "50%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Dashboard;
