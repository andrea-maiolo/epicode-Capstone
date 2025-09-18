import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BookingPage = function () {
  const [currentRoom, setCurrentRoom] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  console.log("params", params);
  const API_URl = "http://localhost:3001";

  useEffect(() => {
    fetchSingleRoom();
  }, []);

  const fetchSingleRoom = async function () {
    try {
      const response = await fetch(`${API_URl}/rooms/${params.roomId}`);

      if (!response.ok) {
        throw new Error("Room not found");
      }

      const data = await response.json();
      setCurrentRoom(data);
      console.log(currentRoom);
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
      <Row key={currentRoom.number}>
        <Col md={4}>
          <Image fluid src={currentRoom.picture} />
        </Col>
        <Col md={4} className="d-flex flex-column justify-content-around">
          <p>{currentRoom.description}</p>
          <p>Capacity: {currentRoom.capacity}</p>
          <p>Price: {currentRoom.price}$</p>
        </Col>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4">Book a Room</h2>
                <Form onSubmit={handleSubmit}>
                  {/* User Info */}
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
        </Row>
      </Row>
    </Container>
  );
};

export default BookingPage;
