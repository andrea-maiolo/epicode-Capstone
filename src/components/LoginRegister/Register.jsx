import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

const Register = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const API_URL = "http://localhost:3001/auth";

  const registerUser = async function (userData) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorFromDb = await res.json();
        if (res.status == 422) {
          errorFromDb.message += " " + errorFromDb.errorsList;
        }
        throw new Error(errorFromDb.message);
      }

      const data = await res.json();
      setRegSuccess(true);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = function (event) {
    event.preventDefault();

    if (!email || !password || !name || !surname) {
      alert("Please fill all fields!");
      return;
    }

    registerUser({ name, surname, email, password });
  };

  const handleKeyDown = function (e) {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmailChange = function (e) {
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    setPassword(e.target.value);
  };

  const handleNameChange = function (e) {
    setName(e.target.value);
  };

  const handleSurnameChange = function (e) {
    setSurname(e.target.value);
  };

  const handleRefresh = function () {
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
            <Button variant="dark" onClick={() => handleRefresh()}>
              Try again
            </Button>
          </div>
        </Alert>
        <p>
          Retry to{" "}
          <span className="text-primary fw-semibold" onClick={() => handleRefresh()}>
            register
          </span>
        </p>
      </div>
    );
  }

  return (
    <>
      {!regSuccess && (
        <Form className="w-100 w-md-50" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="">Name</Form.Label>
            <Form.Control
              className="border-secondary"
              type="text"
              placeholder="first name"
              maxLength={50}
              required
              value={name}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleNameChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label className="">Surname</Form.Label>
            <Form.Control
              className="border-secondary"
              type="text"
              required
              maxLength={50}
              placeholder="last name"
              value={surname}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleSurnameChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="">Email address</Form.Label>
            <Form.Control
              className="border-secondary"
              type="email"
              required
              placeholder="example@something.com"
              value={email}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleEmailChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="border-secondary"
              type="password"
              placeholder="password"
              required
              minLength={2}
              maxLength={128}
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => handlePasswordChange(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
      {regSuccess && (
        <div>
          <h2>Registration complete! Welcome aboard — log in and enjoy exploring our platform.</h2>
        </div>
      )}
    </>
  );
};

export default Register;
