import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useState } from "react";
import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import DateRangePicker from "../DatePicker/DateRPicker";

const Home = function () {
  const [range, setRange] = useState([new Date(), new Date()]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [roomsFromDb, setRoomsFromDb] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URl = "http://localhost:3001";

  const fetchRooms = async function () {
    try {
      const response = await fetch(`${API_URl}/rooms`);

      if (!response.ok) {
        throw new Error("Could not get rooms");
      }

      const data = await response.json();
      setRoomsFromDb(data.content);
      console.log(roomsFromDb);
    } catch (error) {
      setError(error.messaage);
    }
  };

  const handleChange = function (setter, value) {
    setter((prev) => Math.max(0, prev + value));
  };

  const goDetailsPage = function (e) {
    // navigate("/detail");
    console.log(e);
    console.log(room);
  };

  const goToBooking = function (room) {
    console.log(room);
    // navigate("/booking");
  };

  const handleSearch = function (e) {
    e.preventDefault();
    fetchRooms();
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

      <Form className="d-flex align-items-center justify-content-center border border-danger" onSubmit={handleSearch}>
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
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>
      <Container fluid>
        {roomsFromDb.map((room) => (
          <Row key={room.number}>
            <Col md={4}>
              <Image fluid src={room.picture} />
            </Col>
            <Col md={4} className="d-flex flex-column justify-content-around">
              <p>{room.description}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Price: {room.price}$</p>
            </Col>
            <Col md={4} className="d-flex flex-column justify-content-around">
              <Link to={"/booking/" + room.id} className="btn">
                Book
              </Link>
              <Button onClick={goDetailsPage}>Details</Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default Home;
