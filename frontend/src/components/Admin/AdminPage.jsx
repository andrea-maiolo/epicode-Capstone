import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";

const AdminPage = function () {
  const rooms = [101, 102, 103, 104, 105, 106, 107, 108, 109, 201, 202, 203, 204, 205, 206, 207];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <Navbar className="bg-primary">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="Domus" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="userProfile" className="text-white">
              gestisci stanza
            </Nav.Link>
            <Nav.Link href="userProfile" className="text-white">
              gestisci ospiti
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="mt-4">
        <Row className="fw-bold text-center mb-3">
          <Col md={1}>Room</Col>
          {days.map((day) => (
            <Col key={day} md={1}>
              {day}
            </Col>
          ))}
        </Row>
        {rooms.map((room) => (
          <Row key={room} className="text-center align-items-center mb-3">
            <Col md={1} className="fw=bold">
              {room}
            </Col>
            {days.map((day) => (
              <Col key={day} md={1}>
                <div
                  style={{
                    height: "60px",
                    backgroundColor: "#eee",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
};

export default AdminPage;
