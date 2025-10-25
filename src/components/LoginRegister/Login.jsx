import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
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
        const errorFromDb = await res.json();
        throw new Error(errorFromDb.message);
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

    localStorage.setItem("authToken", dataFromFetch.token);
    localStorage.setItem("uid", dataFromFetch.userId);

    localStorage.setItem("role", "user");
    setUserRole("user");

    if (dataFromFetch.url == "/adminHome") {
      localStorage.setItem("role", "admin");
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

  const handleRefresh = function () {
    window.location.reload();
  };

  const handleReload = function () {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 text-primary">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Error loading</Alert.Heading>
          {error}
          <hr />
          <div>
            <Button variant="dark" onClick={() => handleReload()}>
              Try again
            </Button>
          </div>
        </Alert>
        <p>
          Retry to{" "}
          <span className="text-primary fw-semibold" onClick={() => handleRefresh()}>
            login
          </span>
        </p>
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
