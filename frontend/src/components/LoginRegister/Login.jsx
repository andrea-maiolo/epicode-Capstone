import { useState } from "react";
import { Form, Button, Spinner, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = function ({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/auth";

  const loginUser = async function (credentials) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error("Could not log you in, sorry try again");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async function (event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const dataFromFetch = await loginUser({ email, password });
    console.log(dataFromFetch);

    localStorage.setItem("authToken", dataFromFetch.token);
    localStorage.setItem("uid", dataFromFetch.userId);

    localStorage.setItem("role", "user");
    setUserRole("user");

    if (dataFromFetch.url == "/adminHome") {
      console.log("same");
      localStorage.setItem("role", "admin");
      console.log("Login successful. Stored role in localStorage:");
      setUserRole("admin");
    }

    navigate(dataFromFetch.url);
  };

  const handleEmailChange = function (e) {
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    setPassword(e.target.value);
  };

  const handleKeyDown = function (e) {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
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
        <Container fluid>
          <Alert variant="danger" className="mt-4">
            Error login, sorry try again
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <Form className="w-50" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="">Email address</Form.Label>
        <Form.Control
          className="border-secondary"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          onKeyDown={handleKeyDown}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="border-secondary"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          onKeyDown={handleKeyDown}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
