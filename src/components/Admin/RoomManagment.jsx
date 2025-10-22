import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Image, Modal, Pagination, Row, Spinner } from "react-bootstrap";
import AdminNav from "./AdmnNav/AdminNav";
import "./Admin.scss";

const RoomManagment = function () {
  const [roomsFromDb, setRoomsFromDb] = useState([]);
  const [error, setError] = useState("");
  const [createRoom, setCreateRoom] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [modalPicture, setModalPicture] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomSelected, setRoomSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalP, setTotalP] = useState(null);
  const [totalPagesArray, setTotalPagesArray] = useState(null);

  useEffect(() => {
    fetchAllRooms();
  }, [page]);

  const fetchAllRooms = async function () {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`http://localhost:3001/rooms?pageNumber=${page}`, {
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
      setTotalP(data.totalPages);
      createTotalPagesArray(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSave = async function (token, roomData) {
    try {
      const responseSave = await fetch("http://localhost:3001/rooms/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (!responseSave.ok) {
        throw new Error("Network response was not ok");
      }

      const datasave = await responseSave.json();
      fetchAllRooms(token);
      return datasave;
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchDelete = async function (token) {
    try {
      const responseDelete = await fetch(`http://localhost:3001/rooms/${roomSelected}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!responseDelete.ok) {
        throw new Error("Network response was not ok");
      }
      fetchAllRooms(token);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUpdate = async function (token, roomData) {
    try {
      const responseSave = await fetch(`http://localhost:3001/rooms/update/${roomSelected.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (!responseSave.ok) {
        throw new Error("Network response was not ok");
      }

      // const datasave = await responseSave.json();
      fetchAllRooms(token);
      // return datasave;
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUploadPicture = async function () {
    if (!selectedFile || !roomSelected) {
      alert("No file selected or room not selected!");
      return;
    }

    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("picture", selectedFile);

    try {
      const response = await fetch(`http://localhost:3001/rooms/${roomSelected.id}/picture`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }
      fetchAllRooms(token);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchStatusChange = async (room) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:3001/rooms/${room.id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Status change failed");
      }

      fetchAllRooms(token);
    } catch (err) {
      setError(err.message);
    }
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
      description: roomDescription,
      price: roomPrice,
      capacity: roomCapacity,
    };

    fetchSave(token, roomData);

    handleClose("create");
  };

  const handleClose = function (modalName) {
    switch (modalName) {
      case "create":
        setCreateRoom(false);
        break;

      case "delete":
        setDeleteModal(false);
        setRoomSelected(null);
        break;

      case "update":
        setUpdateModal(false);
        setRoomSelected(null);
        break;

      case "picture":
        setModalPicture(false);
        setRoomSelected(null);
        setSelectedFile(null);
        break;

      default:
        break;
    }
  };

  const handleShow = function (modalName, otherInfo) {
    switch (modalName) {
      case "create":
        setCreateRoom(true);
        break;
      case "delete":
        setDeleteModal(true);
        setRoomSelected(otherInfo);
        break;

      case "update":
        setUpdateModal(true);
        setRoomSelected(otherInfo);
        break;

      case "picture":
        setModalPicture(true);
        setRoomSelected(otherInfo);
        setSelectedFile(null);
        break;
      default:
        break;
    }
  };

  const handleDeleteRoom = function () {
    const token = localStorage.getItem("authToken");
    fetchDelete(token);
    setRoomSelected(null);
    setDeleteModal(false);
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleStatusChange = (room) => {
    fetchStatusChange(room);
  };

  const createTotalPagesArray = function (total) {
    let tempArray = [];
    for (let i = 0; i < total; i++) {
      tempArray.push(i);
    }
    setTotalPagesArray(tempArray);
  };

  const handlePrevPage = () => {
    if (page == 0) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page == totalP - 1) {
      return;
    } else {
      setPage(page + 1);
    }
  };

  const handlePageChange = function (e) {
    const pageToNavigate = e.target.innerHTML;
    setPage(pageToNavigate - 1);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 text-primary">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminNav />
        <Container fluid className="manager-main">
          <Alert variant="danger" className="mt-4">
            Error loading: {error}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <>
      <AdminNav />
      <Container fluid className="manager-main">
        <Row className="mb-3">
          <Col sm={12}>
            <Button onClick={() => handleShow("create")}>Create new room</Button>
            {/* modal for save */}
            <Modal show={createRoom} onHide={handleClose}>
              <Modal.Header className="bg-secondary">
                <Modal.Title>Create new Room</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="roomCreation" onSubmit={handleSubmit}>
                  <Form.Label>Room number</Form.Label>
                  <Form.Control type="text" placeholder="Enter room number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                  <Form.Label>Room description</Form.Label>
                  <Form.Control type="text" placeholder="Enter room description" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
                  <Form.Label>Room price</Form.Label>
                  <Form.Control type="text" placeholder="Enter room price" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} />
                  <Form.Label>Room capacity</Form.Label>
                  <Form.Control type="text" placeholder="Enter room capacity" value={roomCapacity} onChange={(e) => setRoomCapacity(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <p>note that all rooms are created with a placeholder image, remember to update the picture later</p>
                <Button variant="danger" onClick={() => handleClose("create")}>
                  Cancell
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>

        <Row>
          <div>
            <Pagination>
              <Pagination.Prev onClick={handlePrevPage} />
              {totalPagesArray.map((page) => {
                return (
                  <Pagination.Item key={page} onClick={handlePageChange}>
                    {page + 1}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next onClick={handleNextPage} />
            </Pagination>
          </div>
        </Row>

        <Row className="g-4">
          {roomsFromDb.map((room) => (
            <Col md={4} key={room.id}>
              <div className="d-flex flex-column h-100">
                <div className="rounded-4 overflow-hidden image-container">
                  <Image src={room.picture} alt={room.description} fluid className="room-image" />
                </div>
                <div className="mt-3 p-2">
                  <p>{room.description}</p>
                  <p>Price: {room.price}&euro; per night</p>
                  <p>Capacity: {room.capacity}</p>
                  <p>Availability: {room.available ? "Available" : "Not available"}</p>
                  <Button className="me-1" variant="primary" onClick={() => handleShow("update", room)}>
                    Update
                  </Button>
                  <Button className="me-1" variant="primary" onClick={() => handleShow("delete", room.id)}>
                    Delete
                  </Button>
                  <Button variant="secondary" className="me-1" onClick={() => handleShow("picture", room)}>
                    Edit picture
                  </Button>
                  <Button className="mt-1" onClick={() => handleStatusChange(room)}>
                    Change availability
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      {/* modal for delete */}
      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header className="bg-secondary">
          <Modal.Title>Deleting room {roomSelected} , THIS ACTION IS NOT REVERSABLE ARE YOU SURE TO CONTINUE?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleClose("delete")}>
            Cancell
          </Button>
          <Button variant="primary" onClick={handleDeleteRoom}>
            Yes I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal update */}
      <Modal show={updateModal} onHide={handleClose}>
        <Modal.Header className="bg-secondary">
          <Modal.Title>Update room</Modal.Title>
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
          <Button variant="danger" onClick={() => handleClose("update")}>
            Cancell
          </Button>
          <Button variant="primary" onClick={handleUpdateRoom}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal for picture */}
      <Modal show={modalPicture} onHide={handleClose}>
        <Modal.Header className="bg-secondary">
          <Modal.Title>Upload Picture for Room {roomSelected ? roomSelected.number : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roomSelected && (
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select new picture</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
              {selectedFile && <p className="mt-2">Selected file: {selectedFile.name}</p>}
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleClose("picture")}>
            Cancel
          </Button>
          <Button variant="success" onClick={fetchUploadPicture} disabled={!selectedFile}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomManagment;
