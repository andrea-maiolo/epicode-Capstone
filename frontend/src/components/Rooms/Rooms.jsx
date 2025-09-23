import { Button, ButtonGroup, CardBody, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavbarBrand, Row, Card } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import "./Rooms.scss";
import { Link } from "react-router-dom";
import DateRangePicker from "../DatePicker/DateRPicker";

const Rooms = function () {
  const [range, setRange] = useState([new Date(), new Date()]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [roomsFromDb, setRoomsFromDb] = useState([]);
  const [error, setError] = useState("");

  const API_URl = "http://localhost:3001";

  const fetchRooms = async function (token) {
    try {
      const response = await fetch(`${API_URl}/rooms`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

  const handleSearch = function (e) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    fetchRooms(token);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetchRooms(token);
  }, []);

  return (
    <>
      <Navbar className="bg-primary">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="Domus" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="userProfile" className="text-white fw-bold fs-5">
              Profile
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="bg-primary text-white px-2 fs-4 text-center">Your journey starts with the right room</div>

      <Form className="d-flex align-items-center justify-content-center mb-3" onSubmit={handleSearch}>
        <DateRangePicker value={range} onChange={setRange} placeholder="select range of dates" />
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-primary">
            {adults} Adults · {children} Children · {rooms} Rooms
          </Button>
          <Dropdown.Toggle split variant="outline-primary" id="dropdown-split-basic" />
          <Dropdown.Menu style={{ minWidth: "250px" }}>
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
        {/* {roomsFromDb.map((room) => (
          <Row key={room.number} className="mb-3">
            <Col md={4}>
              <Image fluid src={room.picture} className="rounded" />
            </Col>
            <Col md={8} className="d-flex flex-column justify-content-around">
              <p>{room.description}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Price: {room.price}$</p>
              <Link to={"/booking/" + room.id} className="btn btn-primary w-25">
                Book now
              </Link>
            </Col>
          </Row>
        ))} */}

        <Row className="g-4">
          {roomsFromDb.map((room) => (
            <Col md={6}>
              <div className="d-flex flex-column">
                <Image
                  src={room.picture}
                  alt="alt"
                  fluid
                  className="rounded-4"
                  // style={{
                  //   width: "100%",
                  //   maxWidth: "300px",
                  //   objectFit: "cover",
                  //   borderRadius: "8px",
                  // }}
                />
                <div className="mt-3">
                  <h5>{room.title}title</h5>
                  <p>{room.description}</p>
                  <p>Price: ${room.price}</p>
                  <p>Capacity: {room.capacity}</p>
                  <Link to={`/booking/${room.id}`}>
                    <Button variant="primary">Book Now</Button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Rooms;
