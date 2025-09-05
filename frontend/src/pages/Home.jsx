import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, InputGroup, Nav, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = function () {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  //   const handleSubmit = function (e) {
  //     e.preventDefault();
  //     console.log(e);
  //   };
  const handleChange = (setter, value) => {
    setter((prev) => Math.max(0, prev + value)); // prevent negative values
  };

  return (
    <Container>
      <Form>
        <DatePicker showIcon selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
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
      <div>
        <Card className="h-50">
          <Row className="g-0">
            <Col className="md-4">
              <Card.Img className="img-fluid" src="https://picsum.photos/100/100" />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>here will be show the rooms</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
};

export default Home;
