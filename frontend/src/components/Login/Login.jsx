import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/auth";

  const loginUser = async function (credentials) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      console.log(res);
      //need to get the error form the backend
    }
    const data = await res.json();
    return data;
  };

  const handleSubmit = async function (event) {
    event.preventDefault();
    //aggiungi submit con tasto enter

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const dataFromFetch = await loginUser({ email, password });
    localStorage.setItem("authToken", dataFromFetch.token);
    localStorage.setItem("uid", dataFromFetch.userId);
    navigate("/home");
  };

  const handleEmailChange = function (e) {
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    setPassword(e.target.value);
  };

  return (
    <Form className="w-50" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="">Email address</Form.Label>
        <Form.Control className="border-secondary" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => handleEmailChange(e)} />
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

export default Login;
