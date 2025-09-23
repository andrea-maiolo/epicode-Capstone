import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png";

const UserManagment = function () {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("fetching");
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data.content);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Navbar className="bg-primary">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="Domus" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="roomManager" className="text-white">
              gestisci stanza
            </Nav.Link>
            <Nav.Link href="userManager" className="text-white">
              gestisci ospiti
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h2>User Directory</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>
                Full Name: {user.name} {user.surname}
              </h3>
              <p>Email: {user.email}</p>
              <a href={`mailto:${user.email}`}>Send Email</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagment;
