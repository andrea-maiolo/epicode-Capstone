import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useState } from "react";
import "./home.scss";

const Home = function () {
  const [selectedDate, setSelectedDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleChange = function (setter, value) {
    setter((prev) => Math.max(0, prev + value));
  };

  return (
    <>
      <Navbar className="bg-primary">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="Domus" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="userProfile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="bg-primary text-white px-2">Browse our rooms</div>
      <Container>
        <Form className="d-flex align-items-center justify-content-center">
          <Form.Group>
            <Form.Label>pick a date</Form.Label>
            <Form.Control type="date" className="custom-date"></Form.Control>
          </Form.Group>
          <Dropdown as={ButtonGroup}>
            <Button variant="outline-primary">
              {adults} Adults · {children} Children · {rooms} Rooms
            </Button>
            <Dropdown.Toggle split variant="outline-primary" id="dropdown-split-basic" />
            <Dropdown.Menu style={{ minWidth: "250px" }}>
              {/* Adults */}
              <div className="d-flex justify-content-between align-items-center p-2">
                <span>Adults</span>
                <div>
                  <Button size="sm" onClick={() => handleChange(setAdults, -1)}>
                    -
                  </Button>
                  <span className="mx-2">{adults}</span>
                  <Button size="sm" onClick={() => handleChange(setAdults, 1)}>
                    +
                  </Button>
                </div>
              </div>
              {/* Children */}
              <div className="d-flex justify-content-between align-items-center p-2">
                <span>Children</span>
                <div>
                  <Button size="sm" onClick={() => handleChange(setChildren, -1)}>
                    -
                  </Button>
                  <span className="mx-2">{children}</span>

                  <Button size="sm" onClick={() => handleChange(setChildren, 1)}>
                    +
                  </Button>
                </div>
              </div>
              {/* Rooms */}

              <div className="d-flex justify-content-between align-items-center p-2">
                <span>Rooms</span>

                <div>
                  <Button size="sm" onClick={() => handleChange(setRooms, -1)}>
                    -
                  </Button>
                  <span className="mx-2">{rooms}</span>

                  <Button size="sm" onClick={() => handleChange(setRooms, 1)}>
                    +
                  </Button>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
        <Row>
          <Col>
            <p>image stanza</p>
            <div>
              descrizione stanza
              <button>prenota</button>
              <button>details</button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
