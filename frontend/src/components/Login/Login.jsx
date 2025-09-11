import { useState } from "react";
import { Form, Button, Image, Container, Col, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
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
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="d-flex align-items-center justify-content-center bg-white">
          <Image src={logo} alt="Domus" fluid></Image>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form className="w-50" onSubmit={handleSubmit}>
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

export default Login;
