import { useState } from "react";
import { Form, Button, Image, Container, Col, Row } from "react-bootstrap";
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
      console.log(res);
      //you ll need the error from the backend
    }

    const data = await res.json();
    console.log(data);
  };

  const handleSubmit = async function (event) {
    event.preventDefault();

    if (!email || !password || !name || !surname) {
      alert("Please fill all fields!");
      return;
    }

    registerUser({ name, surname, email, password });

    //prendo e vedo che fare
    //navigate("/home");
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
  );
};

export default Register;
