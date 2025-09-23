import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Nav, Navbar, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";

const RoomManagment = function () {
  const [roomsFromDb, setRoomsFromDb] = useState([]);
  const [error, setError] = useState("");
  const [createRoom, setCreateRoom] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomSelected, setRoomSelected] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetchAllRooms(token);
  }, []);

  const fetchAllRooms = async function (token) {
    const response = await fetch("http://localhost:3001/rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Could not get rooms");
    }

    //    delete work but no response?
    const data = await response.json();
    setRoomsFromDb(data.content);
    console.log(roomsFromDb);
  };

  const fetchSave = async function (token, roomData) {
    console.log(roomData);
    const responseSave = await fetch("http://localhost:3001/rooms/save", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    if (!responseSave.ok) {
      console.log(responseSave);
      //da cambiare
    }

    const datasave = await responseSave.json();
    console.log(datasave);
    //torna indietro la room
    //forse dovrei rifare la fetch delle room
  };

  const fetchDelete = async function (token) {
    const responseDelete = await fetch(`http://localhost:3001/rooms/${roomSelected}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!responseDelete.ok) {
      console.log(responseDelete);
      //da cambiare
    }

    const dataDelete = await responseDelete.json();
    console.log(dataDelete);
  };

  const fetchUpdate = async function (token, roomData) {
    const responseSave = await fetch(`http://localhost:3001/rooms/update/${roomSelected.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    if (!responseSave.ok) {
      console.log(responseSave);
      //da cambiare
    }

    const datasave = await responseSave.json();
    console.log(datasave);
    //torna indietro la room
    //forse dovrei rifare la fetch delle room
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!roomCapacity || !roomDescription || !roomNumber || !roomPrice) {
      alert("Please fill all fields!");
      return;
    }

    const token = localStorage.getItem("authToken");
    const roomData = {
      number: roomNumber,
      description: roomCapacity,
      price: roomPrice,
      capacity: roomCapacity,
    };

    fetchSave(token, roomData);

    handleClose();
  };

  const handleClose = () => setCreateRoom(false);

  const handleShow = () => setCreateRoom(true);

  const handleDeleteClose = () => {
    setDeleteModal(false);
    setRoomSelected(null);
  };

  const handleDeleteShow = (roomId) => {
    setDeleteModal(true);
    setRoomSelected(roomId);
  };

  const handleDeleteRoom = function () {
    console.log("deleting");
    const token = localStorage.getItem("authToken");
    fetchDelete(token);
    setRoomSelected(null);
    setDeleteModal(false);
  };

  const handleUpdateClose = () => {
    setUpdateModal(false);
    setRoomSelected(null);
  };

  const handleUpdateShow = (roomId) => {
    setUpdateModal(true);
    setRoomSelected(roomId);
  };

  const handleUpdateRoom = function () {
    const token = localStorage.getItem("authToken");
    const roomDataUpdate = {
      number: roomSelected.number,
      description: roomSelected.description,
      price: roomSelected.price,
      capacity: roomSelected.capacity,
    };
    fetchUpdate(token, roomDataUpdate);
    setRoomSelected(null);
    setUpdateModal(false);
  };

  return (
    <>
      <Navbar className="bg-primary">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="Domus" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="roomManager" className="text-white">
              gestisci stanza
            </Nav.Link>
            <Nav.Link href="userManager" className="text-white">
              gestisci ospiti
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="mt-3">
        <Row className="mb-3">
          <Col sm={12}>
            <Button onClick={handleShow}>Create new room</Button>
            {/* modal for save */}
            <Modal show={createRoom} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create new Room</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="roomCreation" onSubmit={handleSubmit}>
                  <Form.Label>Room number</Form.Label>
                  <Form.Control type="text" placeholder="Enter item name" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                  <Form.Label>Room description</Form.Label>
                  <Form.Control type="text" placeholder="Enter item name" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
                  <Form.Label>Room price</Form.Label>
                  <Form.Control type="text" placeholder="Enter item name" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} />
                  <Form.Label>Room capacity</Form.Label>
                  <Form.Control type="text" placeholder="Enter item name" value={roomCapacity} onChange={(e) => setRoomCapacity(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <p>note that all rooms are created with a placeholder image, remember to update the picture later</p>
                <Button variant="danger" onClick={handleClose}>
                  Cancell
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row className="g-4">
          {roomsFromDb.map((room) => (
            <Col md={6}>
              <div className="d-flex flex-column">
                <Image src={room.picture} alt="alt" fluid className="rounded-4" />
                <div className="mt-3">
                  <p>{room.description}</p>
                  <p>Price: ${room.price}</p>
                  <p>Capacity: {room.capacity}</p>
                  <Button variant="primary" onClick={() => handleUpdateShow(room)}>
                    Update
                  </Button>
                  <Button variant="primary" onClick={() => handleDeleteShow(room.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      {/* modal for delete */}
      <Modal show={deleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting room {roomSelected} , THIS ACTION IS NOT REVERSABLE ARE YOU SURE TO CONTINUE?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteClose}>
            Cancell
          </Button>
          <Button variant="primary" onClick={handleDeleteRoom}>
            Yes I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal update */}
      <Modal show={updateModal} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>update room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roomSelected && (
            <Form onSubmit={handleUpdateRoom}>
              <Form.Group>
                <Form.Label>Number</Form.Label>
                <Form.Control type="text" value={roomSelected.number} onChange={(e) => setRoomSelected({ ...roomSelected, number: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={roomSelected.description}
                  onChange={(e) => setRoomSelected({ ...roomSelected, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={roomSelected.price} onChange={(e) => setRoomSelected({ ...roomSelected, price: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Capacity</Form.Label>
                <Form.Control type="text" value={roomSelected.capacity} onChange={(e) => setRoomSelected({ ...roomSelected, capacity: e.target.value })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpdateClose}>
            Cancell
          </Button>
          <Button variant="primary" onClick={handleUpdateRoom}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomManagment;
