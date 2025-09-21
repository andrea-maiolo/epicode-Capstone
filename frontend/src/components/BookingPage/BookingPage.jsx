import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BookingPage = function () {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const params = useParams();
  console.log("params", params);
  const API_URl = "http://localhost:3001";

  useEffect(() => {
    const t = localStorage.getItem("authToken");
    const u = localStorage.getItem("uid");
    setCurrentUser(u);
    setToken(t);
    setCurrentRoom(params.roomId);
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

      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  // Step 1: Define the checkin date
  const checkinDate = new Date();

  // Step 2: Create a new date for checkout and add 3 days to it
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + 3);

  // Step 3: Create your final object

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !currentRoom) {
      console.log("empty values abort");
    }

    const formData = {
      checkin: checkinDate,
      checkout: checkoutDate,
      userId: currentUser,
      roomId: currentRoom,
    };

    console.log(formData);

    const response = await fetch("http://localhost:3001/booking", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.log(response);
    }

    setConfirmation(true);
  };

  const getBooking = async function () {
    const response = await fetch("http://localhost:3001/booking/102", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(response);
    }

    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <>
      {!confirmation && (
        <>
          <Container fluid>
            <Row>
              <Col lg={9}>
                <Form onSubmit={handleSubmit}>
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
                    Policies: Check-in after 4:00 pm Check-out before 12:00 pm Room 1 Grove Lodge Package, Grove Lodge Two Queens Room Package Guarantee Policy
                    A deposit equal to one night’s room rate is charged at the time of booking to guarantee your reservation. Guests must be 18 years of age to
                    make overnight reservations and stay at Mohonk Mountain House. Cancel Policy Deposits for reservations that are cancelled within 7 days of
                    their arrival date are subject to forfeiture. Over holidays, cancellations require more than 14 days notice to avoid forfeiture. With
                    advance notice, deposits are refunded, less a $50 fee.
                  </p>
                  <Button type="submit">Confirm Booking</Button>
                </Form>
              </Col>
              <Col lg={3} className="bg-secondary w-25">
                Price details which will be fixed
              </Col>
            </Row>
            <>
              <p>test</p>
              <Button onClick={getBooking}>get booking</Button>
            </>
          </Container>
        </>
      )}
      {confirmation && (
        <>
          <h1>congrats on the booking</h1>
        </>
      )}
    </>
  );
};

export default BookingPage;
