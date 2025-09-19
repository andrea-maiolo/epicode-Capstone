import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BookingPage = function () {
  const [currentRoom, setCurrentRoom] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  console.log("params", params);
  const API_URl = "http://localhost:3001";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetchSingleRoom(token);
  }, []);

  const fetchSingleRoom = async function (token) {
    try {
      const response = await fetch(`${API_URl}/rooms/${params.roomId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Room not found");
        //get error from backend
      }

      const data = await response.json();
      setCurrentRoom(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);

    // Example: send to backend
    // fetch("/api/bookings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // });
  };

  return (
    <Container fluid>
      {/* <Row key={currentRoom.number}>
        <Col md={4}>
          <Image fluid src={currentRoom.picture} />
        </Col>
        <Col md={4} className="d-flex flex-column justify-content-around">
          <p>{currentRoom.description}</p>
          <p>Capacity: {currentRoom.capacity}</p>
          <p>Price: {currentRoom.price}$</p>
        </Col>
      </Row> */}
      {/* <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Contact info</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="fullName" placeholder="Enter your name" value={formData.fullName} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" name="phone" placeholder="Optional" value={formData.phone} onChange={handleChange} />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formCheckIn">
                      <Form.Label>Check-In</Form.Label>
                      <Form.Control type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formCheckOut">
                      <Form.Label>Check-Out</Form.Label>
                      <Form.Control type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formGuests">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRequests">
                  <Form.Label>Special Requests</Form.Label>
                  <Form.Control as="textarea" name="specialRequests" rows={3} value={formData.specialRequests} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Confirm Booking
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
      <Row>
        <Col lg={9}>
          <Form>
            <h3>Contact info</h3>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">Prefix</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Mr</Dropdown.Item>
                <Dropdown.Item>Ms</Dropdown.Item>
                <Dropdown.Item>Mx</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control required placeholder="First Name" />
            <Form.Control required placeholder="Last Name" />
            <Form.Control required placeholder="Phone" />
            <Form.Control required placeholder="Email" />
            <h3>Address</h3>
            <Dropdown.Toggle id="dropdown-basic">Country</Dropdown.Toggle>
            <Form.Control required placeholder="Address" />
            <Form.Control required placeholder="City" />
            <Form.Control required placeholder="Post code" />
            <h3>Special requests</h3>
            <Form.Control type="textarea" placeholder="say something" />
            <p>
              Policies: Check-in after 4:00 pm Check-out before 12:00 pm Room 1 Grove Lodge Package, Grove Lodge Two Queens Room Package Guarantee Policy A
              deposit equal to one night’s room rate is charged at the time of booking to guarantee your reservation. Guests must be 18 years of age to make
              overnight reservations and stay at Mohonk Mountain House. Cancel Policy Deposits for reservations that are cancelled within 7 days of their
              arrival date are subject to forfeiture. Over holidays, cancellations require more than 14 days notice to avoid forfeiture. With advance notice,
              deposits are refunded, less a $50 fee.
            </p>
            <Button type="submit">Confirm Booking</Button>
          </Form>
        </Col>
        <Col lg={3} className="bg-secondary w-25">
          Price details which will be fixed
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
