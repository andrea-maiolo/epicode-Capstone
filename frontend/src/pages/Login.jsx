import { useState } from "react";
import { Form, Button, Image, Container } from "react-bootstrap";

const Login = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(event);
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
      <div className="d-flex justify-content-evenly">
        <div>
          <Image src="https://picsum.photos/200/300"></Image>
        </div>

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
      </div>
    </Container>
  );
};

export default Login;
