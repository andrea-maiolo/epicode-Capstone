import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import AdminNav from "./AdmnNav/AdminNav";
import "./Admin.scss";
import { FaEnvelope } from "react-icons/fa";

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
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
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
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 text-primary">Loading user directory...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminNav />
        <Container fluid className="manager-main">
          <Alert variant="danger" className="mt-4">
            Error loading user data: {error.message}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <AdminNav />
      <Container fluid className="manager-main py-5 px-md-5">
        <h2 className="display-4 mb-4 user-managment-heading">User Directory</h2>
        {users.length > 0 ? (
          <Row className="g-4">
            {users.map((user) => (
              <Col key={user.id} lg={4} md={6} sm={12}>
                <Card className="user-card h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <Card.Title className="mb-0 user-name">
                        {user.name} {user.surname}
                      </Card.Title>
                    </div>
                    <Card.Text>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="card-detail-item">
                          <strong className="detail-label">Email:</strong> {user.email}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Text>
                    <Button variant="primary" href={`mailto:${user.email}`} className="mt-3 card-action-button">
                      <FaEnvelope className="me-2" /> Send Email
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="mt-4 text-secondary">No users found.</p>
        )}
      </Container>
    </div>
  );
};

export default UserManagment;
