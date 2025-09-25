import { Button, Col, Container, Form, Image, Row, Alert, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Rooms.scss";
import { Link } from "react-router-dom";
import MyNav from "../Navbar/MyNav";
import MyFooter from "../Footer/MyFooter";

const Rooms = function () {
  const [roomsFromDb, setRoomsFromDb] = useState([]);
  const [error, setError] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const API_URl = "http://localhost:3001";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetchRooms(token);
  }, []);

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
        //get it and set it
      }

      const data = await response.json();
      setRoomsFromDb(data.content);
    } catch (error) {
      setError(error.messaage);
    }
  };

  const handleGuestsChange = (type, action) => {
    if (type === "adults") {
      setAdults((prev) => (action === "increment" ? prev + 1 : Math.max(0, prev - 1)));
    } else {
      setChildren((prev) => (action === "increment" ? prev + 1 : Math.max(0, prev - 1)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowErrorAlert(false);

    if ((adults === 0 && children === 0) || !checkinDate || !checkoutDate || (checkinDate && checkoutDate && new Date(checkoutDate) <= new Date(checkinDate))) {
      setShowErrorAlert(true);
    }

    if (!showErrorAlert) {
      console.log("Form submitted:", { adults, children, checkinDate, checkoutDate });
      // Here you would typically handle the booking or API call
    } else {
      setShowErrorAlert(true);
    }
  };

  const calculateNights = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const checkIn = new Date(checkinDate);
    const checkOut = new Date(checkoutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBookNow = (room) => {
    if ((adults === 0 && children === 0) || !checkinDate || !checkoutDate || new Date(checkoutDate) <= new Date(checkinDate)) {
      window.alert("Please fill in all booking details (guests, check-in, and check-out dates) before booking.");
      setShowModal(false);
    } else {
      setSelectedRoom(room);
      setShowModal(true);
    }
  };

  const handleProceedBooking = async function () {
    // Logic to proceed with the booking (e.g., API call, navigation)
    console.log("Booking confirmed for room:", selectedRoom);
    console.log("Guests:", adults, "adults,", children, "children");
    console.log("Dates:", checkinDate, "to", checkoutDate);
    // Here you would make an API call to your backend
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("uid");

      // Data to be sent to the backend
      const bookingData = {
        checkin: checkinDate,
        checkout: checkoutDate,
        userId: userId,
        roomId: selectedRoom.id,
      };

      const response = await fetch("http://localhost:3001/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`Booking failed with status: ${response.status}`);
      }

      const bookingConfirmation = await response.json();
      console.log("Booking successful:", bookingConfirmation);

      // Optional: Reset state or navigate to a confirmation page
      setShowModal(false);
      window.alert("Your room has been successfully booked!");
    } catch (error) {
      console.error("Error during booking:", error);
      window.alert(`An error occurred: ${error.message}`);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <MyNav />
      <section className="hero-section">
        <div className="hero-bg-rooms"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3 mb-md-4">Browse Our Wonderful Rooms</h1>
        </div>
      </section>
      <section className="py-5 py-md-5 bg-light text-center">
        <Container>
          <Col lg={8} className="mx-auto">
            <h2 className="fs-2 fw-semibold mb-3 text-primary">Your journey starts with the right room</h2>
            <div className="bg-primary mx-auto" style={{ width: "5rem", height: "0.25rem", borderRadius: "999px" }}></div>
          </Col>
        </Container>
      </section>

      <Container className="mb-2 p-2 rounded shadow bg-white">
        <Form onSubmit={handleSubmit}>
          {showErrorAlert && (
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
              Please correct the errors in the form before proceeding.
            </Alert>
          )}
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Guests</Form.Label>
                <div className="d-flex flex-column flex-sm-row justify-content-between">
                  <div className="d-flex align-items-center mb-2 mb-sm-0">
                    <span className="me-2">Adults:</span>
                    <Button variant="outline-primary" onClick={() => handleGuestsChange("adults", "decrement")} className="rounded-circle">
                      -
                    </Button>
                    <span className="mx-2">{adults}</span>
                    <Button variant="outline-primary" onClick={() => handleGuestsChange("adults", "increment")} className="rounded-circle">
                      +
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Children:</span>
                    <Button variant="outline-primary" onClick={() => handleGuestsChange("children", "decrement")} className="rounded-circle">
                      -
                    </Button>
                    <span className="mx-2">{children}</span>
                    <Button variant="outline-primary" onClick={() => handleGuestsChange("children", "increment")} className="rounded-circle">
                      +
                    </Button>
                  </div>
                </div>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Check-in Date</Form.Label>
                <Form.Control type="date" value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} required />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Check-out Date</Form.Label>
                <Form.Control type="date" value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} required />
              </Form.Group>
            </Col>

            <Col xs={12} className="text-center mt-4">
              <Button variant="primary" type="submit">
                Check Availability
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container fluid>
        <Row className="g-4">
          {roomsFromDb.map((room) => (
            <Col md={6} key={room.id}>
              <div className="d-flex flex-column h-100">
                <div className="rounded-4 overflow-hidden image-container">
                  <Image src={room.picture} alt={room.description} fluid className="room-image" />
                </div>
                <div className="mt-3 p-2">
                  <h5>{room.description}</h5>
                  <p>Price: {room.price}&euro; per night</p>
                  <p>Capacity: {room.capacity}</p>
                  <Button variant="primary" onClick={() => handleBookNow(room)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <>
              <h5>Room: {selectedRoom.description}</h5>
              <p>
                <strong>Check-in:</strong> {checkinDate}
              </p>
              <p>
                <strong>Check-out:</strong> {checkoutDate}
              </p>
              <p>
                <strong>Guests:</strong> {adults} Adults, {children} Children
              </p>
              <hr />
              <p>
                <strong>Number of nights:</strong> {calculateNights()}
              </p>
              <h4>Total Price: {selectedRoom.price * calculateNights()}&euro;</h4>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProceedBooking}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      <MyFooter />
    </>
  );
};

export default Rooms;
