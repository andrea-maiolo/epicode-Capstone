import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Register = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const API_URL = "http://localhost:3001/auth";

  const registerUser = async function (userData) {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      console.log(res);
      //you ll need the error from the backend
    }

    const data = await res.json();
    setRegSuccess(true);
    return data;
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

  return (
    <>
      {!regSuccess && (
        <Form className="w-50" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="">Name</Form.Label>
            <Form.Control
              className="border-secondary"
              type="text"
              placeholder="gianni"
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
              placeholder="nanni"
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
              placeholder="gianni@gmail.com"
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
