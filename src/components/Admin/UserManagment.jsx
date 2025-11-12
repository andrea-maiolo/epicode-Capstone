import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, ListGroup, Pagination, Row, Spinner } from "react-bootstrap";
import AdminNav from "./AdmnNav/AdminNav";
import "./Admin.scss";
import { FaEnvelope } from "react-icons/fa";

const UserManagment = function () {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalP, setTotalP] = useState(null);
  const [totalPagesArray, setTotalPagesArray] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`http://localhost:3001/users?pageNumber=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorFromDb = await response.json();
        throw new Error(errorFromDb.message);
      }

      const data = await response.json();
      setUsers(data.content);
      setTotalP(data.totalPages);
      createTotalPagesArray(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createTotalPagesArray = function (total) {
    let tempArray = [];
    for (let i = 0; i < total; i++) {
      tempArray.push(i);
    }
    setTotalPagesArray(tempArray);
  };

  const handlePrevPage = () => {
    if (page == 0) {
      return;
    } else {
      setPage(page - 1);
      fetchUsers();
    }
  };

  const handleNextPage = () => {
    if (page == totalP - 1) {
      return;
    } else {
      setPage(page + 1);
      fetchUsers();
    }
  };

  const handlePageChange = function (e) {
    const pageToNavigate = e.target.innerHTML;
    setPage(pageToNavigate - 1);
  };

  const handleRefresh = function () {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 text-primary">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminNav />
        <Container fluid className="manager-main">
          <Alert variant="danger" className="mt-4">
            <Alert.Heading>Error loading</Alert.Heading>
            {error}
            <hr />
            <div>
              <Button variant="dark" onClick={() => handleRefresh()}>
                Try again
              </Button>
            </div>
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

        <div>
          <Pagination>
            <Pagination.Prev onClick={handlePrevPage} />
            {totalPagesArray.map((page) => {
              return (
                <Pagination.Item key={page} onClick={handlePageChange}>
                  {page + 1}
                </Pagination.Item>
              );
            })}
            <Pagination.Next onClick={handleNextPage} />
          </Pagination>
        </div>

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
                    <Button variant="primary" href={`mailto:${user.email}`} className="mt-3">
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
