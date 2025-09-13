import { useState } from "react";
import { Form, Button, Image, Container, Col, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Register = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/auth";

  const registerUser = async function (userData) {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Registration failed");
    }

    return res.json();
  };

  const loginUser = async function (credentials) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    return res.json();
  };

  const handleSubmit = async function (event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return; // stop submission
    }

    try {
      const data = await registerUser({ name, surname, email, password });
      console.log(data);
    } catch (error) {
      setError(error.message);
    }

    //navigate("/home");
  };

  const handleEmailChange = function (e) {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleNameChange = function (e) {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleSurnameChange = function (e) {
    console.log(e.target.value);
    setSurname(e.target.value);
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="d-flex align-items-center justify-content-center bg-white">
          <Image src={logo} alt="Domus" fluid></Image>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form className="w-50" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="">Name</Form.Label>
              <Form.Control className="border-secondary" type="text" placeholder="gianni" value={name} onChange={(e) => handleNameChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label className="">Surname</Form.Label>
              <Form.Control className="border-secondary" type="text" placeholder="nanni" value={surname} onChange={(e) => handleSurnameChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="">Email address</Form.Label>
              <Form.Control className="border-secondary" type="email" placeholder="gianni@gmail.com" value={email} onChange={(e) => handleEmailChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className="border-secondary" type="password" placeholder="password" value={password} onChange={(e) => handlePasswordChange(e)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
