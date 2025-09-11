import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../DatePicker/DateRPicker";

const Home = function () {
  const [range, setRange] = useState([new Date(), new Date()]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();

  const handleChange = function (setter, value) {
    setter((prev) => Math.max(0, prev + value));
  };

  const goDetailsPage = function () {
    navigate("/detail");
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
        <Form className="d-flex align-items-center justify-content-center border border-danger">
          <DateRangePicker value={range} onChange={setRange} placeholder="select range of dates" />
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
        <Row className="align-items-center border border-danger">
          <Col md={4}>
            <Image src="https://picsum.photos/200/300" />
          </Col>
          <Col md={4}>
            descrizione stanza Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem incidunt ut temporibus obcaecati! Sequi temporibus molestias
            ab rerum doloribus culpa, unde dolore aliquid distinctio quam quaerat est quisquam sit aliquam. Consequatur numquam quis, velit ratione sit,
            eligendi magnam reiciendis reprehenderit cumque rerum obcaecati enim quia alias earum corrupti modi fugit ad tempore incidunt harum ut hic
            doloremque repellat facilis. Distinctio? Earum eos aut nemo eum sapiente ad, optio expedita
          </Col>
          <Col
            md={4}
            className="d-flex flex-column justify-content-between"
            style={{
              height: "250px",
            }}
          >
            <Button>prenota</Button>
            <Button onClick={goDetailsPage}>details</Button>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={4}>
            <Image src="https://picsum.photos/200/300" />
          </Col>
          <Col md={4}>
            descrizione stanza Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem incidunt ut temporibus obcaecati! Sequi temporibus molestias
            ab rerum doloribus culpa, unde dolore aliquid distinctio quam quaerat est quisquam sit aliquam. Consequatur numquam quis, velit ratione sit,
            eligendi magnam reiciendis reprehenderit cumque rerum obcaecati enim quia alias earum corrupti modi fugit ad tempore incidunt harum ut hic
            doloremque repellat facilis. Distinctio? Earum eos aut nemo eum sapiente ad, optio expedita
          </Col>
          <Col
            md={4}
            className="d-flex flex-column justify-content-between"
            style={{
              height: "250px",
            }}
          >
            <Button>prenota</Button>
            <Button onClick={goDetailsPage}>details</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
