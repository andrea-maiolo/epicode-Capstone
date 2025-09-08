import { useState } from "react";
import { Form, Button, Image, Container, Col, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(event);
    if (!email || !password) {
      alert("Please fill all fields!");
      return; // stop submission
    }
    navigate("/home");
  };

  const handleEmailChange = function (e) {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="lg-6">
          <Image src={logo} alt="Domus" fluid></Image>
        </Col>
        <Col className="lg-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => handleEmailChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
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

export default Login;
